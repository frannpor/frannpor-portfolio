# Francisco Porciel Portfolio

Personal bilingual portfolio built with Next.js 15, TypeScript and App Router.

The portfolio presents client work, professional experience and personal projects in Spanish and English. It includes localized PDF and Word CV downloads, an interactive portrait, project galleries and a contact form.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Structure

```txt
src/app                  Next App Router pages, layout and API routes
src/features/home        Portfolio feature: sections, content, i18n and styling
src/features/home/data   Typed content split by locale and shared profile data
src/features/home/i18n   Language provider and persisted ES/EN switch
src/features/liquid-glass/kit-v2  Liquid glass surface (SVG refraction over backdrop-filter)
src/lib/contact          Contact validation, rate limit and email adapter
src/shared/config        Small shared app configuration
src/types                Local type declarations
```

## Contact Email

Without email configuration, the contact form retains the message and offers direct email contact. To send real email, configure:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=porcielfranciscoramon@gmail.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

See `.env.example`.

## Interaction and content

- The language switch preserves form input and respects reduced-motion preferences. The choice is stored in a `portfolio-locale` cookie, so the server renders it from the first paint; this makes the pages server-rendered on demand.
- The header, secondary actions and tab lenses use liquid glass. `src/features/home/components/ui/Glass.tsx` draws displacement and specular maps for each element's real size and uses the kit's light bezel filter; chromatic aberration is limited to fine-pointer desktops because it triples the filter work. Glass needs an opaque, unfiltered ancestor chain, so blocks holding glass reveal with motion only.
- The portrait supports pointer dragging, tap effects and keyboard interaction.
- On desktop, scrolling advances the experience route inside a sticky panel; each stop also works with pointer and keyboard. Mobile uses expandable stops. Reduced motion disables scroll-driven selection.
- Project galleries lock background scrolling, support Escape and restore focus on close.
- Privacy and terms content remains in source. Public access is disabled by `publicLegalPages` in `src/features/legal/visibility.ts`; those routes return 404.
- Current CVs are stored in `public/` as PDF and DOCX files for both languages.
- Link previews use a 1200 × 630 PNG generated from the existing portrait in `src/app/opengraph-image.tsx`, with absolute Open Graph URLs, a canonical URL and a large Twitter card.

## Production deployment

The live site at https://www.frannpor-dev.com/ is hosted on AWS Amplify in `sa-east-1`, with CloudFront serving the custom domain. The GitHub repository has an active Amplify webhook for push events.

Publish changes through a pull request into `main`, then verify the updated content and CV downloads on the custom domain after Amplify finishes building.

The app uses Next.js App Router and a server API route for contact submissions. Keep server rendering and API route support enabled in the hosting configuration. The repository pins Node 22.16.0 in `.node-version`.

Required environment variables for real email:

```txt
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

Optional:

```txt
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

When email delivery is not configured, visitors can contact the same address directly using the email link. The form never reports a successful delivery for dry-run responses.
