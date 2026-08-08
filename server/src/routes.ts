import { FastifyInstance } from 'fastify';
import z from 'zod';
import { db } from './db';
import { SubmissionService } from './services/SubmissionService';
import { getDayDifferenceInTimezone, getNowInChallengeTimezone } from './utils/timezone';

export async function routes(app: FastifyInstance) {

  app.get('/api/v1/me/dashboard', async (request, reply) => {
    const studentId = (request as any).studentId;

    const student = await db.studentProfile.findUnique({
      where: { id: studentId },
      include: { track: true, cohort: true }
    });

    if (!student) {
      return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Student profile not found' } });
    }

    const enrollment = await db.enrollment.findFirst({
      where: { studentId },
      include: { challenge: true }
    });

    if (!enrollment) {
      return reply.status(404).send({ error: { code: 'NOT_ENROLLED', message: 'Student is not enrolled in any challenge' } });
    }

    const now = getNowInChallengeTimezone();
    const expectedDayNumber = getDayDifferenceInTimezone(now, enrollment.startDate) + 1;
    const currentDayNumber = Math.max(enrollment.currentDay, expectedDayNumber);

    const todayTask = await db.challengeDay.findUnique({
      where: {
        challengeId_dayNumber: {
          challengeId: enrollment.challengeId,
          dayNumber: currentDayNumber,
        }
      }
    });

    const submissionsCount = await db.submission.count({
      where: { studentId, challengeDay: { challengeId: enrollment.challengeId } }
    });

    const completionRate = enrollment.challenge.totalDays > 0 
      ? Number(((submissionsCount / enrollment.challenge.totalDays) * 100).toFixed(1))
      : 0;

    const activities = await db.activity.findMany({
      where: { studentId },
      orderBy: { date: 'desc' },
      take: 14,
      include: { challengeDay: true }
    });

    // Formatting for frontend
    return {
      student: {
        name: student.name,
        avatarUrl: student.avatarUrl,
        track: student.track?.name,
        cohort: student.cohort?.name,
      },
      streak: {
        current: enrollment.currentStreak,
        best: enrollment.bestStreak,
      },
      today: todayTask ? {
        day: todayTask.dayNumber,
        title: todayTask.title,
        status: 'pending', // could check if already submitted
        difficulty: todayTask.difficulty,
        estimatedMinutes: todayTask.estimatedMinutes,
      } : null,
      progress: {
        currentDay: currentDayNumber,
        totalDays: enrollment.challenge.totalDays,
        completed: submissionsCount,
        missed: Math.max(0, expectedDayNumber - submissionsCount - 1),
        completionRate,
      },
      badges: [],
      activity: activities.map(a => ({
        day: a.challengeDay.dayNumber,
        status: a.status,
      })),
      cohortPulse: {
        percentage: 0
      }
    };
  });

  // Schema for Submissions
  const SubmissionSchema = z.object({
    challengeDayId: z.string(),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url(),
    note: z.string().optional(),
  });

  app.post('/api/v1/submissions', async (request, reply) => {
    const studentId = (request as any).studentId;
    const data = SubmissionSchema.parse(request.body);

    const submission = await SubmissionService.submit(
      studentId,
      data.challengeDayId,
      data.githubUrl,
      data.linkedinUrl,
      data.note
    );

    return reply.status(201).send(submission);
  });

  // Get Tracks
  app.get('/api/v1/tracks', async (request, reply) => {
    const tracks = await db.track.findMany({
      where: { isActive: true },
    });
    
    // For frontend compatibility, count students manually or just mock it since we don't have real aggregates for all tracks yet
    return tracks.map(t => ({
      id: t.slug,
      name: t.name,
      description: t.description,
      icon: t.icon,
      days: 60,
      students: 0,
    }));
  });

  // Get Challenge Day
  app.get('/api/v1/me/challenge/days/:dayNumber', async (request, reply) => {
    const studentId = (request as any).studentId;
    const dayNumber = parseInt((request.params as any).dayNumber, 10);

    const enrollment = await db.enrollment.findFirst({
      where: { studentId },
      include: { challenge: true }
    });

    if (!enrollment) {
      return reply.status(404).send({ error: { code: 'NOT_ENROLLED', message: 'Student is not enrolled in any challenge' } });
    }

    const challengeDay = await db.challengeDay.findUnique({
      where: {
        challengeId_dayNumber: {
          challengeId: enrollment.challengeId,
          dayNumber: dayNumber,
        }
      }
    });

    if (!challengeDay) {
      return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Challenge day not found' } });
    }

    const submission = await db.submission.findUnique({
      where: {
        studentId_challengeDayId: {
          studentId,
          challengeDayId: challengeDay.id,
        }
      }
    });

    const now = getNowInChallengeTimezone();
    const expectedDayNumber = getDayDifferenceInTimezone(now, enrollment.startDate) + 1;
    const isLate = dayNumber < expectedDayNumber;
    
    let acceptanceCriteria = [];
    try {
      acceptanceCriteria = JSON.parse(challengeDay.acceptanceCriteria);
    } catch {}

    return {
      day: challengeDay.dayNumber,
      totalDays: enrollment.challenge.totalDays,
      task: {
        id: challengeDay.id,
        title: challengeDay.title,
        description: challengeDay.description,
        acceptanceCriteria: acceptanceCriteria,
        difficulty: challengeDay.difficulty,
        estimatedMinutes: challengeDay.estimatedMinutes
      },
      submission: submission ? {
        githubUrl: submission.githubUrl,
        linkedinUrl: submission.linkedinUrl,
        note: submission.note,
        status: submission.status,
      } : null,
      isLate,
      locked: dayNumber > expectedDayNumber && dayNumber > enrollment.currentDay,
    };
  });
}
