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

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Organise your real tasks into a practical daily or weekly schedule with priorities, time slots and reasons.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Turn a task list into a prioritised, time-blocked plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

const SYSTEM = `You are a workplace planning assistant.
Organise the user's actual tasks into a practical schedule that fits the available working hours, prioritising urgent and important work.
Never invent tasks that were not supplied.
Return plain text only. Start with one short line stating the plan period, then a table-style list where each task is a block of exactly these five lines:

PRIORITY: <1, 2, 3 … with 1 highest>
TASK: <task>
SUGGESTED TIME: <time slot, or day + time slot for weekly plans>
DEADLINE: <deadline from the user's input, or "Not specified">
REASON: <one short sentence on why this priority>

Separate blocks with a blank line. Keep total scheduled time within the available hours and note any overflow at the end as "UNSCHEDULED:". No markdown fences.`;

function PlannerPage() {
  const [form, setForm] = useLocalState("aiwa.planner.form", {
    tasks: "",
    date: "",
    hours: "8",
    priorities: "",
    mode: "Daily",
  });
  const { output, setOutput, loading, error, setError, generate } = useAiTool("aiwa.planner.output", "Created a task plan");

  const submit = async () => {
    if (!form.tasks.trim()) {
      setError("Add at least one task to plan.");
      return;
    }
    await generate(
      SYSTEM,
      `Planning mode: ${form.mode}
Start date: ${form.date || "not specified"}
Available working hours: ${form.hours} per day
Priority preferences: ${form.priorities || "none given"}
Tasks (with any deadlines the user noted):
${form.tasks}`,
    );
  };

  return (
    <AppShell
      title="AI Task Planner"
      description="Turn your task list into a prioritised, time-blocked plan."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">Plan inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks</Label>
              <Textarea
                id="tasks"
                rows={7}
                placeholder={"- Finish budget review (due Wed)\n- Client call prep\n- Draft onboarding doc"}
                value={form.tasks}
                onChange={(e) => setForm({ ...form, tasks: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Working hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={16}
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefs">Priority preferences</Label>
              <Input
                id="prefs"
                placeholder="Client work first, deep focus in the morning"
                value={form.priorities}
                onChange={(e) => setForm({ ...form, priorities: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Planning period</Label>
              <Select value={form.mode} onValueChange={(mode) => setForm({ ...form, mode })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={submit} disabled={loading}>
              <Sparkles className="size-4" />
              {loading ? "Planning…" : "Generate plan"}
            </Button>
          </CardContent>
        </Card>

        <OutputEditor
          title="Your plan"
          value={output}
          onChange={setOutput}
          onRegenerate={submit}
          onClear={() => setOutput("")}
          loading={loading}
          error={error}
          emptyHint="Add your tasks and generate a plan — priorities, time slots and reasons appear here."
        />
      </div>
    </AppShell>
  );
}
