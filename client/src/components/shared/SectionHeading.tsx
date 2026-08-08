import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-eyebrow text-dusty-rose">{eyebrow}</p>
      )}
      <h2 className="text-headline-lg text-text-primary">{title}</h2>
      {description && (
        <p className="text-body max-w-xl mx-auto">{description}</p>
      )}
    </div>
  );
}
