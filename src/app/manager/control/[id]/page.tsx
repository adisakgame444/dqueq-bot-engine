import { redirect } from "next/navigation";
import { getCurrentWebUser } from "../../../../lib/web_auth";
import DeviceControlClient from "../../../../components/DeviceControlClient";

export const dynamic = "force-dynamic";

export default async function ManagerControlPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const user = await getCurrentWebUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const params = await props.params;
  const cloneId = Number(params.id) || 1;

  return <DeviceControlClient cloneId={cloneId} />;
}
