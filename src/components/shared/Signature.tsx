import { cn } from "@/lib/utils";

/**
 * Placeholder editorial signature mark.
 * Uses italic display typography + a hand-drawn-style flourish path.
 * Will be replaced by the actual scanned signature SVG when Diego provides it.
 */
export function Signature({ className }: { className?: string }) {
  return (
    <div className={cn("inline-block", className)} aria-hidden>
      <svg
        viewBox="0 0 220 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <text
          x="0"
          y="48"
          fontFamily="Gambarino, Editorial New, serif"
          fontStyle="italic"
          fontWeight="400"
          fontSize="46"
          fill="currentColor"
          letterSpacing="-0.02em"
        >
          Diego
        </text>
        <path
          d="M 4 62 Q 50 70, 100 60 T 200 58"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 140 30 Q 180 18, 215 28"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}
