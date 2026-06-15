import { NextResponse, type NextRequest } from "next/server";
import { getClientIp, rateLimit } from "@/lib/security/rate-limit";

const ONE_MINUTE = 60_000;

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

const SUSPICIOUS_PATH_PATTERN =
  /(?:^|\/)(?:wp-admin|wp-login\.php|xmlrpc\.php|phpmyadmin|\.env|\.git|vendor|cgi-bin)(?:\/|$)/i;

function getRateLimitFor(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/contact") {
    return { limit: 10, windowMs: ONE_MINUTE, scope: "edge-contact" };
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return { limit: 30, windowMs: ONE_MINUTE, scope: "api" };
  }

  return { limit: 180, windowMs: ONE_MINUTE, scope: "page" };
}

function applySecurityHeaders(response: NextResponse) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }

  return response;
}

function tooManyRequests(retryAfter: number) {
  const response = NextResponse.json(
    { ok: false, error: "Too many requests. Try again shortly." },
    { status: 429 },
  );

  response.headers.set("Retry-After", String(retryAfter));
  response.headers.set("Cache-Control", "no-store");

  return applySecurityHeaders(response);
}

export function middleware(request: NextRequest) {
  if (SUSPICIOUS_PATH_PATTERN.test(request.nextUrl.pathname)) {
    return applySecurityHeaders(new NextResponse(null, { status: 404 }));
  }

  const ip = getClientIp(request.headers);
  const { limit, windowMs, scope } = getRateLimitFor(request);
  const result = rateLimit(`${scope}:${ip}`, { limit, windowMs });

  if (result.limited) {
    return tooManyRequests(result.retryAfter);
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(result.limit));
  response.headers.set("X-RateLimit-Remaining", String(result.remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff2?)$).*)",
  ],
};
