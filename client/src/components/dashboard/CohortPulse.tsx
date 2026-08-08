import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CohortPulseProps {
  percentage: number;
  className?: string;
}

export default function CohortPulse({ percentage, className }: CohortPulseProps) {
  return (
    <div
      className={cn(
        'surface-card p-4 sm:p-5 flex items-center gap-4',
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-slate-blue/10 border border-slate-blue/20 flex items-center justify-center flex-shrink-0">
        <Users size={18} className="text-slate-blue" />
      </div>
      <div>
        <p className="text-sm text-text-primary">
          <span className="font-semibold text-slate-blue">{percentage}%</span> of your
          cohort submitted today.
        </p>
        <p className="text-xs text-text-muted mt-0.5">
          You're not alone in this.
        </p>
      </div>
    </div>
  );
}
