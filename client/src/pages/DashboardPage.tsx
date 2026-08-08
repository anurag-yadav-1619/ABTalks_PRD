import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Snowflake, Code2, Loader2 } from 'lucide-react';
import ABTalksLogo from '@/components/shared/ABTalksLogo';
import ProgressRing from '@/components/shared/ProgressRing';
import StreakCard from '@/components/dashboard/StreakCard';
import TaskCard from '@/components/dashboard/TaskCard';
import StatCard from '@/components/dashboard/StatCard';
import BadgeCard from '@/components/dashboard/BadgeCard';
import CohortPulse from '@/components/dashboard/CohortPulse';
import ActivityGraph from '@/components/dashboard/ActivityGraph';
import { getGreeting, getDaysRemaining } from '@/lib/utils';
import { fetchDashboardData } from '@/lib/api';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-dusty-rose" size={32} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-center p-4">
        <p className="text-dusty-rose font-semibold mb-2">Something went wrong</p>
        <p className="text-text-secondary text-sm">{error}</p>
        <Link to="/" className="mt-4 text-slate-blue hover:underline">Return Home</Link>
      </div>
    );
  }

  const { student, streak, today, progress, badges, activity, cohortPulse } = data;
  
  // Fill in empty days for the activity graph up to the current day if missing
  const activityDays = Array.from({ length: progress.currentDay }, (_, i) => {
    const dayNum = i + 1;
    const found = activity.find((a: any) => a.day === dayNum);
    return {
      day: dayNum,
      status: found ? found.status : (dayNum < progress.currentDay ? 'locked' : 'upcoming'),
    };
  });

  const allBadges = [
    { name: '7-Day Warrior', earned: streak.current >= 7 },
    { name: '14-Day Legend', earned: streak.current >= 14 },
    { name: 'Halfway Hero', earned: progress.completed >= 30 },
    { name: 'Streak Master', earned: streak.current >= 30 },
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-b border-border-secondary">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-text-muted hover:text-text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <ABTalksLogo size="sm" />
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-primary flex items-center justify-center text-xs font-semibold text-dusty-rose">
            {student.name.charAt(0)}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-headline-md text-xl font-display">
            {getGreeting()}, {student.name.split(' ')[0]}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Code2 size={14} className="text-dusty-rose" />
            <span className="text-body-sm">{student.track}</span>
            <span className="text-text-muted">·</span>
            <span className="text-body-sm">{student.cohort}</span>
          </div>
        </div>

        {/* Streak Hero */}
        <StreakCard
          currentStreak={streak.current}
          bestStreak={streak.best}
        />

        {/* Today's Task */}
        {today && (
          <TaskCard
            day={today}
            dayNumber={progress.currentDay}
            isSubmitted={activity.some((a: any) => a.day === progress.currentDay && a.status === 'completed')}
          />
        )}

        {/* Progress */}
        <div className="surface-card p-5 flex items-center gap-5">
          <ProgressRing progress={progress.completionRate} size={80} strokeWidth={5}>
            <div className="text-center">
              <p className="text-lg font-display font-bold text-text-primary leading-none">
                {Math.round(progress.completionRate)}%
              </p>
            </div>
          </ProgressRing>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Day {progress.currentDay} of {progress.totalDays}
            </p>
            <p className="text-body-sm mt-0.5">
              {progress.completed} completed · {getDaysRemaining(progress.currentDay, progress.totalDays)} remaining
            </p>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-bg-elevated rounded-full overflow-hidden w-40">
              <div
                className="h-full bg-dusty-rose rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress.completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activity Graph */}
        <div className="surface-card p-5">
          <ActivityGraph days={activityDays} currentDay={progress.currentDay} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="COMPLETED" value={progress.completed} />
          <StatCard label="MISSED" value={progress.missed} />
          <StatCard
            label="CONSISTENCY"
            value={`${progress.completionRate}%`}
            accent
          />
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <p className="text-eyebrow">BADGES</p>
          <div className="grid grid-cols-2 gap-3">
            {allBadges.map((badge) => (
              <BadgeCard
                key={badge.name}
                name={badge.name}
                earned={badge.earned}
              />
            ))}
          </div>
        </div>

        {/* Cohort Pulse */}
        <CohortPulse percentage={cohortPulse?.percentage || 0} />
      </main>
    </div>
  );
}
