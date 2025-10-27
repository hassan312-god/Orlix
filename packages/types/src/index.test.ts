import { describe, expect, it } from 'vitest';
import { orchestratorPayloadSchema, userSchema } from './index.js';

describe('@orlix/types', () => {
  it('validates a correct user object', () => {
    const result = userSchema.safeParse({
      id: '00000000-0000-0000-0000-000000000000',
      email: 'user@example.com',
      fullName: 'Test User',
      role: 'admin',
      credits: 42
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid orchestrator payload', () => {
    const result = orchestratorPayloadSchema.safeParse({
      project: {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Project',
        description: 'demo',
        ownerId: '00000000-0000-0000-0000-000000000000',
        status: 'draft'
      },
      agents: [],
      goal: 123
    });

    expect(result.success).toBe(false);
  });
});
