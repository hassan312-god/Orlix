import { describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';

vi.mock('../src/services/prisma', () => {
  const projects = [
    {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo',
      description: 'demo',
      ownerId: '00000000-0000-0000-0000-000000000010',
      status: 'draft'
    }
  ];
  return {
    prisma: {
      project: {
        findMany: vi.fn().mockResolvedValue(projects),
        create: vi.fn().mockImplementation(async (data: { data: any }) => data.data)
      }
    }
  };
});

import { buildServer } from '../src/server';

describe('API server', () => {
  let app: FastifyInstance;

  it('returns health ok', async () => {
    app = buildServer();
    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  it('creates project with valid payload', async () => {
    app = buildServer();
    const payload = {
      id: '00000000-0000-0000-0000-000000000123',
      name: 'Test project',
      description: 'desc',
      ownerId: '00000000-0000-0000-0000-000000000010',
      status: 'draft'
    };
    const response = await app.inject({ method: 'POST', url: '/projects', payload });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({ name: 'Test project' });
  });
});
