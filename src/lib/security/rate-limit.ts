type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  limited: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

function cleanExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  cleanExpiredBuckets(now);

  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });

    return {
      limited: false,
      limit: options.limit,
      remaining: Math.max(options.limit - 1, 0),
      resetAt,
      retryAfter: Math.ceil(options.windowMs / 1000),
    };
  }

  current.count += 1;
  buckets.set(key, current);

  const retryAfter = Math.max(Math.ceil((current.resetAt - now) / 1000), 1);
  const remaining = Math.max(options.limit - current.count, 0);

  return {
    limited: current.count > options.limit,
    limit: options.limit,
    remaining,
    resetAt: current.resetAt,
    retryAfter,
  };
}

export function getClientIp(headers: Headers) {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

