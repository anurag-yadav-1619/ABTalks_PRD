import { stats, testimonials } from '@/lib/data';
import { Users, Zap, Trophy, Quote } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

export default function SocialProof() {
  return (
    <section id="community" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="COMMUNITY"
          title="Built by students. Proven in public."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 sm:mt-14">
          {[
            { icon: Users, label: 'Students', value: stats.totalStudents.toLocaleString() },
            { icon: Zap, label: 'Cohorts', value: stats.cohortsCompleted.toString() },
            { icon: Trophy, label: 'Avg Streak', value: `${stats.averageStreak} days` },
            { icon: Users, label: 'Completion', value: `${stats.completionRate}%` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="surface-card p-4 sm:p-5 text-center"
            >
              <stat.icon
                size={20}
                className="text-dusty-rose mx-auto mb-2"
              />
              <p className="text-stat text-2xl sm:text-3xl text-text-primary">
                {stat.value}
              </p>
              <p className="text-eyebrow mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8 sm:mt-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="surface-card p-5 sm:p-6 flex flex-col"
            >
              <Quote size={18} className="text-dusty-rose/40 mb-3" />
              <blockquote className="text-body flex-1 text-text-primary/90 italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-4 pt-4 border-t border-border-secondary">
                <p className="text-sm font-medium text-text-primary">
                  {t.name}
                </p>
                <p className="text-body-sm">
                  {t.track} · {t.streak}-day streak
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
