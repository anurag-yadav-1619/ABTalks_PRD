import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Gauge,
  AlertCircle,
  MessageSquare,
  Flame,
  Loader2,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/shared/BrandIcons';
import ABTalksLogo from '@/components/shared/ABTalksLogo';
import { Button } from '@/components/ui/Button';
import { isValidGithubUrl, isValidLinkedinUrl, cn } from '@/lib/utils';
import { fetchChallengeDay, submitChallengeDay } from '@/lib/api';

type FormState = 'idle' | 'submitting' | 'success';

export default function ChallengeDayPage() {
  const { dayId } = useParams<{ dayId: string }>();
  const dayNum = parseInt(dayId || '12', 10);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [note, setNote] = useState('');
  const [githubTouched, setGithubTouched] = useState(false);
  const [linkedinTouched, setLinkedinTouched] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function loadDay() {
      try {
        const response = await fetchChallengeDay(dayNum);
        setData(response);
        if (response.submission) {
          setIsAlreadySubmitted(true);
          setFormState('success');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load day data');
      } finally {
        setLoading(false);
      }
    }
    loadDay();
  }, [dayNum]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-dusty-rose" size={32} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-headline-md mb-2">{error || 'Day not found'}</p>
          <Button asChild variant="secondary">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (data.locked && !data.submission) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-headline-md mb-2">This day is locked.</p>
          <p className="text-body text-text-secondary mb-4">Complete previous days to unlock.</p>
          <Button asChild variant="secondary">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const dayData = data.task;
  const isLateSubmission = data.isLate;
  const githubValid = isValidGithubUrl(githubUrl);
  const linkedinValid = isValidLinkedinUrl(linkedinUrl);
  const canSubmit = githubValid && linkedinValid;

  const githubError = githubTouched && githubUrl.length > 0 && !githubValid;
  const linkedinError = linkedinTouched && linkedinUrl.length > 0 && !linkedinValid;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setFormState('submitting');
    setSubmitError('');

    try {
      await submitChallengeDay(dayData.id, githubUrl, linkedinUrl, note);
      setFormState('success');
    } catch (err: any) {
      setFormState('idle');
      setSubmitError(err.message);
    }
  };

  // ============ SUCCESS STATE ============
  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-b border-border-secondary">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              to="/dashboard"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <ABTalksLogo size="sm" />
            <div className="w-5" />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="text-center animate-success-pop max-w-sm">
            {/* Success icon */}
            <div className="w-16 h-16 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-success" />
            </div>

            {isLateSubmission ? (
              <>
                <p className="text-eyebrow text-warning mb-2">LATE SUBMISSION</p>
                <h1 className="text-headline-lg mb-2">
                  Late, but you showed up.
                </h1>
                <p className="text-body mb-6">That counts.</p>
              </>
            ) : (
              <>
                <p className="text-eyebrow text-success mb-2">DAY {dayNum} COMPLETE</p>
                <h1 className="text-headline-lg mb-3">
                  <span className="flex items-center justify-center gap-2">
                    Streak Maintained!
                    <Flame
                      size={28}
                      className="text-soft-coral animate-flame-pulse"
                      fill="currentColor"
                    />
                  </span>
                </h1>
              </>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full group"
              >
                <Link to="/dashboard">
                  BACK TO DASHBOARD
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============ FORM STATE ============
  return (
    <div className="min-h-screen bg-bg-primary pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-b border-border-secondary">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <ABTalksLogo size="sm" />
          <div className="w-5" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-6">
        {/* Day Context */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-eyebrow text-dusty-rose">
              DAY {dayNum} / {data.totalDays}
            </p>
            {isLateSubmission && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20 font-medium">
                LATE
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5">
            <Clock size={12} />
            Submit before midnight to keep your streak
          </p>

          {/* Day progress bar */}
          <div className="mt-3 h-1 bg-bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-dusty-rose rounded-full"
              style={{ width: `${(dayNum / data.totalDays) * 100}%` }}
            />
          </div>
        </div>

        {/* Task Brief */}
        <section className="space-y-4">
          <h1 className="text-headline-lg text-text-primary uppercase tracking-tight">
            {dayData.title}
          </h1>

          <p className="text-body whitespace-pre-wrap">{dayData.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-text-muted px-2.5 py-1.5 rounded-md bg-bg-surface border border-border-primary">
              <Gauge size={13} className="text-slate-blue" />
              {dayData.difficulty}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted px-2.5 py-1.5 rounded-md bg-bg-surface border border-border-primary">
              <Clock size={13} className="text-slate-blue" />
              {dayData.estimatedMinutes} mins
            </div>
          </div>

          {/* Acceptance Criteria */}
          {dayData.acceptanceCriteria && dayData.acceptanceCriteria.length > 0 && (
            <div className="space-y-2">
              <p className="text-eyebrow">ACCEPTANCE CRITERIA</p>
              <ul className="space-y-2">
                {dayData.acceptanceCriteria.map((criteria: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check
                      size={14}
                      className="text-dusty-rose mt-0.5 flex-shrink-0"
                    />
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="border-t border-border-secondary" />

        {/* Submission Form */}
        <section className="space-y-5">
          <h2 className="text-eyebrow text-dusty-rose tracking-[0.15em]">
            PROVE YOUR WORK
          </h2>

          {submitError && (
            <div className="p-3 rounded bg-error/10 border border-error/20 text-error text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>{submitError}</p>
            </div>
          )}

          {/* GitHub URL */}
          <div className="space-y-2">
            <label
              htmlFor="github-url"
              className="flex items-center gap-2 text-sm font-medium text-text-primary"
            >
              <GitHubIcon size={15} className="text-text-muted" />
              GitHub Repository / Commit URL
              <span className="text-dusty-rose">*</span>
            </label>
            <input
              id="github-url"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              onBlur={() => setGithubTouched(true)}
              placeholder="https://github.com/..."
              className={cn(
                'w-full h-12 px-4 rounded-lg bg-bg-surface border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors duration-200 outline-none',
                githubError
                  ? 'border-error focus:border-error'
                  : githubValid
                    ? 'border-success/40 focus:border-success'
                    : 'border-border-primary focus:border-dusty-rose/50'
              )}
              autoComplete="url"
            />
            {githubError && (
              <p className="flex items-center gap-1.5 text-xs text-error" role="alert">
                <AlertCircle size={12} />
                Enter a valid GitHub URL (e.g., https://github.com/user/repo)
              </p>
            )}
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <label
              htmlFor="linkedin-url"
              className="flex items-center gap-2 text-sm font-medium text-text-primary"
            >
              <LinkedInIcon size={15} className="text-text-muted" />
              LinkedIn Post URL
              <span className="text-dusty-rose">*</span>
            </label>
            <input
              id="linkedin-url"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              onBlur={() => setLinkedinTouched(true)}
              placeholder="https://linkedin.com/posts/..."
              className={cn(
                'w-full h-12 px-4 rounded-lg bg-bg-surface border text-sm text-text-primary placeholder:text-text-muted/50 transition-colors duration-200 outline-none',
                linkedinError
                  ? 'border-error focus:border-error'
                  : linkedinValid
                    ? 'border-success/40 focus:border-success'
                    : 'border-border-primary focus:border-dusty-rose/50'
              )}
              autoComplete="url"
            />
            {linkedinError && (
              <p className="flex items-center gap-1.5 text-xs text-error" role="alert">
                <AlertCircle size={12} />
                Enter a valid LinkedIn post URL (e.g., https://linkedin.com/posts/...)
              </p>
            )}
          </div>

          {/* Optional Note */}
          <div className="space-y-2">
            <label
              htmlFor="note"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary"
            >
              <MessageSquare size={15} className="text-text-muted" />
              What was challenging today?
              <span className="text-xs text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Today I struggled with..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border-primary text-sm text-text-primary placeholder:text-text-muted/50 transition-colors duration-200 outline-none focus:border-dusty-rose/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full"
            disabled={!canSubmit || formState === 'submitting'}
            onClick={handleSubmit}
          >
            {formState === 'submitting' ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              <>
                SUBMIT DAY {dayNum}
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </section>
      </main>
    </div>
  );
}
