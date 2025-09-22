import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ ok:false }, { status:401 });

  const items = await prisma.preset.findMany({
    where: { userId: session.user.id as string },
    orderBy: [{ type: "asc" as const }, { isDefault: "desc" as const }, { createdAt: "desc" as const }],
    select: { type:true, name:true, pattern:true, isDefault:true, example:true }
  });

  return new NextResponse(JSON.stringify({ version:"validar/1", presets: items }, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json", "Content-Disposition": 'attachment; filename="validar-presets.json"' }
  });
}


