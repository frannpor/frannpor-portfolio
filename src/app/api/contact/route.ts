import { NextResponse, type NextRequest } from "next/server";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { getClientIp } from "@/lib/security/rate-limit";
import { sendContactEmail } from "@/lib/contact/mailer";
import { validateContactForm } from "@/lib/contact/validation";

const MAX_CONTACT_BODY_BYTES = 8_192;

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { ok: false, error },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  const contentType = request.headers.get("content-type") ?? "";

  if (contentLength > MAX_CONTACT_BODY_BYTES) {
    return jsonError("Message payload is too large.", 413);
  }

  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return jsonError("Unsupported content type.", 415);
  }

  const ip = getClientIp(request.headers);

  if (isRateLimited(ip)) {
    return jsonError("Too many messages. Try again in a minute.", 429, { "Retry-After": "60" });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid form submission.", 400);
  }

  const validation = validateContactForm(formData);

  if (!validation.ok) {
    return jsonError(validation.error, 400);
  }

  const sent = await sendContactEmail(validation.data);

  if (!sent.ok) {
    return jsonError(sent.error, 502);
  }

  return NextResponse.json({ ok: true, mode: sent.mode }, { headers: { "Cache-Control": "no-store" } });
}
