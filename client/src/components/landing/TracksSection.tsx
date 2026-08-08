import { useState, useEffect } from 'react';
import { Globe, Binary, Brain, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/shared/SectionHeading';
import { fetchTracks } from '@/lib/api';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Binary,
  Brain,
  Smartphone,
};

export default function TracksSection() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetchTracks().then(setTracks).catch(() => {});
  }, []);

  return (
    <section id="tracks" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="TRACKS"
          title="Choose your path"
          description="Each track is designed as a 60-day journey from fundamentals to portfolio-worthy projects."
        />

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-10 sm:mt-14">
          {tracks.map((track) => {
            const Icon = iconMap[track.icon] || Globe;
            return (
              <Link
                key={track.id}
                to="/dashboard"
                className="group surface-card p-5 sm:p-6 hover:border-dusty-rose/30 transition-all duration-300 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-bg-elevated border border-border-primary flex items-center justify-center group-hover:border-dusty-rose/30 transition-colors">
                    <Icon size={20} className="text-dusty-rose" />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-text-muted group-hover:text-dusty-rose group-hover:translate-x-0.5 transition-all duration-200 mt-1"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                  {track.name}
                </h3>
                <p className="text-body-sm flex-1 mb-4">
                  {track.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 pt-3 border-t border-border-secondary">
                  <span className="text-eyebrow">{track.days} DAYS</span>
                  <span className="text-eyebrow text-dusty-rose">
                    {track.students.toLocaleString()} STUDENTS
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
