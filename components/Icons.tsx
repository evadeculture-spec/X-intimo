import type { IconName } from "@/lib/types";
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function LeafIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 14 4c2 0 4 .4 6 1-1 7-5 14-9 15Z" />
      <path d="M11 20c0-5 3-9 8-11" />
    </svg>
  );
}
export function BadgeIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="m9 12 2 2 4-4" />
      <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
    </svg>
  );
}
export function ChatIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5A8 8 0 1 1 21 12Z" />
    </svg>
  );
}
export function TruckIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}
export function HeartIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.3-9.3-9C1.4 8.3 2.8 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c3.2 0 4.6 3.3 3.3 6-2.3 4.7-9.3 9-9.3 9Z" />
    </svg>
  );
}
export function MoonIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
    </svg>
  );
}
export function SnowflakeIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
export function SockIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M8 3h5v7c0 1 .3 1.7 1.2 2.4l3.4 2.6a3.5 3.5 0 0 1-4.3 5.5l-4-3A4 4 0 0 1 8 16.6V3Z" />
    </svg>
  );
}
export function ShirtIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M9 3 4 6l2 4 2-1v9h8v-9l2 1 2-4-5-3a3 3 0 0 1-6 0Z" />
    </svg>
  );
}
export function WomanIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="3" />
      <path d="M9 21 12 11l3 10M8 14h8" />
    </svg>
  );
}
export function ManIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v12M8 13h8M9 21h6" />
    </svg>
  );
}
export function ChildIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 8.5v6M8 11h8M9.5 21l2.5-6.5L14.5 21" />
    </svg>
  );
}
export function WhatsAppIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
export function MenuIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function CloseIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
export function BagIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
export function PlusIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
export function ArrowIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Mapeia o IconName dos dados para o componente correspondente. */
export function CategoryIcon({
  name,
  ...props
}: { name: IconName } & Props) {
  const map: Record<IconName, (p: Props) => JSX.Element> = {
    leaf: LeafIcon,
    badge: BadgeIcon,
    chat: ChatIcon,
    truck: TruckIcon,
    heart: HeartIcon,
    moon: MoonIcon,
    snowflake: SnowflakeIcon,
    sock: SockIcon,
    shirt: ShirtIcon,
    woman: WomanIcon,
    man: ManIcon,
    child: ChildIcon,
  };
  const Cmp = map[name] ?? ShirtIcon;
  return <Cmp {...props} />;
}
