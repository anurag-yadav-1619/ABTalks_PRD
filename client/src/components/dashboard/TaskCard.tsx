import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { DayData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  day: DayData;
  dayNumber: number;
  isSubmitted?: boolean;
  className?: string;
}

export default function TaskCard({ day, dayNumber, isSubmitted, className }: TaskCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border',
        isSubmitted
          ? 'border-success/30 bg-success/5'
          : 'border-dusty-rose/30 bg-dusty-rose/5',
        className
      )}
    >
      {/* Accent line */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[2px]',
          isSubmitted ? 'bg-success' : 'bg-dusty-rose'
        )}
      />

      <div className="p-5 sm:p-6">
        {/* Eyebrow */}
        <p className="text-eyebrow text-dusty-rose mb-3">
          {isSubmitted ? '✓ COMPLETED' : `TODAY · DAY ${dayNumber}`}
        </p>

        {/* Title */}
        <h3 className="text-headline-md text-lg font-display font-semibold text-text-primary mb-2">
          {day.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
          {day.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Gauge size={14} className="text-slate-blue" />
            {day.difficulty}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={14} className="text-slate-blue" />
            {day.estimatedTime}
          </div>
        </div>

        {/* CTA */}
        {isSubmitted ? (
          <div className="flex items-center gap-2 text-sm text-success font-medium">
            <span>Day {dayNumber} complete</span>
          </div>
        ) : (
          <Button asChild className="w-full group">
            <Link to={`/day/${dayNumber}`}>
              START DAY {dayNumber}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
