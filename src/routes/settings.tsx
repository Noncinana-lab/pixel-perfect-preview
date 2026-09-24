import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Manage locally stored drafts and review the responsible AI guidance for the workplace assistant.",
      },
      { property: "og:title", content: "Settings" },
      {
        property: "og:description",
        content: "Manage locally stored drafts and responsible AI guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [cleared, setCleared] = useState(false);

  const clearAll = () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("aiwa."))
      .forEach((k) => localStorage.removeItem(k));
    setCleared(true);
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <AppShell title="Settings" description="Local data and responsible AI guidance.">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Local data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your drafts, notes and plans are stored only in this browser. Nothing is saved to an
            account or a database.
          </p>
          <Button variant="destructive" onClick={clearAll}>
            {cleared ? "Cleared" : "Clear all saved drafts"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Responsible AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Always review AI output before sending or acting on it.</p>
          <p>
            Never enter confidential, personal, financial, customer or sensitive company
            information.
          </p>
          <p>AI can make mistakes — check names, numbers, dates and commitments yourself.</p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
