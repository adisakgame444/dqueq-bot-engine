import { redirect } from "next/navigation";
import DashboardClient from "../../components/DashboardClient";
import { loadApiAccountsDb } from "../../lib/api_accounts";
import { syncActiveApiBookingsFromAccounts } from "../../lib/api_bookings";
import { getCurrentWebUser } from "../../lib/web_auth";
import { getEmailCloneMap } from "../../lib/email_clone_map";

export const dynamic = "force-dynamic";

export default async function ManagerPage() {
  const user = await getCurrentWebUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");

  const accounts = (await loadApiAccountsDb()).map((account) => ({
    id: account.id,
    email: account.email,
    displayName: account.displayName,
    active: account.active,
    updatedAt: account.updatedAt,
    ...(account.otpCode ? { otpCode: account.otpCode } : {}),
  }));
  const bookings = await syncActiveApiBookingsFromAccounts();
  const emailCloneMap = getEmailCloneMap();

  return (
    <DashboardClient
      initialData={{
        accounts,
        bookings,
        emailCloneMap,
        updatedAt: new Date().toISOString(),
      }}
    />
  );
}
