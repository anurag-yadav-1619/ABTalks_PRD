import { Search, Code2, Share2, TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Pick a track',
    description: 'Web Dev, DSA, ML/AI, or Android. Choose what excites you.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Build & ship daily',
    description: 'One focused project every day. Real code, real output.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'Prove it',
    description: 'GitHub commit + LinkedIn post. Your daily proof of work.',
    icon: Share2,
  },
  {
    number: '04',
    title: 'Build visible momentum',
    description: 'Streaks grow. Portfolio fills. Recruiters notice.',
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 py-16 sm:py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="Four steps. Sixty days. A different developer."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 sm:mt-14">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              <div className="p-5 sm:p-6">
                {/* Step Number */}
                <span className="text-5xl font-display font-bold text-border-primary/60 select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mt-4 mb-3 w-10 h-10 rounded-lg bg-bg-surface border border-border-primary flex items-center justify-center group-hover:border-dusty-rose/30 transition-colors duration-300">
                  <step.icon size={18} className="text-dusty-rose" />
                </div>

                {/* Content */}
                <h3 className="text-headline-md text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-body-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub + LinkedIn formula */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <div className="surface-card px-4 py-2.5 text-sm font-medium text-text-primary flex items-center gap-2">
            <Code2 size={16} className="text-slate-blue" />
            GitHub
          </div>
          <span className="text-2xl text-text-muted font-light">+</span>
          <div className="surface-card px-4 py-2.5 text-sm font-medium text-text-primary flex items-center gap-2">
            <Share2 size={16} className="text-slate-blue" />
            LinkedIn
          </div>
          <span className="text-2xl text-text-muted font-light">=</span>
          <div className="px-4 py-2.5 text-sm font-semibold text-dusty-rose bg-dusty-rose/10 border border-dusty-rose/20 rounded-lg">
            Daily Proof
          </div>
        </div>
      </div>
    </section>
  );
}
