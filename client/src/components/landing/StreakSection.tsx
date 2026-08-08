import StreakFlame from '@/components/shared/StreakFlame';
import ContributionGraph from '@/components/shared/ContributionGraph';

export default function StreakSection() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Flame */}
        <div className="flex justify-center mb-4">
          <StreakFlame streak={11} size="lg" />
        </div>

        {/* Big Number */}
        <p className="text-stat text-dusty-rose mb-1">11</p>
        <p className="text-eyebrow tracking-[0.2em] mb-3 text-text-secondary">
          DAYS OF SHOWING UP
        </p>

        {/* Description */}
        <p className="text-body max-w-md mx-auto mb-8 sm:mb-10">
          Every day you show up is a brick in your career.
          Streaks aren't just numbers — they're proof you can commit.
        </p>

        {/* Contribution Graph */}
        <div className="max-w-md mx-auto">
          <ContributionGraph
            completedDays={11}
            totalDays={60}
            currentDay={12}
            variant="full"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-4 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-dusty-rose" />
            Completed
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-soft-coral shadow-[0_0_4px_rgba(228,164,153,0.3)]" />
            Today
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-bg-elevated" />
            Upcoming
          </div>
        </div>
      </div>
    </section>
  );
}
