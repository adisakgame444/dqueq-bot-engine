import { redirect } from "next/navigation";

export default function AccountsPageRedirect() {
  redirect("/manager");
}
