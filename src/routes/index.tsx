import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, NotebookPen, ListChecks, ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { Activity } from "@/hooks/useAiTool";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Three AI tools for everyday work: draft professional emails, summarise meeting notes and plan your tasks.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Draft emails, summarise meetings and plan your day with AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email",
    body: "Turn a topic, recipient and a few key points into a ready-to-send professional email.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes",
    body: "Paste raw notes and get a summary, key decisions, action items and deadlines.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "Task Planner",
    body: "Organise your real tasks into a prioritised daily or weekly schedule.",
  },
] as const;

function Dashboard() {
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aiwa.activity");
      if (raw) setActivity(JSON.parse(raw) as Activity[]);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AppShell
      title="Dashboard"
      description="Your AI assistant for everyday workplace writing and planning."
    >
      <section className="overflow-hidden rounded-2xl border border-border bg-gradient-brand p-6 md:p-8">
        <h2 className="font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
          Do the writing and planning in minutes, not hours
        </h2>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Three focused AI tools built around your own input — no demo answers, no filler.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {tools.map(({ to, icon: Icon, title, body }) => (
          <Link key={to} to={to} className="group">
            <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-glow">
              <CardHeader>
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="font-display text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Nothing yet — generate an email, summary or plan and it will show up here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {activity.map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {new Date(item.at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
