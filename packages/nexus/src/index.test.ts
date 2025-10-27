import { describe, expect, it } from 'vitest';
import { createOrchestrator } from './index.js';

const payload = {
  project: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test',
    description: 'demo',
    ownerId: '00000000-0000-0000-0000-000000000000',
    status: 'draft'
  },
  agents: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      projectId: '00000000-0000-0000-0000-000000000000',
      name: 'Coder',
      provider: 'openai',
      configuration: {}
    }
  ],
  goal: 'Ship feature'
} as const;

describe('NexusOrchestrator', () => {
  it('emits pipeline events in order', async () => {
    const orchestrator = createOrchestrator();
    const events: string[] = [];

    orchestrator.on('agent:started', (event) => {
      events.push(`${event.agent.name}:started`);
    });
    orchestrator.on('agent:completed', (event) => {
      events.push(`${event.agent.name}:completed`);
    });
    orchestrator.on('pipeline:completed', () => {
      events.push('pipeline:completed');
    });

    await orchestrator.run(payload);

    expect(events).toEqual([
      'Coder:started',
      'Coder:completed',
      'pipeline:completed'
    ]);
  });
});
