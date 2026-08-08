import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ContributionGraph from '@/components/shared/ContributionGraph';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 pt-16 pb-8 sm:pt-20 sm:pb-12 overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(188, 123, 111, 0.08), transparent)',
        }}
      />

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <p className="text-eyebrow text-dusty-rose mb-3 sm:mb-6 tracking-[0.15em]">
          60-DAY CODING CHALLENGE
        </p>

        {/* Headline */}
        <h1 className="text-headline-xl leading-[1.05] mb-4 sm:mb-6">
          <span className="block">BUILD IN PUBLIC.</span>
          <span className="block">EVERY DAY.</span>
          <span className="block text-dusty-rose">FOR 60 DAYS.</span>
        </h1>

        {/* Sub-copy */}
        <p className="text-body max-w-md mb-2 sm:mb-4">
          GitHub commit + LinkedIn post = daily proof.
          <br className="hidden sm:block" />
          Build consistency. Build visibility. Build your career.
        </p>

        {/* Micro-credibility */}
        <p className="text-body-sm mb-6 sm:mb-10 flex items-center gap-2 flex-wrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-dusty-rose" />
          60 days
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-soft-coral" />
          1 project track
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-blue" />
          daily proof
        </p>

        {/* CTA */}
        <Button asChild size="lg" className="group">
          <Link to="/dashboard">
            START YOUR STREAK
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Button>

        {/* Contribution Graph Visual */}
        <div className="mt-8 sm:mt-16">
          <ContributionGraph
            completedDays={11}
            totalDays={60}
            currentDay={12}
            variant="hero"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-body-sm text-text-muted">
              Your 60-day contribution journey
            </p>
            {/* Legend inline */}
            <div className="flex items-center gap-3 text-[10px] text-text-muted">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-[2px] bg-dusty-rose" />
                Done
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-[2px] bg-soft-coral shadow-[0_0_4px_rgba(228,164,153,0.3)]" />
                Today
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-[2px] bg-bg-elevated" />
                Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
