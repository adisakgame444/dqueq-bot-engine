import { redirect } from "next/navigation";
import AuthForm from "../../components/AuthForm";
import { getCurrentWebUser } from "../../lib/web_auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentWebUser();
  if (user) redirect("/");
  return <AuthForm mode="login" />;
}
