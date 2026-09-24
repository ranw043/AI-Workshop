# CLAUDE.md

## Stack
- Next.js with the App Router, TypeScript, plain CSS. No Tailwind or other CSS frameworks.
- Supabase for sign-in and the database.
- Deployed on Vercel from the main branch of ranw043/AI-Workshop.

## Commands
- `npm run dev` starts the site locally.
- `npm run build` checks the site builds for production.
- `npm run lint` checks code style.
These assume npm. If package.json says otherwise, tell Ran instead of guessing.

## Never
- Add a dependency without asking first.
- Edit .env, .env.local, or any environment variable.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.
- Put passwords, API keys, or connection strings in code, commits, or chat.
- Use real personal data. Fake names and fake content only.
- Delete or rename existing files without asking.
- Commit or merge unless Ran's prompt explicitly says to.

## Conventions
- Explain every change in plain language, not only in code. Ran has no coding background.
- Show Ran what changed and stop before committing, unless the prompt says otherwise.
- One slice per pull request.
- Every Supabase table has row level security on, so each person can only read and change their own rows.
- The six skills are fixed: Reading, Writing, Listening, Speaking, Vocabulary, Grammar.
- At the end of a session, say which of roadmap.md, project-state.md, and CLAUDE.md need updating.

## Current focus
See roadmap.md, work only on the slice marked ACTIVE.
