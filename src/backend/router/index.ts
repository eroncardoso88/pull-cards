import * as trpc from '@trpc/server';
import { userRouter } from './User';
import { combinationSubjectRouter } from './CombinationSubject';
import { combinationTypeRouter } from './CombinationType';
import { deckRouter } from './Deck';
import { cardRouter } from './Card';
import { analysisRouter } from './Analysis';
import { combinationInfoRouter } from './CombinationInfo';
import { combinationRouter } from './Combination';
import { z } from 'zod';

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .merge('user.', userRouter)
  .merge('combination-subject.', combinationSubjectRouter)
  .merge('combination-type.', combinationTypeRouter)
  .merge('deck.', deckRouter)
  .merge('card.', cardRouter)
  .merge('analysis.', analysisRouter)
  .merge('combination-info.', combinationInfoRouter)
  .merge('combination.', combinationRouter)

// export type definition of API
export type AppRouter = typeof appRouter;

