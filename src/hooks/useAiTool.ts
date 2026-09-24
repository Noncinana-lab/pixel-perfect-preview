import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateWithAI } from "@/lib/ai.functions";

export type Activity = { label: string; at: number };

export function useLocalState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state]);

  return [state, setState] as const;
}

function logActivity(label: string) {
  try {
    const raw = localStorage.getItem("aiwa.activity");
    const list = raw ? (JSON.parse(raw) as Activity[]) : [];
    localStorage.setItem(
      "aiwa.activity",
      JSON.stringify([{ label, at: Date.now() }, ...list].slice(0, 8)),
    );
  } catch {
    /* ignore */
  }
}

export function useAiTool(storageKey: string, activityLabel?: string) {
  const run = useServerFn(generateWithAI);
  const [output, setOutput] = useLocalState<string>(storageKey, "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (system: string, prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await run({ data: { system, prompt } });
      setOutput(result.text);
      if (activityLabel) logActivity(activityLabel);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { output, setOutput, loading, error, setError, generate };
}
