// Tiny single-concept pictograms (the cheap tier). Stroke-based, inherit
// currentColor, ~1KB each. Used for UI chrome and category labels.
import type { SVGProps } from 'react';

export type IconName =
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
  | 'spark'
  | 'paw'
  | 'tree'
  | 'leaf'
  | 'monument'
  | 'child'
  | 'heart'
  | 'drop'
  | 'bulb'
  | 'compass'
  | 'community';

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
  paw: (
    <>
      <circle cx="6.5" cy="11" r="1.6" />
      <circle cx="10" cy="7.5" r="1.6" />
      <circle cx="14" cy="7.5" r="1.6" />
      <circle cx="17.5" cy="11" r="1.6" />
      <path d="M12 13c-3 0-5 2-5 4.3C7 19.2 9 20 12 20s5-.8 5-2.7C17 15 15 13 12 13z" />
    </>
  ),
  tree: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c-3.6 0-6.5-2.6-6.5-5.8C5.5 5.8 8.4 3 12 3s6.5 2.8 6.5 6.2C18.5 12.4 15.6 15 12 15z" />
      <path d="M12 12l-2.6-2.6M12 12l2.6-2.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M5.5 18.5C9.5 15 13 12 17 9" />
    </>
  ),
  monument: (
    <>
      <path d="M6 11a6 6 0 0 1 12 0" />
      <path d="M4 21h16M4.5 11h15" />
      <path d="M7.5 11v10M12 11v10M16.5 11v10" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M7 21v-3.5a5 5 0 0 1 10 0V21" />
    </>
  ),
  heart: <path d="M12 20S3.5 15 3.5 8.8C3.5 6 5.6 4.2 8 4.2c1.8 0 3.1 1 4 2.2.9-1.2 2.2-2.2 4-2.2 2.4 0 4.5 1.8 4.5 4.6C20.5 15 12 20 12 20z" />,
  drop: <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z" />,
  bulb: (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 0-3.8 10.6c1 .9 1.3 1.7 1.3 2.4h5c0-.7.3-1.5 1.3-2.4A6 6 0 0 0 12 3z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.6 8.4l-2.3 5.5-5.5 2.3 2.3-5.5z" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="9.5" r="2.6" />
      <path d="M6.5 18.5v-1a5.5 5.5 0 0 1 11 0v1" />
      <circle cx="5.4" cy="8" r="1.9" />
      <path d="M2.4 15.6a3.2 3.2 0 0 1 3-2.4" />
      <circle cx="18.6" cy="8" r="1.9" />
      <path d="M21.6 15.6a3.2 3.2 0 0 0-3-2.4" />
    </>
  ),
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
