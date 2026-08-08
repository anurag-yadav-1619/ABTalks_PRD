import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ABTalksLogo from '@/components/shared/ABTalksLogo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { getAuthToken } from '@/lib/auth';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="relative z-50">
            <ABTalksLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button asChild size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  Sign In
                </Link>
                <Button asChild size="sm">
                  <Link to="/register">Join Challenge</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-2xl transition-all duration-300 md:hidden',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-display font-medium text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {isLoggedIn ? (
            <Button asChild size="lg" className="mt-4">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-4 w-full px-8">
              <Button asChild size="lg" variant="secondary" className="w-full">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full">
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  Join Challenge
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
