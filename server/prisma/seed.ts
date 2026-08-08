import { PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with real data...');

  // 1. Create Cohort
  const cohort = await prisma.cohort.create({
    data: {
      name: 'Autumn 2026 Core Cohort',
      startDate: new Date('2026-08-01T00:00:00Z'),
      endDate: new Date('2026-09-29T23:59:59Z'),
      isActive: true,
    }
  });

  // 2. Create Tracks
  const webTrack = await prisma.track.create({
    data: {
      name: 'Full-Stack Web Engineering',
      slug: 'web-development',
      description: 'Master React, Node.js, and databases. Build scalable, production-ready web applications from scratch.',
      icon: 'Globe',
      color: '#B8786F',
    }
  });

  const aiTrack = await prisma.track.create({
    data: {
      name: 'AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Dive deep into Python, neural networks, and LLM integration. Build your own intelligent agents.',
      icon: 'Brain',
      color: '#6F8CB8',
    }
  });
  
  const mobileTrack = await prisma.track.create({
    data: {
      name: 'Mobile App Development',
      slug: 'mobile-dev',
      description: 'Create native-feeling applications for iOS and Android using React Native and Expo.',
      icon: 'Smartphone',
      color: '#8CB86F',
    }
  });

  // 3. Create Challenges
  const webChallenge = await prisma.challenge.create({
    data: {
      name: 'The 60-Day Web Masterclass',
      description: 'Transform from a beginner to a hireable full-stack developer in 60 days of intensive building.',
      totalDays: 60,
      trackId: webTrack.id,
    }
  });
  
  const aiChallenge = await prisma.challenge.create({
    data: {
      name: 'Applied AI 60-Day Challenge',
      description: 'Build 60 unique AI tools and agents over two months.',
      totalDays: 60,
      trackId: aiTrack.id,
    }
  });

  // 4. Create Realistic Challenge Days for Web Track (First 15 Days)
  const webDaysData = [
    {
      title: 'HTML5 Semantics & Accessibility',
      description: 'Build a semantic article page using only HTML5. Focus on screen reader compatibility and proper document outlining.',
      acceptanceCriteria: ['Use article, section, aside, header, and footer tags', 'Passes WAVE accessibility checker with 0 errors', 'Includes proper ARIA labels where necessary'],
      difficulty: 'Beginner',
      estimatedMinutes: 45
    },
    {
      title: 'CSS Flexbox Navigation',
      description: 'Create a responsive top navigation bar with a dropdown menu and a mobile hamburger toggle using pure CSS Flexbox.',
      acceptanceCriteria: ['Fully responsive down to 320px', 'No JavaScript used for the layout', 'Dropdown works on hover for desktop'],
      difficulty: 'Beginner',
      estimatedMinutes: 60
    },
    {
      title: 'CSS Grid Dashboard Layout',
      description: 'Design a complex 12-column grid dashboard layout with a sidebar, header, and main content widgets area.',
      acceptanceCriteria: ['Uses CSS Grid for the main layout', 'Responsive breakpoints using @media', 'Sidebar collapses on mobile'],
      difficulty: 'Medium',
      estimatedMinutes: 90
    },
    {
      title: 'JavaScript DOM Manipulation',
      description: 'Build a functional To-Do list using vanilla JavaScript. Add, edit, delete, and mark tasks as complete.',
      acceptanceCriteria: ['No external libraries (no React/jQuery)', 'Data persists in localStorage', 'Clean separation of logic and UI updates'],
      difficulty: 'Medium',
      estimatedMinutes: 90
    },
    {
      title: 'Fetch API & Async/Await',
      description: 'Create a weather dashboard that fetches data from the OpenWeather API based on user input.',
      acceptanceCriteria: ['Handles API errors gracefully (e.g. 404 city not found)', 'Uses async/await syntax exclusively', 'Displays temperature, humidity, and weather icon'],
      difficulty: 'Medium',
      estimatedMinutes: 120
    },
    {
      title: 'React Fundamentals: Components',
      description: 'Convert the vanilla JS To-Do list into a React application using functional components.',
      acceptanceCriteria: ['Breaks UI into at least 3 separate components', 'Passes data via props correctly', 'Uses PropTypes or TypeScript interfaces'],
      difficulty: 'Beginner',
      estimatedMinutes: 60
    },
    {
      title: 'React State & Hooks',
      description: 'Build a complex multi-step form (wizard) in React using useState and custom hooks for validation.',
      acceptanceCriteria: ['At least 3 steps with "Next" and "Back" buttons', 'Validates email and password requirements', 'Maintains state if user goes back'],
      difficulty: 'Medium',
      estimatedMinutes: 120
    },
    {
      title: 'React Context API',
      description: 'Implement a global Dark/Light mode theme switcher using the React Context API.',
      acceptanceCriteria: ['Theme preference saves to localStorage', 'Context provider wraps the main App component', 'Custom useTheme hook implemented'],
      difficulty: 'Medium',
      estimatedMinutes: 90
    },
    {
      title: 'React Router v6',
      description: 'Create a multi-page e-commerce storefront with a home page, product listing, and dynamic product detail pages.',
      acceptanceCriteria: ['Uses React Router v6 createBrowserRouter', 'Dynamic routing (e.g. /product/:id) works correctly', 'Includes an active state on navigation links'],
      difficulty: 'Medium',
      estimatedMinutes: 120
    },
    {
      title: 'Node.js Express Server',
      description: 'Set up a basic Node.js Express server with standard middleware (cors, helmet, morgan).',
      acceptanceCriteria: ['Server runs on port 3000', 'Responds to GET /health with a 200 OK', 'Uses environment variables for configuration'],
      difficulty: 'Beginner',
      estimatedMinutes: 60
    },
    {
      title: 'REST API Design',
      description: 'Build a complete CRUD REST API for a "Books" resource using Express and in-memory arrays.',
      acceptanceCriteria: ['Implements GET, POST, PUT, and DELETE methods', 'Returns appropriate HTTP status codes (200, 201, 400, 404)', 'Validates incoming request bodies'],
      difficulty: 'Medium',
      estimatedMinutes: 90
    },
    {
      title: 'PostgreSQL & Prisma Setup',
      description: 'Initialize a PostgreSQL database, define a Prisma schema for Users and Posts, and run your first migration.',
      acceptanceCriteria: ['Valid schema.prisma file', 'Database migration applies successfully', 'Can seed the database with initial data via Prisma Studio'],
      difficulty: 'Medium',
      estimatedMinutes: 60
    },
    {
      title: 'Connecting Express to DB',
      description: 'Update your Books API to read and write from the PostgreSQL database using Prisma Client.',
      acceptanceCriteria: ['All CRUD operations persist to the database', 'Uses try/catch blocks for database errors', 'Implements basic pagination on GET /books'],
      difficulty: 'Hard',
      estimatedMinutes: 120
    },
    {
      title: 'Authentication & JWT',
      description: 'Implement user registration and login endpoints. Issue a JWT upon successful login and protect the Books API routes.',
      acceptanceCriteria: ['Passwords are hashed using bcrypt', 'JWTs are signed with a secure secret', 'Middleware correctly verifies tokens on protected routes'],
      difficulty: 'Hard',
      estimatedMinutes: 150
    },
    {
      title: 'Full-Stack Integration',
      description: 'Connect your React frontend to your Express/Prisma backend. Fetch books and handle user login from the UI.',
      acceptanceCriteria: ['CORS is configured correctly', 'Frontend securely stores the JWT', 'UI reflects logged-in vs logged-out state correctly'],
      difficulty: 'Hard',
      estimatedMinutes: 180
    }
  ];

  const webDays = webDaysData.map((day, i) => ({
    challengeId: webChallenge.id,
    dayNumber: i + 1,
    title: day.title,
    description: day.description,
    acceptanceCriteria: JSON.stringify(day.acceptanceCriteria),
    difficulty: day.difficulty,
    estimatedMinutes: day.estimatedMinutes,
    resourceLinks: JSON.stringify([]),
  }));
  
  // Fill the rest of the 60 days with generic placeholders for now
  for (let i = webDaysData.length; i < 60; i++) {
    webDays.push({
      challengeId: webChallenge.id,
      dayNumber: i + 1,
      title: `Advanced Web Concept ${i + 1}`,
      description: 'Advanced topic building on previous weeks.',
      acceptanceCriteria: JSON.stringify([]),
      difficulty: 'Hard',
      estimatedMinutes: 120,
      resourceLinks: JSON.stringify([]),
    });
  }

  await prisma.challengeDay.createMany({ data: webDays });
  
  // Also create days for AI challenge to prevent empty tracks
  const aiDays = Array.from({ length: 60 }, (_, i) => ({
    challengeId: aiChallenge.id,
    dayNumber: i + 1,
    title: `AI Concept Day ${i + 1}`,
    description: 'Learn foundational AI and Machine Learning concepts.',
    acceptanceCriteria: JSON.stringify([]),
    difficulty: 'Medium',
    estimatedMinutes: 90,
    resourceLinks: JSON.stringify([]),
  }));
  await prisma.challengeDay.createMany({ data: aiDays });

  // 5. Create Badges
  await prisma.badge.createMany({
    data: [
      {
        name: '7-Day Warrior',
        description: 'Completed 7 days of coding consecutively.',
        icon: 'Shield',
        requirementType: 'STREAK',
        requirementValue: 7,
      },
      {
        name: 'Halfway Hero',
        description: 'Completed 30 days of the challenge.',
        icon: 'Trophy',
        requirementType: 'COMPLETION',
        requirementValue: 30,
      },
      {
        name: 'Consistency King',
        description: 'Maintained a 30-day streak.',
        icon: 'Flame',
        requirementType: 'STREAK',
        requirementValue: 30,
      },
      {
        name: 'Challenge Champion',
        description: 'Successfully completed all 60 days.',
        icon: 'Crown',
        requirementType: 'COMPLETION',
        requirementValue: 60,
      }
    ]
  });

  console.log('Real data seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
