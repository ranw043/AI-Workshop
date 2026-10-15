"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getSupabase } from "./supabase-client";

// The six skills are fixed. The database only accepts these exact words.
const SKILLS = ["Reading", "Writing", "Listening", "Speaking", "Vocabulary", "Grammar"] as const;

type Task = {
  id: string;
  title: string;
  skill: string;
};

// The signed-in person's study tasks, plus the form for adding a new one.
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState<string>(SKILLS[0]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // When the list appears, fetch this person's tasks, oldest first.
  // We do not filter by user here: the database's row level security
  // only ever hands back the signed-in person's own rows.
  useEffect(() => {
    getSupabase()
      .from("tasks")
      .select("id, title, skill")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setError("Could not load your tasks. Please reload the page.");
        } else {
          setTasks(data ?? []);
        }
        setLoading(false);
      });
  }, []);

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setBusy(true);
    setError("");

    // The database fills in who owns the task, so we only send the text and skill.
    const { data, error } = await getSupabase()
      .from("tasks")
      .insert({ title: trimmed, skill })
      .select("id, title, skill")
      .single();

    if (error) {
      setError("Could not add that task. Please try again.");
    } else {
      setTasks((current) => [...current, data]);
      setTitle("");
    }
    setBusy(false);
  }

  return (
    <section className="section tasks">
      <h2>My study tasks</h2>

      <form className="task-form" onSubmit={handleAdd}>
        <input
          type="text"
          required
          maxLength={200}
          placeholder="e.g. Read one news article"
          aria-label="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select aria-label="Skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
          {SKILLS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" disabled={busy}>
          {busy ? "Adding…" : "Add"}
        </button>
      </form>

      {error && (
        <p className="task-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="task-empty">Loading your tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Add your first one above.</p>
      ) : (
        <ul className="task-items">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <span className="skill-label">{task.skill}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
