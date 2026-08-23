import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Composer({
  value,
  onChange,
  onSend,
  disabled,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="border-t border-border p-3">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Ask the next question…"}
          rows={3}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              onSend();
            }
          }}
          className="pr-12"
        />
        <Button
          type="button"
          size="icon-sm"
          className="absolute bottom-2 right-2"
          disabled={disabled || !value.trim()}
          onClick={onSend}
          aria-label="Send"
        >
          <ArrowUp />
        </Button>
      </div>
      <p className="mt-1.5 text-[11px] text-subtle">Ctrl or Cmd + Enter to send</p>
    </div>
  );
}
