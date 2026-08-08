import { db } from '../db';
import { isValidGithubUrl, isValidLinkedinUrl } from '../utils/validation';
import { getDayDifferenceInTimezone, getNowInChallengeTimezone } from '../utils/timezone';
import { StreakService } from './StreakService';

export class SubmissionService {
  static async submit(studentId: string, challengeDayId: string, githubUrl: string, linkedinUrl: string, note?: string) {
    if (!isValidGithubUrl(githubUrl)) throw Object.assign(new Error('Invalid GitHub URL'), { statusCode: 400 });
    if (!isValidLinkedinUrl(linkedinUrl)) throw Object.assign(new Error('Invalid LinkedIn URL'), { statusCode: 400 });

    const challengeDay = await db.challengeDay.findUnique({
      where: { id: challengeDayId },
      include: { challenge: true }
    });

    if (!challengeDay) throw Object.assign(new Error('Challenge day not found'), { statusCode: 404 });

    const enrollment = await db.enrollment.findUnique({
      where: {
        studentId_challengeId: {
          studentId,
          challengeId: challengeDay.challengeId,
        }
      }
    });

    if (!enrollment) throw Object.assign(new Error('Student not enrolled in this challenge'), { statusCode: 403 });

    const existingSubmission = await db.submission.findUnique({
      where: {
        studentId_challengeDayId: {
          studentId,
          challengeDayId,
        }
      }
    });

    if (existingSubmission) {
      throw Object.assign(new Error('Submission already exists for this day'), { statusCode: 409 });
    }

    const now = getNowInChallengeTimezone();
    const expectedDayNumber = getDayDifferenceInTimezone(now, enrollment.startDate) + 1;
    
    const isLate = challengeDay.dayNumber < expectedDayNumber;
    const status = isLate ? 'late' : 'submitted';

    const submission = await db.$transaction(async (tx) => {
      const sub = await tx.submission.create({
        data: {
          studentId,
          challengeDayId,
          githubUrl,
          linkedinUrl,
          note,
          status,
          isLate,
        }
      });

      await tx.activity.upsert({
        where: {
          studentId_challengeDayId: {
            studentId,
            challengeDayId,
          }
        },
        create: {
          studentId,
          challengeDayId,
          status: isLate ? 'late' : 'completed',
        },
        update: {
          status: isLate ? 'late' : 'completed',
        }
      });

      return sub;
    });

    // Update streak asynchronously or await it depending on needs
    await StreakService.processSubmission(studentId, challengeDay.challengeId, challengeDay.dayNumber, isLate);

    return submission;
  }
}
