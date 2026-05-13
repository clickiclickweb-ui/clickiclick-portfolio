import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  withDot = true,
  withSubscript = true,
}: {
  className?: string;
  withDot?: boolean;
  withSubscript?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-sans font-extrabold tracking-[-0.035em] text-cream leading-none whitespace-nowrap shrink-0",
        className,
      )}
      aria-label="Clickiclick.studio"
    >
      <span>CLICKICLICK</span>
      {withDot ? (
        <span aria-hidden className="text-accent">
          .
        </span>
      ) : null}
      {withSubscript ? (
        <span className="font-italic-display text-[0.55em] font-normal italic translate-y-[-0.18em] ml-[0.12em] text-cream-soft tracking-normal">
          studio
        </span>
      ) : null}
    </span>
  );
}
