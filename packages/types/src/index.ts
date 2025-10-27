import { z } from 'zod';

export const userRoleSchema = z.enum(['admin', 'builder', 'viewer']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string(),
  role: userRoleSchema,
  credits: z.number().nonnegative()
});
export type User = z.infer<typeof userSchema>;

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  description: z.string().default(''),
  ownerId: z.string().uuid(),
  status: z.enum(['draft', 'running', 'completed'])
});
export type Project = z.infer<typeof projectSchema>;

export const agentSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string().min(2),
  provider: z.enum(['openai', 'anthropic', 'google', 'deepseek', 'sora']),
  configuration: z.record(z.any())
});
export type Agent = z.infer<typeof agentSchema>;

export const orchestratorPayloadSchema = z.object({
  project: projectSchema,
  agents: z.array(agentSchema),
  goal: z.string()
});
export type OrchestratorPayload = z.infer<typeof orchestratorPayloadSchema>;

export const healthSchema = z.object({
  status: z.literal('ok')
});
export type Health = z.infer<typeof healthSchema>;
