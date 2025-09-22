const WINDOW_MS = 60_000;  // 1 min
const LIMIT = 30;          // 30 req/min por IP

type Entry = { count: number; reset: number };
const memory = new Map<string, Entry>();

function hdr(count:number, reset:number, limit:number) {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(Math.max(0, limit - count)),
    "X-RateLimit-Reset": String(Math.ceil(reset/1000))
  } as Record<string,string>;
}

export function rateLimit(ip: string): { ok: boolean; headers: Record<string,string> } {
  const now = Date.now();
  const entry = memory.get(ip);
  if (!entry || now > entry.reset) {
    const reset = now + WINDOW_MS;
    memory.set(ip, { count: 1, reset });
    return { ok: true, headers: hdr(1, reset, LIMIT) };
  }
  if (entry.count >= LIMIT) {
    return { ok: false, headers: hdr(entry.count, entry.reset, LIMIT) };
  }
  entry.count++;
  return { ok: true, headers: hdr(entry.count, entry.reset, LIMIT) };
}


