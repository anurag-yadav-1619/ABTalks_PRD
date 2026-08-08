import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ZodError } from 'zod';
import jwt from '@fastify/jwt';

export function buildApp(): FastifyInstance {
  const app = fastify({
    logger: true,
  });

  // Plugins
  app.register(helmet);
  const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true;
  app.register(cors, {
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-fallback'
  });

  // JWT Authentication Middleware
  app.decorateRequest('studentId', '');
  app.addHook('onRequest', async (request, reply) => {
    // Skip auth for public routes
    if (
      request.url.startsWith('/api/v1/auth') || 
      request.url.startsWith('/api/v1/health') ||
      request.url.startsWith('/api/v1/tracks')
    ) {
      return;
    }
    
    try {
      await request.jwtVerify();
      (request as any).studentId = (request.user as any).studentId;
    } catch (err) {
      return reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
    }
  });

  // Global Error Handler
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.issues,
        }
      });
    }

    if (error.statusCode) {
      return reply.status(error.statusCode).send({
        error: {
          code: error.name || 'API_ERROR',
          message: error.message,
        }
      });
    }

    app.log.error(error);
    reply.status(500).send({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      }
    });
  });

  // Health route
  app.get('/api/v1/health', async () => {
    return { status: 'ok' };
  });

  app.register(async (instance) => {
    const { routes } = await import('./routes.js');
    await routes(instance);
    
    const { authRoutes } = await import('./auth.routes.js');
    await authRoutes(instance);
  });

  return app;
}
