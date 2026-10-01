import { createBrowserClient } from "@supabase/ssr";

// Makes the connection to Supabase that runs in the visitor's browser.
// The address and public key come from environment variables set in Vercel.
// Supabase remembers who is signed in using browser cookies, so closing the
// tab and coming back keeps the person signed in.
export function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
