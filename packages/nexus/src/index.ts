import EventEmitter from 'eventemitter3';
import type { Agent, OrchestratorPayload } from '@orlix/types';

export type NexusEvent =
  | { type: 'agent:started'; agent: Agent }
  | { type: 'agent:completed'; agent: Agent; output: string }
  | { type: 'pipeline:completed'; projectId: string };

export class NexusOrchestrator extends EventEmitter<NexusEvent> {
  async run(payload: OrchestratorPayload): Promise<void> {
    for (const agent of payload.agents) {
      this.emit('agent:started', { type: 'agent:started', agent });
      await new Promise((resolve) => setTimeout(resolve, 10));
      const output = `${agent.name} processed goal ${payload.goal}`;
      this.emit('agent:completed', { type: 'agent:completed', agent, output });
    }

    this.emit('pipeline:completed', {
      type: 'pipeline:completed',
      projectId: payload.project.id
    });
  }
}

export function createOrchestrator(): NexusOrchestrator {
  return new NexusOrchestrator();
}
