import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ ok:false }, { status:401 });
  const items = await prisma.preset.findMany({
    where: { userId: session.user.id as string },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok:true, items });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ ok:false }, { status:401 });

  const { type, name, pattern, example, isDefault = false } = await req.json();
  if (!type || !name) return NextResponse.json({ ok:false, error:"type and name required" }, { status:400 });

  if (isDefault) {
    await prisma.preset.updateMany({ where: { userId: session.user.id as string, type }, data: { isDefault:false } });
  }
  const item = await prisma.preset.create({
    data: { userId: session.user.id as string, type, name, pattern, example, isDefault },
  });
  return NextResponse.json({ ok:true, item });
}


