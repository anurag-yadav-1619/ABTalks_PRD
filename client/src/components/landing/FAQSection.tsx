import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/data';
import SectionHeading from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-bg-secondary">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions you might have"
        />

        <div className="mt-10 sm:mt-14 space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border-primary rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-bg-surface/50 transition-colors duration-200"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="text-sm sm:text-base font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-text-muted flex-shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                id={`faq-${index}`}
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-60' : 'max-h-0'
                )}
              >
                <p className="px-5 pb-4 text-body-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
