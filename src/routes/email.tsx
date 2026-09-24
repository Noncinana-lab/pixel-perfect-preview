import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { OutputEditor } from "@/components/OutputEditor";
import { useAiTool, useLocalState } from "@/hooks/useAiTool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate complete, professional workplace emails from your topic, recipient, key points and preferred tone.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Turn a few key points into a polished professional email in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const SYSTEM = `You are a professional workplace communication assistant.
Write complete, ready-to-send business emails based strictly on the user's inputs.
Rules:
- Use the exact recipient, purpose and key points supplied. Never invent facts, names, numbers or commitments.
- Match the requested tone precisely.
- Output plain text only, in this shape: "Subject: <subject line>", a blank line, greeting, body paragraphs, closing and sign-off placeholder [Your Name].
- Keep it concise and skimmable. No commentary, no markdown fences.`;

function EmailPage() {
  const [form, setForm] = useLocalState("aiwa.email.form", {
    purpose: "",
    recipient: "",
    keyPoints: "",
    tone: "Formal",
  });
  const { output, setOutput, loading, error, setError, generate } = useAiTool("aiwa.email.output", "Generated an email draft");

  const submit = async () => {
    if (!form.purpose.trim() || !form.keyPoints.trim()) {
      setError("Please add the email purpose and at least one key point.");
      return;
    }
    await generate(
      SYSTEM,
      `Purpose/topic: ${form.purpose}
Recipient: ${form.recipient || "the recipient"}
Key points to cover:
${form.keyPoints}
Tone: ${form.tone}`,
    );
  };

  return (
    <AppShell
      title="Smart Email Generator"
      description="Draft a polished professional email from your own key points."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">Email details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose / topic</Label>
              <Input
                id="purpose"
                placeholder="Request a deadline extension for the Q3 report"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Thandi, Operations Manager"
                value={form.recipient}
                onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Key points</Label>
              <Textarea
                id="points"
                rows={7}
                placeholder={"- Data import delayed by two days\n- New date proposed: Friday\n- Draft already shared"}
                value={form.keyPoints}
                onChange={(e) => setForm({ ...form, keyPoints: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={form.tone} onValueChange={(tone) => setForm({ ...form, tone })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={submit} disabled={loading}>
              <Sparkles className="size-4" />
              {loading ? "Generating…" : "Generate email"}
            </Button>
          </CardContent>
        </Card>

        <OutputEditor
          title="Generated email"
          value={output}
          onChange={setOutput}
          onRegenerate={submit}
          onClear={() => setOutput("")}
          loading={loading}
          error={error}
          emptyHint="Fill in the details and generate your email — the draft will appear here, fully editable."
        />
      </div>
    </AppShell>
  );
}
