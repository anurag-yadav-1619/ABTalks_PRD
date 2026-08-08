import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: boolean;
  className?: string;
}

export default function StatCard({ label, value, accent, className }: StatCardProps) {
  return (
    <div className={cn('surface-card p-4 text-center', className)}>
      <p
        className={cn(
          'text-2xl sm:text-3xl font-display font-bold',
          accent ? 'text-dusty-rose' : 'text-text-primary'
        )}
      >
        {value}
      </p>
      <p className="text-eyebrow mt-1">{label}</p>
    </div>
  );
}
