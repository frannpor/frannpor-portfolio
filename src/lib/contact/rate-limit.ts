import { rateLimit } from "@/lib/security/rate-limit";

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  return rateLimit(`contact:${key}`, { limit, windowMs }).limited;
}
