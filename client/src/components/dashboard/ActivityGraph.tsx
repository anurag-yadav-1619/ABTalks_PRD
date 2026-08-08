import { cn } from '@/lib/utils';
import type { DayStatus } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ActivityGraphProps {
  days: { day: number; status: DayStatus }[];
  currentDay: number;
  className?: string;
}

export default function ActivityGraph({ days, currentDay, className }: ActivityGraphProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Show last 14 days in a 7x2 grid
  const startDay = Math.max(1, currentDay - 13);
  const displayDays = days.filter(
    (d) => d.day >= startDay && d.day <= currentDay + 1
  );

  // Pad to 14 items
  while (displayDays.length < 14) {
    const nextDay = displayDays.length > 0
      ? displayDays[displayDays.length - 1].day + 1
      : startDay;
    displayDays.push({ day: nextDay, status: 'upcoming' });
  }

  const getStatusStyle = (status: DayStatus, day: number) => {
    if (day === currentDay) {
      return 'bg-soft-coral shadow-[0_0_6px_rgba(228,164,153,0.3)]';
    }
    switch (status) {
      case 'completed':
        return 'bg-dusty-rose';
      case 'missed':
        return 'bg-error/40';
      case 'upcoming':
      case 'locked':
        return 'bg-bg-elevated';
      default:
        return 'bg-bg-elevated';
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-eyebrow">RECENT ACTIVITY</p>

      <div className="grid grid-cols-7 gap-1.5">
        {displayDays.slice(0, 14).map((d, i) => (
          <div
            key={d.day}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                'w-full aspect-square rounded-[4px] transition-all duration-300 max-w-[40px]',
                getStatusStyle(d.status, d.day),
                animated && 'animate-dot-appear'
              )}
              style={{
                animationDelay: `${i * 40}ms`,
                opacity: animated ? undefined : 0,
              }}
              title={`Day ${d.day}: ${d.status}`}
              aria-label={`Day ${d.day}: ${d.status}`}
            />
            <span className="text-[9px] text-text-muted">{d.day}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[3px] bg-dusty-rose" />
          Done
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[3px] bg-soft-coral shadow-[0_0_4px_rgba(228,164,153,0.3)]" />
          Today
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[3px] bg-bg-elevated" />
          Upcoming
        </div>
      </div>
    </div>
  );
}
