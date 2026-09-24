import { Copy, RefreshCw, Trash2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
  emptyHint: string;
  rows?: number;
};

export function OutputEditor({
  title,
  value,
  onChange,
  onRegenerate,
  onClear,
  loading,
  error,
  emptyHint,
  rows = 18,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Card className="border-border/70">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <CardTitle className="font-display text-base">{title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={copy} disabled={!value || loading}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="secondary" size="sm" onClick={onRegenerate} disabled={loading}>
            <RefreshCw className="size-4" />
            Regenerate
          </Button>
          <Button variant="ghost" size="sm" onClick={onClear} disabled={!value || loading}>
            <Trash2 className="size-4" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            <p className="text-sm text-muted-foreground">Generating with AI…</p>
          </div>
        ) : value ? (
          <Textarea
            value={value}
            rows={rows}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[320px] resize-y font-mono text-sm leading-relaxed"
          />
        ) : (
          <div className="grid min-h-[200px] place-items-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {emptyHint}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
