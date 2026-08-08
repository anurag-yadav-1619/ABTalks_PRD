import { FastifyInstance } from 'fastify';
import z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from './db';

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  trackId: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  app.post('/api/v1/auth/register', async (request, reply) => {
    try {
      const data = RegisterSchema.parse(request.body);

      const existingUser = await db.user.findUnique({ where: { email: data.email } });
      if (existingUser) {
        return reply.status(400).send({ error: { code: 'EMAIL_IN_USE', message: 'Email is already registered' } });
      }

      const passwordHash = await bcrypt.hash(data.password, 10);

      const user = await db.user.create({
        data: {
          email: data.email,
          passwordHash,
          studentProfile: {
            create: {
              name: data.name,
              trackId: data.trackId,
            }
          }
        },
        include: {
          studentProfile: true
        }
      });

      // Find an active track and challenge to auto-enroll
      const track = await db.track.findFirst({ where: { isActive: true } });
      const challenge = await db.challenge.findFirst({ where: { isActive: true } });

      if (track && challenge && user.studentProfile) {
        await db.enrollment.create({
          data: {
            studentId: user.studentProfile.id,
            challengeId: challenge.id,
            trackId: track.id,
            startDate: new Date(),
          }
        });
      }

      const token = app.jwt.sign({ 
        studentId: user.studentProfile?.id,
        userId: user.id
      });

      return reply.status(201).send({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.studentProfile?.name
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } });
      }
      throw error;
    }
  });

  app.post('/api/v1/auth/login', async (request, reply) => {
    try {
      const data = LoginSchema.parse(request.body);

      const user = await db.user.findUnique({ 
        where: { email: data.email },
        include: { studentProfile: true }
      });

      if (!user) {
        return reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) {
        return reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      const token = app.jwt.sign({ 
        studentId: user.studentProfile?.id,
        userId: user.id
      });

      return reply.send({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.studentProfile?.name
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } });
      }
      throw error;
    }
  });
}
