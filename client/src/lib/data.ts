import type { Testimonial, FAQ } from './types';

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    track: 'Web Development',
    cohort: 'Jun 2026',
    quote: 'I went from copy-pasting code to building full projects from scratch. Day 40 hit different.',
    streak: 52,
  },
  {
    name: 'Rohit Gupta',
    track: 'DSA',
    cohort: 'Apr 2026',
    quote: 'The streak kept me accountable. Got 3 interview calls within a month of completing.',
    streak: 60,
  },
  {
    name: 'Ananya Reddy',
    track: 'ML & AI',
    cohort: 'May 2026',
    quote: 'Building daily made me actually understand ML instead of just watching tutorials forever.',
    streak: 47,
  },
];

export const faqs: FAQ[] = [
  {
    question: 'What if I miss a day?',
    answer: 'Your streak resets, but your momentum doesn\'t. You keep all your completed days and can start building your streak again immediately. After 10 consecutive days, you earn a Streak Freeze to protect against one missed day.',
  },
  {
    question: 'Is the challenge free?',
    answer: 'Yes, completely free. ABTalks is built by students, for students. No hidden costs, no premium tiers.',
  },
  {
    question: 'Do I need to be advanced?',
    answer: 'Not at all. Each track starts with beginner-friendly tasks and gradually increases in complexity. Day 1 is designed for anyone who can write basic code.',
  },
  {
    question: 'What do I submit each day?',
    answer: 'Two things: a GitHub link to your code (repo or commit URL) and a LinkedIn post sharing what you built. That\'s your public proof of work.',
  },
  {
    question: 'How much time does it take daily?',
    answer: 'Tasks range from 45 minutes to 2 hours. Most days are around 90 minutes. The key is consistency, not marathon sessions.',
  },
];

export const stats = {
  totalStudents: 3381,
  cohortsCompleted: 7,
  averageStreak: 34,
  completionRate: 68,
};
