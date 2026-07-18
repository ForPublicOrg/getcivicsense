// Tiny single-concept pictograms (the cheap tier). Stroke-based, inherit
// currentColor, ~1KB each. Used for UI chrome and category labels.
import type { SVGProps } from 'react';

type IconName =
  | 'search'
  | 'chevron'
  | 'arrow-up'
  | 'arrow-down'
  | 'external'
  | 'shield'
  | 'info'
  | 'share'
  | 'check'
  | 'road'
  | 'horn'
  | 'bin'
  | 'bus'
  | 'spark';

const PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  'arrow-up': <path d="M12 19V5M6 11l6-6 6 6" />,
  'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5l-8 8" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  road: (
    <>
      <path d="M6 21L9 3h6l3 18" />
      <path d="M12 5v2M12 11v2M12 17v2" />
    </>
  ),
  horn: (
    <>
      <path d="M4 10v4h4l6 4V6l-6 4H4z" />
      <path d="M18 9a4 4 0 0 1 0 6M20.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  bin: (
    <>
      <path d="M4 7h16" />
      <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
      <path d="M9 7V4h6v3M10 11v7M14 11v7" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M4 12h16M9 5v7" />
      <circle cx="8" cy="19" r="1.6" />
      <circle cx="16" cy="19" r="1.6" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
};

export default function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
