// MCP Clinic mark: a rounded cross (clinic) with a detached center dot
// (the packet arriving at the hub). Monochrome via currentColor.

export default function Logo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 6.5v6.9M16 18.6v6.9M6.5 16h6.9M18.6 16h6.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
