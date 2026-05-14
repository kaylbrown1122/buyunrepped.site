interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({ children, className = '' }: SectionBadgeProps) {
  return (
    <span
      className={`inline-block text-sm font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
