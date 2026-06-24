/**
 * QueQ API Client — คลาสสำหรับยิง API ตรง (ไม่ผ่าน UI Automation)
 *
 * ฟังก์ชันหลัก:
 * 1. refreshToken()   — ต่ออายุ Access Token ด้วย Refresh Token
 * 2. bookQueue()      — จองคิว
 * 3. cancelQueue()    — ยกเลิกคิว
 * 4. getMyQueue()     — ดึงสถานะคิวปัจจุบัน
 * 5. loginWithOTP()   — ล็อกอินด้วยเบอร์โทร + OTP
 */

import https from "https";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------
export interface QueqTokens {
  accessToken: string;
  refreshToken: string;
}

export interface QueueInfo {
  _id: string;
  id_res_auto: number;
  zone_id: number;
  user_id: number;
  number_of_people?: number;
  people?: number;
  user_queue?: number;
  q_number?: string;
  code?: string;
  name_user?: string;
  user_status: number;
  reservation_date_time: string;
}

export interface BookingResult {
  success: boolean;
  message: string;
  queue?: QueueInfo;
  apiCreated?: boolean;
  activeQueue?: any;
  updateResult?: any;
}

export interface StoreSearchResult {
  name: string;
  branch: string;
  zoneName: string;
  shopId: number;
  zoneId: number;
  queue?: number;
  distance?: number;
  raw: any;
}

export interface ApiResponse {
  status: number;
  data: any;
}

// ---------------------------------------------------------
// QueQ API Client
// ---------------------------------------------------------
export class QueqApiClient {
  private accessToken: string;
  private refreshTokenValue: string;
  private readonly baseUrl = "backend4.deltaapiservice.com";

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshTokenValue = refreshToken;
  }

  // ---------------------------------------------------------
  // Getter สำหรับดึงค่า Token ปัจจุบัน
  // ---------------------------------------------------------
  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshTokenValue;
  }

  async getActiveQueue(): Promise<any | null> {
    const res = await this.request("users-reservations/get_queue", "GET");
    if (res.status === 200) {
      if (res.data?.queue) {
        if (!res.data.queue.name_user || !res.data.queue.tel_user) {
          const profile = await this.getUserProfile();
          res.data.queue = {
            ...res.data.queue,
            name_user:
              res.data.queue.name_user ??
              profile?.first_name ??
              profile?.name ??
              profile?.displayName ??
              "",
            tel_user:
              res.data.queue.tel_user ??
              profile?.phone_number ??
              profile?.phoneNumber ??
              "",
          };
        }
        const wait = await this.getQueueWaitCount();
        if (typeof wait === "number") {
          res.data.queueToWait = wait;
        }
        return res.data;
      }
      return { queue: null };
    }
    throw new Error(`QueQ API failed with status ${res.status}`);
  }

  async getQueueWaitCount(): Promise<number | null> {
    const res = await this.request("users-reservations/wait", "GET");
    const queueToWait = Number(res.data?.queueToWait);
    if (res.status === 200 && Number.isFinite(queueToWait) && queueToWait >= 0) {
      return queueToWait;
    }

    const fallback = await this.request("users-reservations/wait2", "GET");
    const fallbackQueueToWait = Number(fallback.data?.queueToWait);
    if (fallback.status === 200 && Number.isFinite(fallbackQueueToWait) && fallbackQueueToWait >= 0) {
      return fallbackQueueToWait;
    }

    return null;
  }

  async updateQueue(shopId: number, zoneId: number): Promise<ApiResponse> {
    return this.request(`dqueue/update-queue/${shopId}/${zoneId}`, "POST");
  }

  async getUserProfile(): Promise<any | null> {
    const res = await this.request("users/profile", "GET");
    return res.status === 200 ? res.data : null;
  }

  async getRestaurantZoneDetails(shopId: number, zoneId: number): Promise<any | null> {
    const location = this.getSearchLocation();
    const res = await this.request(
      `dqueue/res/${shopId}/zone/${zoneId}?latitude=${location.latitude}&longitude=${location.longitude}`,
      "GET"
    );
    return res.status === 200 ? res.data : null;
  }

  // ---------------------------------------------------------
  // HTTP Request พื้นฐาน
  // ---------------------------------------------------------
  private request(
    path: string,
    method: "GET" | "POST",
    payload?: any
  ): Promise<ApiResponse> {
    return new Promise((resolve) => {
      const options: https.RequestOptions = {
        hostname: this.baseUrl,
        port: 443,
        path: `/${path}`,
        method,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "User-Agent": "QueQ/10.0.0 (Android 9)",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const req = https.request(options, (res) => {
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
      });

      req.on("error", (e) =>
        resolve({ status: 500, data: { error: e.message } })
      );

      if (payload && method === "POST") {
        req.write(JSON.stringify(payload));
      }
      req.end();
    });
  }

  // ---------------------------------------------------------
  // 1. ต่ออายุ Token (Refresh Token)
  // ---------------------------------------------------------
  async refreshToken(): Promise<{
    success: boolean;
    newAccessToken?: string;
    error?: string;
  }> {
    const res = await this.request("auth/refresh-token", "POST", {
      refreshToken: this.refreshTokenValue,
    });

    if (res.status === 200 || res.status === 201) {
      // เซิร์ฟเวอร์ตอบกลับมาเป็น { accessToken: { accessToken: "xxx" } }
      const newToken =
        res.data?.accessToken?.accessToken || res.data?.accessToken;

      if (newToken) {
        this.accessToken = newToken; // อัปเดต Token ใหม่ให้ใช้งานต่อได้ทันที
        return { success: true, newAccessToken: newToken };
      }
    }

    return {
      success: false,
      error: res.data?.message || `Status ${res.status}`,
    };
  }

  // ---------------------------------------------------------
  // 2. จองคิว (Book Queue)
  // ---------------------------------------------------------
  async bookQueue(
    shopId: number,
    zoneId: number,
    people: number = 2,
    _typeQId: number = 1,
    _typeQName: string = "Walk in"
  ): Promise<BookingResult> {
    const profile = await this.getUserProfile();
    const details = await this.getRestaurantZoneDetails(shopId, zoneId);
    const zones = Array.isArray(details?.tqueues) ? details.tqueues : [];
    const selectedZone =
      zones.find((zone: any) => Number(zone?.zone_id) === Number(zoneId)) ??
      zones[0] ??
      null;
    const queueCount = Number(selectedZone?.queue) || 0;
    const duration = Number(selectedZone?.duration) || 0;
    const waitMinutes = Math.round((duration * queueCount) / 60);
    const countTime = Number(process.env.QUEQ_COUNT_TIME || "0");
    const bookingType = countTime - waitMinutes > 10 ? 1 : 0;
    const distance = Number(details?.distance);
    const payload = {
      number_of_people: people,
      reservation_date_time: new Date(),
      user_status: 0,
      zone_id: zoneId,
      notes: "",
      manager_id: 0,
      manager_name: "",
      name_user: String(profile?.first_name ?? ""),
      tel_user: String(profile?.phone_number ?? ""),
      type: bookingType,
      distance: Number.isFinite(distance) ? distance : 0,
      id_res_auto: shopId,
    };

    const res = await this.request("users-reservations/booking", "POST", payload);

    const bookingCreated =
      (res.status === 200 || res.status === 201) &&
      (res.data?.createReserv || res.data?.flag === true || res.data?.user_queue);

    if (bookingCreated) {
      const updateRes = await this.updateQueue(shopId, zoneId);
      if (
        (updateRes.status !== 200 && updateRes.status !== 201) ||
        updateRes.data?.success === false
      ) {
        return {
          success: false,
          apiCreated: true,
          updateResult: updateRes.data,
          message:
            updateRes.data?.msg ||
            updateRes.data?.message ||
            `Booking record was created, but update-queue failed (Status: ${updateRes.status}).`,
          activeQueue: res.data,
        };
      }

      const activeQueue = await this.getActiveQueue();
      if (!activeQueue?.queue) {
        return {
          success: false,
          apiCreated: true,
          updateResult: updateRes.data,
          message:
            "Booking and update-queue completed, but the app active queue endpoint does not show it. Do not treat this as a completed app booking.",
          activeQueue: res.data,
        };
      }

      const confirmedQueue = {
        ...(res.data?.createReserv ?? {}),
        ...activeQueue.queue,
      };
      const confirmedActiveQueue = {
        ...activeQueue,
        queue: confirmedQueue,
      };

      return {
        success: true,
        message: res.data?.msg || "จองคิวสำเร็จ",
        queue: confirmedQueue,
        activeQueue: confirmedActiveQueue,
        updateResult: updateRes.data,
      };
    }

    // เคสมีคิวค้างอยู่แล้ว
    if (res.data?.checkIfUserHaveQueue?.length > 0) {
      const existing = res.data.checkIfUserHaveQueue[0];
      return {
        success: false,
        message: `มีคิวค้างอยู่แล้ว (${existing.name_user}, Shop: ${existing.id_res_auto})`,
        queue: existing,
      };
    }

    // เคสอื่นๆ
    return {
      success: false,
      message: res.data?.msg || `จองไม่สำเร็จ (Status: ${res.status})`,
    };
  }

  // ---------------------------------------------------------
  // 3. ดึงสถานะคิวปัจจุบัน (My Queue)
  // ---------------------------------------------------------
  private extractStoreList(data: any): any[] {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.store)) return data.store;
    if (Array.isArray(data?.stores)) return data.stores;
    if (Array.isArray(data?.result)) return data.result;
    if (Array.isArray(data?.inRadius) || Array.isArray(data?.outRaduis)) {
      return [
        ...(Array.isArray(data.inRadius) ? data.inRadius : []),
        ...(Array.isArray(data.outRaduis) ? data.outRaduis : []),
      ];
    }
    return [];
  }

  private normalizeStore(entry: any): StoreSearchResult[] {
    const store = entry?.store ?? entry;
    const zones = Array.isArray(entry?.allresZone)
      ? entry.allresZone
      : Array.isArray(store?.ResAndZone)
        ? store.ResAndZone
        : [];
    const shopId = Number(
      store?.id_res_auto ??
      store?.id_res ??
      store?.shop_id ??
      store?.store_id ??
      store?.id
    );

    if (!Number.isFinite(shopId)) {
      return [];
    }

    const baseName = String(
      store?.res_name ??
      store?.shop_name_th ??
      store?.shop_name_en ??
      store?.shop_name ??
      store?.name ??
      `Shop ${shopId}`
    );
    const branch = String(
      store?.res_location ??
      store?.res_group_name ??
      store?.branch_name ??
      store?.branch ??
      store?.shop_branch ??
      ""
    );

    const buildResult = (zone: any): StoreSearchResult | null => {
      const zoneId = Number(
        zone?.zone_id ??
        zone?.id_zone ??
        zone?.queue_zone_id ??
        zone?.id ??
        store?.zone_id ??
        store?.id_zone ??
        store?.queue_zone_id ??
        store?.zone?.id ??
        store?.zone?.zone_id
      );

      if (!Number.isFinite(zoneId) || zoneId === 0) {
        return null;
      }

      const result: StoreSearchResult = {
        name: baseName,
        branch,
        zoneName: String(zone?.name ?? store?.zone_name ?? store?.zone?.name ?? store?.type_q_name ?? "Default"),
        shopId,
        zoneId,
        raw: { entry, store, zone },
      };
      const queue = Number(zone?.queue ?? store?.res_queue);
      const distance = Number(entry?.distance);
      if (Number.isFinite(queue)) {
        result.queue = queue;
      }
      if (Number.isFinite(distance)) {
        result.distance = distance;
      }
      return result;
    };

    if (zones.length > 0) {
      return zones
        .filter((zone: any) => Number(zone?.zone_status ?? 1) === 1)
        .map(buildResult)
        .filter((store: StoreSearchResult | null): store is StoreSearchResult => store !== null);
    }

    const result = buildResult({});
    return result ? [result] : [];
  }

  private getSearchLocation(): { latitude: number; longitude: number } {
    return {
      latitude: Number(process.env.QUEQ_SEARCH_LAT || "13.7468"),
      longitude: Number(process.env.QUEQ_SEARCH_LNG || "100.5351"),
    };
  }

  private uniqueStores(stores: StoreSearchResult[]): StoreSearchResult[] {
    const seen = new Set<string>();
    return stores.filter((store) => {
      const key = `${store.shopId}:${store.zoneId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private sortStores(stores: StoreSearchResult[], query: string): StoreSearchResult[] {
    const normalizedQuery = query.toLowerCase();
    return stores.sort((a, b) => {
      const aName = `${a.name} ${a.branch}`.toLowerCase();
      const bName = `${b.name} ${b.branch}`.toLowerCase();
      const aStarts = aName.startsWith(normalizedQuery) ? 0 : 1;
      const bStarts = bName.startsWith(normalizedQuery) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return (a.distance ?? Number.MAX_SAFE_INTEGER) - (b.distance ?? Number.MAX_SAFE_INTEGER);
    });
  }

  async searchStoresByName(query: string): Promise<StoreSearchResult[]> {
    const paths = [
      "dqueue/zone/get_store_all",
      "dqueue/zone/within-radius",
      "dqueue/zone/outside-radius",
    ];
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);
    const location = this.getSearchLocation();

    let allStores: StoreSearchResult[] = [];
    for (const path of paths) {
      const res = await this.request(path, "POST", {
        latitude: location.latitude,
        longitude: location.longitude,
        page: 1,
      });
      if (res.status !== 200 && res.status !== 201) continue;

      allStores = allStores.concat(
        this.extractStoreList(res.data).flatMap((store) => this.normalizeStore(store))
      );
    }

    const matched = this.uniqueStores(allStores).filter((store) => {
      const haystack = `${store.name} ${store.branch} ${store.zoneName}`.toLowerCase();
      return keywords.every((keyword) => haystack.includes(keyword));
    });

    return this.sortStores(matched, query);
  }

  async getMyQueue(): Promise<QueueInfo | null> {
    const res = await this.request("users-reservations/myqueue", "GET");

    if (
      res.status === 200 &&
      res.data?.reservMyqueue?.length > 0
    ) {
      return res.data.reservMyqueue[0] as QueueInfo;
    }

    return null;
  }

  async getCancelableQueue(): Promise<QueueInfo | null> {
    const activeQueue = await this.getActiveQueue();
    if (activeQueue?.queue) {
      return activeQueue.queue as QueueInfo;
    }

    return this.getMyQueue();
  }

  // ---------------------------------------------------------
  // 4. ยกเลิกคิว (Cancel Queue)
  // ---------------------------------------------------------
  async cancelQueue(
    shopId: number,
    zoneId: number,
    queueId: string
  ): Promise<{ success: boolean; message: string }> {
    const payload = {
      id_res_auto: shopId,
      zone_id: zoneId,
      queue_id: queueId,
    };

    const res = await this.request(
      "users-reservations/cancel_queue",
      "POST",
      payload
    );

    if (res.status === 200 || res.status === 201) {
      const activeQueue = await this.getActiveQueue();
      if (activeQueue?.queue && String(activeQueue.queue._id) === String(queueId)) {
        return {
          success: false,
          message:
            "Cancel API returned success, but get_queue still shows the same queue. Do not treat this as canceled.",
        };
      }

      return {
        success: true,
        message: res.data?.message || "ยกเลิกคิวสำเร็จ",
      };
    }

    return {
      success: false,
      message: res.data?.message || `ยกเลิกไม่สำเร็จ (Status: ${res.status})`,
    };
  }

  // ---------------------------------------------------------
  // 5. ล็อกอินด้วย OTP (ขอ OTP -> ส่ง OTP -> ได้ Token)
  // ---------------------------------------------------------
  async requestOTP(
    phoneNumber: string
  ): Promise<{ success: boolean; message: string }> {
    const res = await this.request("auth/request-otp", "POST", {
      phoneNumber,
    });

    if (res.status === 200 || res.status === 201) {
      return { success: true, message: "ส่ง OTP สำเร็จ" };
    }

    return {
      success: false,
      message: res.data?.message || `ขอ OTP ไม่สำเร็จ (Status: ${res.status})`,
    };
  }

  async verifyOTP(
    phoneNumber: string,
    otpCode: string
  ): Promise<{
    success: boolean;
    tokens?: QueqTokens;
    message: string;
  }> {
    const res = await this.request("auth/verify-otp", "POST", {
      phoneNumber,
      otp: otpCode,
    });

    if (res.status === 200 || res.status === 201) {
      const accessToken =
        res.data?.accessToken?.accessToken ||
        res.data?.accessToken ||
        res.data?.token;
      const refreshToken =
        res.data?.refreshToken || res.data?.refresh_token;

      if (accessToken) {
        this.accessToken = accessToken;
        if (refreshToken) {
          this.refreshTokenValue = refreshToken;
        }

        return {
          success: true,
          tokens: {
            accessToken,
            refreshToken: refreshToken || this.refreshTokenValue,
          },
          message: "ล็อกอินสำเร็จ",
        };
      }
    }

    return {
      success: false,
      message:
        res.data?.message || `ยืนยัน OTP ไม่สำเร็จ (Status: ${res.status})`,
    };
  }

  // ---------------------------------------------------------
  // 6. ยกเลิกคิวที่ค้างอยู่อัตโนมัติ (Auto Cancel Existing)
  // ---------------------------------------------------------
  async cancelExistingQueue(): Promise<{
    success: boolean;
    message: string;
  }> {
    const queue = await this.getCancelableQueue();

    if (!queue) {
      return { success: true, message: "ไม่มีคิวค้างในระบบ" };
    }

    const queueId = queue._id;
    return this.cancelQueue(queue.id_res_auto, queue.zone_id, queueId);
  }
}
