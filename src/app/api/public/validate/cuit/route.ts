import { NextRequest, NextResponse } from "next/server";
import { validateCUIT } from "@validar/core";
import { rateLimit } from "@/lib/ratelimit";
import { getIp } from "@/lib/ip";

export async function POST(req: NextRequest) {
  const ip = await getIp();
  const rl = rateLimit(ip);
  if (!rl.ok) return new NextResponse(JSON.stringify({ ok:false, error:"rate_limited" }), { status:429, headers: rl.headers });

  const { cuit } = await req.json().catch(()=>({} as Record<string, unknown>));
  const ok = typeof cuit === "string" ? validateCUIT(cuit) : false;
  return new NextResponse(JSON.stringify({ ok, type:"cuit" }), { status:200, headers: rl.headers });
}


