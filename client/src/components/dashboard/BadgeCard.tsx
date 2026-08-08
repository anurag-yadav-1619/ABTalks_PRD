import { cn } from '@/lib/utils';
import { Shield, Lock } from 'lucide-react';

interface BadgeCardProps {
  name: string;
  earned: boolean;
  className?: string;
}

export default function BadgeCard({ name, earned, className }: BadgeCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200',
        earned
          ? 'border-dusty-rose/30 bg-dusty-rose/5'
          : 'border-border-primary bg-bg-surface opacity-50',
        className
      )}
    >
      <div
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
          earned
            ? 'bg-dusty-rose/15 text-dusty-rose'
            : 'bg-bg-elevated text-text-muted'
        )}
      >
        {earned ? <Shield size={18} /> : <Lock size={14} />}
      </div>
      <div>
        <p
          className={cn(
            'text-sm font-semibold',
            earned ? 'text-text-primary' : 'text-text-muted'
          )}
        >
          {name}
        </p>
        {!earned && (
          <p className="text-xs text-text-muted">Locked</p>
        )}
      </div>
    </div>
  );
}
