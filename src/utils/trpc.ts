import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/src/backend/router/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();