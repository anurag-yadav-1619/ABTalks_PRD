import { Repeat, FolderOpen, Eye } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const outcomes = [
  {
    icon: Repeat,
    title: 'Consistency',
    description: 'Build the habit of shipping. Not one marathon — 60 intentional days of showing up and building.',
  },
  {
    icon: FolderOpen,
    title: 'Portfolio',
    description: 'Create visible proof of work. 60 projects, 60 commits, 60 posts — real evidence that you build.',
  },
  {
    icon: Eye,
    title: 'Visibility',
    description: 'Build a public technical presence. Recruiters see consistency, peers see dedication.',
  },
];

export default function WhySection() {
  return (
    <section id="about" className="px-4 sm:px-6 py-16 sm:py-24 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="WHY ABTALKS"
          title="Three things that matter"
        />

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 mt-10 sm:mt-16">
          {outcomes.map((outcome) => (
            <div key={outcome.title} className="text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-dusty-rose/10 border border-dusty-rose/20 flex items-center justify-center mx-auto sm:mx-0 mb-4">
                <outcome.icon size={22} className="text-dusty-rose" />
              </div>
              <h3 className="text-headline-md text-xl font-display font-semibold text-text-primary mb-3">
                {outcome.title}
              </h3>
              <p className="text-body">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
