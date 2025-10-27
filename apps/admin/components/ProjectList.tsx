'use client';

import { StatusBadge } from '@orlix/ui';
import type { Project } from '@orlix/types';
import { useEffect, useState } from 'react';

const demoProjects: Project[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Launch landing page',
    description: 'Génération de contenu marketing',
    ownerId: '00000000-0000-0000-0000-000000000010',
    status: 'running'
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Voice assistant',
    description: 'Assistant vocal multilingue',
    ownerId: '00000000-0000-0000-0000-000000000010',
    status: 'draft'
  }
];

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(demoProjects);
  }, []);

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <article key={project.id} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm text-slate-400">{project.description}</p>
            </div>
            <StatusBadge status={project.status} />
          </header>
        </article>
      ))}
    </div>
  );
}
