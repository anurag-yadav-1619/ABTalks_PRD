import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface StreakFlameProps {
  streak: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakFlame({ streak, className, size = 'md' }: StreakFlameProps) {
  const sizeConfig = {
    sm: { icon: 20, wrapper: 'w-10 h-10' },
    md: { icon: 32, wrapper: 'w-14 h-14' },
    lg: { icon: 48, wrapper: 'w-20 h-20' },
  };

  const config = sizeConfig[size];
  const isActive = streak > 0;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        config.wrapper,
        isActive && 'animate-flame-pulse',
        className
      )}
    >
      {/* Glow effect */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-lg"
          style={{
            background: `radial-gradient(circle, var(--color-soft-coral), transparent 70%)`,
          }}
        />
      )}
      <Flame
        size={config.icon}
        className={cn(
          'relative z-10 transition-colors duration-300',
          isActive ? 'text-soft-coral drop-shadow-[0_0_8px_rgba(228,164,153,0.4)]' : 'text-text-muted'
        )}
        fill={isActive ? 'currentColor' : 'none'}
        strokeWidth={isActive ? 1.5 : 2}
      />
    </div>
  );
}
