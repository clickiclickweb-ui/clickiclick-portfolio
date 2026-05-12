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
        "inline-flex items-baseline font-sans font-extrabold tracking-[-0.04em] text-cream leading-none",
        className,
      )}
      aria-label="Clickiclick.studio"
    >
      <span>CLICK</span>
      {withDot ? (
        <span aria-hidden className="text-accent">
          .
        </span>
      ) : null}
      <span>ICLICK</span>
      {withSubscript ? (
        <span className="font-italic-display text-[0.45em] font-normal italic translate-y-[-0.15em] ml-[0.18em] text-cream-soft tracking-normal">
          studio
        </span>
      ) : null}
    </span>
  );
}
