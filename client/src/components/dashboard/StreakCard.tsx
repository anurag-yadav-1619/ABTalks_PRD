import { cn } from '@/lib/utils';
import StreakFlame from '@/components/shared/StreakFlame';

interface StreakCardProps {
  currentStreak: number;
  bestStreak: number;
  className?: string;
}

export default function StreakCard({ currentStreak, bestStreak, className }: StreakCardProps) {
  const isFirstDay = currentStreak === 0;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-6 sm:p-8',
        'bg-gradient-to-br from-bg-surface via-bg-surface to-deep-chocolate/20',
        'border border-border-primary',
        className
      )}
    >
      {/* Subtle background glow */}
      {!isFirstDay && (
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--color-soft-coral), transparent 70%)',
          }}
        />
      )}

      <div className="relative flex items-center gap-5">
        {/* Flame */}
        <StreakFlame streak={currentStreak} size="lg" />

        {/* Content */}
        <div>
          {isFirstDay ? (
            <>
              <p className="text-eyebrow text-soft-coral mb-1">
                YOUR FIRST STREAK STARTS TODAY
              </p>
              <p className="text-body-sm">
                Complete today's task to begin.
              </p>
            </>
          ) : (
            <>
              <p className="text-stat text-text-primary">{currentStreak}</p>
              <p className="text-eyebrow tracking-[0.15em] text-text-secondary">
                DAY STREAK
              </p>
            </>
          )}
        </div>
      </div>

      {/* Best streak */}
      {!isFirstDay && (
        <div className="mt-4 pt-4 border-t border-border-secondary flex items-center gap-2">
          <span className="text-body-sm text-text-muted">Best:</span>
          <span className="text-sm font-semibold text-text-primary">
            {bestStreak} days
          </span>
        </div>
      )}
    </div>
  );
}
