import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import PresetsPageClient from "@/components/PresetsPageClient";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  return <PresetsPageClient />;
}
