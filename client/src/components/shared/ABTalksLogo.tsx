import { cn } from '@/lib/utils';

interface ABTalksLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ABTalksLogo({ className, size = 'md' }: ABTalksLogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <span
      className={cn(
        'font-display font-bold tracking-tight select-none',
        sizeClasses[size],
        className
      )}
    >
      <span className="text-text-primary">AB</span>
      <span className="text-dusty-rose">Talks</span>
    </span>
  );
}
