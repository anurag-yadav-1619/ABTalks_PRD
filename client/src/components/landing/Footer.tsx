import ABTalksLogo from '@/components/shared/ABTalksLogo';
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/shared/BrandIcons';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-border-secondary">
      {/* Warm gradient accent at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-dusty-rose), var(--color-soft-coral), var(--color-slate-blue), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <ABTalksLogo size="lg" />
            <p className="text-body-sm mt-2 max-w-xs">
              60-day coding challenge for Indian college students.
              Build in public. Build your career.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {['About', 'Contact', 'Terms', 'Privacy'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: GitHubIcon, label: 'GitHub' },
              { icon: LinkedInIcon, label: 'LinkedIn' },
              { icon: XIcon, label: 'Twitter' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-9 h-9 rounded-lg bg-bg-surface border border-border-primary flex items-center justify-center text-text-muted hover:text-text-primary hover:border-dusty-rose/30 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border-secondary flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-text-muted">
            © 2026 ABTalks. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            Made with <Heart size={12} className="text-dusty-rose" /> for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
}
