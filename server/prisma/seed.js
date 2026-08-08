"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    // 1. Create Cohort
    const cohort = await prisma.cohort.create({
        data: {
            name: 'Aug 2026 Cohort',
            startDate: new Date('2026-08-01T00:00:00Z'),
            endDate: new Date('2026-09-29T23:59:59Z'),
            isActive: true,
        }
    });
    // 2. Create Track
    const track = await prisma.track.create({
        data: {
            name: 'Web Development',
            slug: 'web-development',
            description: 'Learn modern web development by building daily projects.',
            icon: 'Globe',
            color: '#B8786F',
        }
    });
    // 3. Create Challenge
    const challenge = await prisma.challenge.create({
        data: {
            name: 'ABTalks 60-Day Coding Challenge',
            description: 'Build in public every day for 60 days.',
            totalDays: 60,
            trackId: track.id,
        }
    });
    // 4. Create Challenge Days
    const days = Array.from({ length: 60 }, (_, i) => ({
        challengeId: challenge.id,
        dayNumber: i + 1,
        title: i === 11 ? 'Build a Responsive Pricing Page' : `Day ${i + 1} Challenge`,
        description: i === 11
            ? 'Create a mobile-first pricing page with 3 tiers using pure CSS Grid/Flexbox.'
            : 'Placeholder description.',
        acceptanceCriteria: i === 11
            ? JSON.stringify(['Responsive at 390px and 1280px', 'At least 3 pricing tiers', 'One CTA button per tier'])
            : JSON.stringify([]),
        difficulty: i < 20 ? 'Beginner' : i < 40 ? 'Medium' : 'Hard',
        estimatedMinutes: 90,
        resourceLinks: JSON.stringify([]),
    }));
    await prisma.challengeDay.createMany({ data: days });
    const challengeDaysList = await prisma.challengeDay.findMany({ where: { challengeId: challenge.id } });
    // 5. Create User & Student
    const user = await prisma.user.create({
        data: {
            email: 'aryan@example.com',
            passwordHash: 'hashed_password_mock', // Mock
        }
    });
    const student = await prisma.studentProfile.create({
        data: {
            id: 'mock-student-id-123', // Hardcoded for our mock auth middleware
            userId: user.id,
            name: 'Aryan Verma',
            trackId: track.id,
            cohortId: cohort.id,
            startDate: (0, date_fns_1.subDays)(new Date(), 11), // 11 days ago
        }
    });
    // 6. Create Enrollment
    const enrollment = await prisma.enrollment.create({
        data: {
            studentId: student.id,
            challengeId: challenge.id,
            trackId: track.id,
            startDate: student.startDate,
            currentDay: 12,
            currentStreak: 11,
            bestStreak: 11,
        }
    });
    // 7. Create Submissions & Activities (Past 11 Days)
    for (let i = 1; i <= 11; i++) {
        const day = challengeDaysList.find(d => d.dayNumber === i);
        if (!day)
            continue;
        await prisma.submission.create({
            data: {
                studentId: student.id,
                challengeDayId: day.id,
                githubUrl: 'https://github.com/aryanverma/repo',
                linkedinUrl: 'https://linkedin.com/posts/aryanverma',
                status: 'submitted',
                isLate: false,
                submittedAt: (0, date_fns_1.subDays)(new Date(), 12 - i),
            }
        });
        await prisma.activity.create({
            data: {
                studentId: student.id,
                challengeDayId: day.id,
                status: 'completed',
                date: (0, date_fns_1.subDays)(new Date(), 12 - i),
            }
        });
    }
    // 8. Create Badges
    const badge = await prisma.badge.create({
        data: {
            name: '7-Day Warrior',
            description: 'Completed 7 days of coding.',
            icon: 'Shield',
            requirementType: 'STREAK',
            requirementValue: 7,
        }
    });
    await prisma.studentBadge.create({
        data: {
            studentId: student.id,
            badgeId: badge.id,
        }
    });
    console.log('Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
