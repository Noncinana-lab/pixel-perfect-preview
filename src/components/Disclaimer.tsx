import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
      AI-generated content should be reviewed before use. Do not enter confidential, personal,
      financial, customer, or sensitive company information. AI outputs may contain errors.
    </p>
  );
}
