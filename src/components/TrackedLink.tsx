"use client";

// Umami click tracking needs an event handler; only client components can pass one.
export default function TrackedLink({
  href,
  event,
  source,
  className,
  children,
}: {
  href: string;
  event: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => { const w = window as any; w.umami?.track?.(event, { source }); }}
    >
      {children}
    </a>
  );
}
