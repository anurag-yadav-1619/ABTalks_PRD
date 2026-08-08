import { db } from '../db';
import { getDayDifferenceInTimezone, getNowInChallengeTimezone } from '../utils/timezone';

export class StreakService {
  /**
   * Recalculates and updates the student's streak based on a new submission.
   */
  static async processSubmission(studentId: string, challengeId: string, dayNumber: number, isLate: boolean) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        studentId_challengeId: {
          studentId,
          challengeId,
        }
      }
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    const now = getNowInChallengeTimezone();
    const startDate = enrollment.startDate;
    
    // Calculate what day they *should* be on based on calendar days since start
    const expectedDayNumber = getDayDifferenceInTimezone(now, startDate) + 1;

    let newCurrentStreak = enrollment.currentStreak;
    let newBestStreak = enrollment.bestStreak;
    let newCurrentDay = enrollment.currentDay;

    // If the submission is exactly for the day they were supposed to submit
    // AND they haven't submitted this day before (handled by unique constraint in DB)
    if (!isLate && dayNumber === enrollment.currentDay) {
      newCurrentStreak += 1;
      if (newCurrentStreak > newBestStreak) {
        newBestStreak = newCurrentStreak;
      }
      newCurrentDay = dayNumber + 1;
    } else if (isLate) {
      // If it's a late submission, it counts towards completion but does NOT increment the current streak, 
      // unless we want to implement streak freezes here.
      // For now, late submissions don't increment streaks.
    }

    // Update enrollment
    await db.enrollment.update({
      where: { id: enrollment.id },
      data: {
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        currentDay: Math.max(newCurrentDay, expectedDayNumber),
      }
    });

    return {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      currentDay: newCurrentDay,
    };
  }

  /**
   * Evaluates if a student missed a day and breaks their streak if necessary.
   * This would typically be run by a cron job every night at midnight.
   */
  static async evaluateMissedDays(studentId: string, challengeId: string) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        studentId_challengeId: {
          studentId,
          challengeId,
        }
      }
    });

    if (!enrollment) return;

    const now = getNowInChallengeTimezone();
    const expectedDayNumber = getDayDifferenceInTimezone(now, enrollment.startDate) + 1;

    if (expectedDayNumber > enrollment.currentDay) {
      // The student has missed at least one day. Break the streak.
      await db.enrollment.update({
        where: { id: enrollment.id },
        data: {
          currentStreak: 0,
          currentDay: expectedDayNumber,
        }
      });
    }
  }
}
