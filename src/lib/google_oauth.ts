import crypto from "crypto";
import https from "https";
import querystring from "querystring";

type GoogleStatePayload = {
  telegramId?: number;
  otpCode?: string;
  emailPassword?: string;
  mode?: "add" | "refresh";
  targetEmail?: string;
  nonce: string;
  ts: number;
};

export type GoogleProfile = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

export type DQueueGoogleLoginResult = {
  token: string;
  raw: any;
};

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function baseUrl(): string {
  return requiredEnv("GOOGLE_OAUTH_BASE_URL").replace(/\/$/, "");
}

export function getGoogleOAuthRedirectUri(): string {
  return `${baseUrl()}/api/auth/google/callback`;
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", requiredEnv("GOOGLE_OAUTH_STATE_SECRET"))
    .update(value)
    .digest("base64url");
}

export function createGoogleOAuthState(
  telegramId?: number,
  otpCode?: string,
  options: { mode?: "add" | "refresh"; targetEmail?: string; emailPassword?: string } = {}
): string {
  const payload: GoogleStatePayload = {
    mode: options.mode ?? "add",
    nonce: crypto.randomBytes(16).toString("hex"),
    ts: Date.now(),
  };
  if (typeof telegramId === "number") {
    payload.telegramId = telegramId;
  }
  if (otpCode) {
    payload.otpCode = otpCode;
  }
  if (options.emailPassword) {
    payload.emailPassword = options.emailPassword;
  }
  if (options.targetEmail) {
    payload.targetEmail = options.targetEmail.toLowerCase();
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyGoogleOAuthState(state: string): GoogleStatePayload {
  const [encodedPayload, signature] = state.split(".");
  if (!encodedPayload || !signature || sign(encodedPayload) !== signature) {
    throw new Error("Invalid OAuth state");
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as GoogleStatePayload;
  if (!payload.ts || Date.now() - payload.ts > 10 * 60 * 1000) {
    throw new Error("OAuth state expired");
  }

  return payload;
}

export function getGoogleOAuthStartUrl(
  telegramId?: number,
  otpCode?: string,
  options: { mode?: "add" | "refresh"; targetEmail?: string; emailPassword?: string } = {}
): string {
  const state = createGoogleOAuthState(telegramId, otpCode, options);
  return `${baseUrl()}/api/auth/google/firebase?state=${encodeURIComponent(state)}`;
}

export function getLegacyGoogleOAuthStartUrl(
  telegramId?: number,
  otpCode?: string,
  options: { mode?: "add" | "refresh"; targetEmail?: string; emailPassword?: string } = {}
): string {
  const params = new URLSearchParams({
    client_id: requiredEnv("GOOGLE_OAUTH_CLIENT_ID"),
    redirect_uri: getGoogleOAuthRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
    state: createGoogleOAuthState(telegramId, otpCode, options),
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

function requestJson(
  hostname: string,
  path: string,
  method: "GET" | "POST",
  payload?: any,
  headers: Record<string, string> = {}
): Promise<{ status: number; data: any }> {
  return new Promise((resolve) => {
    const body =
      typeof payload === "string"
        ? payload
        : payload
          ? JSON.stringify(payload)
          : undefined;

    const req = https.request(
      {
        hostname,
        port: 443,
        path,
        method,
        headers: {
          Accept: "application/json",
          ...(body ? { "Content-Length": Buffer.byteLength(body).toString() } : {}),
          ...headers,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode || 500, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode || 500, data });
          }
        });
      }
    );

    req.on("error", (error) => {
      resolve({ status: 500, data: { error: error.message } });
    });

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

export async function exchangeGoogleCodeForProfile(code: string): Promise<GoogleProfile> {
  const tokenBody = querystring.stringify({
    code,
    client_id: requiredEnv("GOOGLE_OAUTH_CLIENT_ID"),
    client_secret: requiredEnv("GOOGLE_OAUTH_CLIENT_SECRET"),
    redirect_uri: getGoogleOAuthRedirectUri(),
    grant_type: "authorization_code",
  });

  const tokenResponse = await requestJson("oauth2.googleapis.com", "/token", "POST", tokenBody, {
    "Content-Type": "application/x-www-form-urlencoded",
  });

  if (tokenResponse.status < 200 || tokenResponse.status >= 300 || !tokenResponse.data?.access_token) {
    throw new Error(`Google token exchange failed: ${JSON.stringify(tokenResponse.data)}`);
  }

  const profileResponse = await requestJson("openidconnect.googleapis.com", "/v1/userinfo", "GET", undefined, {
    Authorization: `Bearer ${tokenResponse.data.access_token}`,
  });

  if (profileResponse.status < 200 || profileResponse.status >= 300 || !profileResponse.data?.sub) {
    throw new Error(`Google profile failed: ${JSON.stringify(profileResponse.data)}`);
  }

  return profileResponse.data as GoogleProfile;
}

export async function loginDQueueWithGoogle(profile: GoogleProfile): Promise<DQueueGoogleLoginResult> {
  const payload = {
    uid: profile.sub,
    displayName: profile.name ?? profile.email ?? "",
    email: profile.email ?? "",
    photoURL: profile.picture ?? "",
  };

  const response = await requestJson("backend4.deltaapiservice.com", "/auth/login-google", "POST", payload, {
    "Content-Type": "application/json",
    "User-Agent": "QueQ/10.0.0 (Android 9)",
  });

  const token =
    response.data?.validate?.token ??
    response.data?.token ??
    response.data?.accessToken?.accessToken ??
    response.data?.accessToken;

  if ((response.status < 200 || response.status >= 300) || !token) {
    throw new Error(`DQueue Google login failed: ${JSON.stringify(response.data)}`);
  }

  return { token, raw: response.data };
}
