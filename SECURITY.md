# Security review — 2026-11-03

## Verified locally

- Next.js and eslint-config-next patched to 15.5.28. The previous 15.5.27 release was affected by [GHSA-2464-fhr4-w9xw](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw) and [GHSA-p3m5-59mp-jv5r](https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r).
- The middleware sets HSTS, nosniff, frame denial, referrer, permissions and opener policies. A read-only HEAD request to the public site confirmed HSTS, nosniff, frame denial and permissions headers.
- Contact submissions have server-side field validation, a honeypot and rate limits. No-key responses use dry-run mode and the UI retains the message instead of claiming delivery.
- Environment files are ignored. Only .env.example is tracked. A limited scan of tracked files found no AWS access-key, GitHub token or private-key patterns; this is not a full secret-history audit.

- `npm audit --omit=dev` reports zero production advisories after the patch. The full audit still reports 15 development-only findings (14 moderate and one high) in the lint toolchain; resolving those requires a separately tested toolchain update, not `npm audit fix --force`.

## Limits before calling hosting hardened

- Rate limits are in process memory, reset on restarts and are not shared across Amplify instances. Client IP selection reads proxy headers; their trust boundary needs verification against the deployed ingress. This does not replace AWS WAF.
- The contact body limit currently checks Content-Length before parsing; chunked or misleading requests require a real ingress/body-size limit.
- No Content-Security-Policy is configured in this repository or was observed on the public HEAD response. A nonce-based policy must be tested with Next.js rendering before enforcement.
- AWS CLI is installed but has no credentials in this session. WAF rules, IAM permissions, Amplify environment/secrets, logging, alarms, budgets and branch deployment rules were not inspected or changed.
- No production deployment was performed. The local dependency patch does not update the currently published site until deployment.

A clean dependency audit covers known package advisories at the time of the check, not every possible application or infrastructure attack.
