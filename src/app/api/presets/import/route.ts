import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

type ImportFile = { version?:string; presets: Array<{type:string; name:string; pattern?:string; example?:string; isDefault?:boolean}> };

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ ok:false }, { status:401 });

  const body = (await req.json().catch(()=>null)) as ImportFile | null;
  if (!body?.presets?.length) return NextResponse.json({ ok:false, error:"Invalid file" }, { status:400 });

  const defaultsByType = new Set(body.presets.filter(p => p.isDefault).map(p => p.type));
  if (defaultsByType.size) {
    await prisma.preset.updateMany({
      where: { userId: session.user.id as string, type: { in: [...defaultsByType] } },
      data: { isDefault: false }
    });
  }

  const created = await prisma.$transaction(
    body.presets.map(p => prisma.preset.create({
      data: { ...p, userId: session.user.id as string, isDefault: !!p.isDefault }
    }))
  );

  return NextResponse.json({ ok:true, count: created.length });
}


