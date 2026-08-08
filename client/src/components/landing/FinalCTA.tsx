import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(188, 123, 111, 0.1), transparent)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-eyebrow text-dusty-rose mb-6 tracking-[0.2em]">
          YOUR TURN
        </p>

        <h2 className="text-headline-xl mb-6">
          <span className="block">60 DAYS.</span>
          <span className="block">ONE COMMITMENT.</span>
          <span className="block text-dusty-rose">A BETTER DEVELOPER.</span>
        </h2>

        <p className="text-body text-lg max-w-md mx-auto mb-10">
          The best time to start was yesterday. The next best time is tonight.
        </p>

        <Button asChild size="lg" className="group">
          <Link to="/dashboard">
            START MY 60-DAY STREAK
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Button>

        <p className="text-body-sm mt-4 text-text-muted">
          Free · No sign-up required · Start building tonight
        </p>
      </div>
    </section>
  );
}
