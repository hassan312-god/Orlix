import { clsx } from 'clsx';
import type { FC } from 'react';

export type StatusBadgeProps = {
  status: 'draft' | 'running' | 'completed';
};

const colors: Record<StatusBadgeProps['status'], string> = {
  draft: 'bg-gray-200 text-gray-800',
  running: 'bg-blue-200 text-blue-800',
  completed: 'bg-emerald-200 text-emerald-800'
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        colors[status]
      )}
    >
      {status.toUpperCase()}
    </span>
  );
};
