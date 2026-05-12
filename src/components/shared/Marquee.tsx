import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  divider = "·",
}: {
  items: string[];
  className?: string;
  divider?: string;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden hide-scrollbar relative", className)}>
      <div className="flex marquee-track w-max">
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center px-8 md:px-14">
            <span className="font-display text-display-sm text-cream whitespace-nowrap">
              {it}
            </span>
            <span
              aria-hidden
              className="ml-8 md:ml-14 text-accent font-display text-display-sm"
            >
              {divider}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
