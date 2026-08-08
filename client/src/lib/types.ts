export interface Student {
  id: string;
  name: string;
  avatarUrl: string | null;
  track: string;
  cohort: string;
  currentStreak: number;
  bestStreak: number;
  startDate: string;
  badges: string[];
  streakFreezes: number;
}

export interface Challenge {
  totalDays: number;
  currentDay: number;
  daysCompleted: number;
  daysMissed: number;
  completionRate: number;
}

export type DayStatus = 'completed' | 'missed' | 'pending' | 'upcoming' | 'locked';

export interface DayData {
  day: number;
  status: DayStatus;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  submittedAt?: string;
}

export interface Submission {
  githubUrl: string | null;
  linkedinUrl: string | null;
  note: string | null;
  submitted: boolean;
  submittedAt?: string;
  isLate?: boolean;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  days: number;
  students: number;
}

export interface Testimonial {
  name: string;
  track: string;
  cohort: string;
  quote: string;
  streak: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
