import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import ABTalksLogo from '@/components/shared/ABTalksLogo';
import { Button } from '@/components/ui/Button';
import { register } from '@/lib/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setLoading(true);
    setError('');
    
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <header className="px-6 py-4">
        <Link to="/">
          <ABTalksLogo size="sm" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-headline-lg mb-2">Join the Challenge</h1>
            <p className="text-text-secondary">Start your 60-day coding journey today.</p>
          </div>

          <form onSubmit={handleSubmit} className="surface-card p-6 space-y-5">
            {error && (
              <div className="p-3 rounded bg-error/10 border border-error/20 text-error text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-bg-elevated border border-border-primary text-sm focus:border-dusty-rose outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-bg-elevated border border-border-primary text-sm focus:border-dusty-rose outline-none transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-bg-elevated border border-border-primary text-sm focus:border-dusty-rose outline-none transition-colors"
                placeholder="Min 6 characters"
                minLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || !name || !email || !password}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  JOIN NOW
                  <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-slate-blue hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
