import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { Header } from "@/components/Header";
import PresetsClient from "@/components/PresetsClient";

export default async function PresetsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="min-h-screen bg-gray-900 w-full">
      <Header />
      <PresetsClient />
    </div>
  );
}