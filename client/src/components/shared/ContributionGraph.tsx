import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ContributionGraphProps {
  completedDays: number;
  totalDays: number;
  currentDay: number;
  className?: string;
  variant?: 'full' | 'compact' | 'hero';
}

export default function ContributionGraph({
  completedDays,
  totalDays,
  currentDay,
  className,
  variant = 'full',
}: ContributionGraphProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const displayDays = totalDays;

  const getDotStatus = (index: number) => {
    const day = index + 1;
    if (day < currentDay) return day <= completedDays ? 'completed' : 'missed';
    if (day === currentDay) return 'today';
    return 'upcoming';
  };

  const getDotColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-dusty-rose';
      case 'missed':
        return 'bg-error/40';
      case 'today':
        return 'bg-soft-coral shadow-[0_0_6px_rgba(228,164,153,0.4)]';
      default:
        return 'bg-bg-elevated';
    }
  };

  // Calculate grid columns based on variant
  const gridCols = variant === 'compact' ? 7 : variant === 'hero' ? 12 : 10;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {Array.from({ length: displayDays }, (_, i) => {
          const status = getDotStatus(i);
          return (
            <div
              key={i}
              className={cn(
                'aspect-square rounded-[2px] transition-all duration-300',
                getDotColor(status),
                variant === 'hero' ? 'min-w-[6px]' : 'min-w-[6px]',
                animated && status !== 'upcoming' && 'animate-dot-appear',
                status === 'today' && 'animate-pulse-glow'
              )}
              style={{
                animationDelay: animated && status !== 'upcoming' ? `${i * 15}ms` : '0ms',
                opacity: animated || status === 'upcoming' ? undefined : 0,
              }}
              title={`Day ${i + 1}: ${status}`}
              aria-label={`Day ${i + 1}: ${status}`}
            />
          );
        })}
      </div>
    </div>
  );
}
