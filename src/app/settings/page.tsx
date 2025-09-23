import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { Header } from "@/components/Header";
import SettingsClient from "@/components/SettingsClient";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="min-h-screen bg-gray-900 w-full">
      <Header />
      <SettingsClient user={session.user} />
    </div>
  );
}
