# Project state
Last updated: 2026-09-23

## Works
- A Next.js site is deployed on Vercel and live at https://ai-workshop-roan.vercel.app.
- A Supabase project exists and is linked to the repo.

## Broken or flaky
- Nothing known. Nothing has been tested against the roadmap yet.

## Environment notes
- Stack: Next.js App Router, TypeScript, plain CSS, Supabase, Vercel.
- The site does not use Supabase yet. No tables, no sign-in.
- Not yet confirmed: whether the Supabase project URL and public key are set as environment variables in Vercel and in .env.local.
- Supabase Auth needs the live site address added as its Site URL and as a redirect URL. If it is missing, confirmation emails link to localhost and sign-up fails on the live site.
- Supabase's built-in email sender allows only a few emails per hour. Heavy sign-up testing or a live demo can hit that limit.

## Next session
- Start slice 1, sign up and log in.
- Open question: keep email confirmation on, or turn it off to avoid the email limit during the demo. Ran decides.
