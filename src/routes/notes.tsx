import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { OutputEditor } from "@/components/OutputEditor";
import { useAiTool, useLocalState } from "@/hooks/useAiTool";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get a structured summary with key decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Turn messy meeting notes into decisions, action items and deadlines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesPage,
});

const SYSTEM = `You summarise workplace meeting notes.
Use only information present in the notes; never invent decisions, owners or dates.
Return plain text with exactly these four sections, in this order and with these headings:

SUMMARY
KEY DECISIONS
ACTION ITEMS
DEADLINES

Use short bullet lines starting with "- ". For action items use "- <owner>: <task>". For deadlines use "- <date or timeframe>: <what is due>".
If a section has nothing in the notes, write "- None mentioned". No markdown fences, no extra commentary.`;

function NotesPage() {
  const [notes, setNotes] = useLocalState("aiwa.notes.input", "");
  const { output, setOutput, loading, error, setError, generate } = useAiTool("aiwa.notes.output");

  const submit = async () => {
    if (notes.trim().length < 30) {
      setError("Paste a bit more of the meeting notes so the summary is useful.");
      return;
    }
    await generate(SYSTEM, `Meeting notes:\n${notes}`);
  };

  return (
    <AppShell
      title="Meeting Notes Summarizer"
      description="Turn raw notes into decisions, actions and deadlines."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,480px)_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">Meeting notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={18}
              className="min-h-[320px] resize-y"
              placeholder="Paste your raw meeting notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">{notes.length} characters</span>
              <Button onClick={submit} disabled={loading}>
                <Sparkles className="size-4" />
                {loading ? "Summarising…" : "Summarise notes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <OutputEditor
          title="Structured summary"
          value={output}
          onChange={setOutput}
          onRegenerate={submit}
          onClear={() => setOutput("")}
          loading={loading}
          error={error}
          emptyHint="Your summary, key decisions, action items and deadlines will appear here."
        />
      </div>
    </AppShell>
  );
}
