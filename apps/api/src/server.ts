import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { projectSchema } from '@orlix/types';
import { prisma } from './services/prisma.js';
import { openApiDocument } from './openapi.js';

export function buildServer() {
  const app = Fastify({
    logger: true
  });

  app.register(cors, { origin: '*' });
  app.register(jwt, { secret: process.env.JWT_SECRET ?? 'development-secret' });

  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/openapi.json', async () => openApiDocument);

  app.get('/projects', async () => {
    const projects = await prisma.project.findMany();
    return { projects };
  });

  app.post('/projects', async (request, reply) => {
    const parsed = projectSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const project = await prisma.project.create({ data: parsed.data });
    return reply.status(201).send(project);
  });

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = buildServer();
  const port = Number(process.env.PORT ?? 3001);

  app.listen({ port, host: '0.0.0.0' }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
