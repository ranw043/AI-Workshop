"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "./supabase-client";

type Mode = "idle" | "signup" | "login";

// The sign up / log in / log out box at the top of the page.
export default function AuthPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<Mode>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // When the page opens, ask Supabase whether someone is already signed in,
  // and keep listening for sign-in and sign-out changes.
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  function openForm(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = getSupabase();

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (!data.session) {
        setError("Account created, but Supabase did not sign you in. Check your email for a confirmation link.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Wrong email or password. You are not signed in.");
      }
    }

    setBusy(false);
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
    openForm("idle");
    setEmail("");
  }

  if (checking) {
    return <section className="auth">Checking sign-in…</section>;
  }

  if (user) {
    return (
      <section className="auth">
        <p className="auth-status">
          Signed in as <strong>{user.email}</strong>
        </p>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </section>
    );
  }

  return (
    <section className="auth">
      <div className="auth-buttons">
        <button type="button" onClick={() => openForm("login")}>
          Log in
        </button>
        <button type="button" onClick={() => openForm("signup")}>
          Sign up
        </button>
      </div>

      {mode !== "idle" && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{mode === "signup" ? "Create an account" : "Log in"}</h2>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={busy}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
          </button>
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
