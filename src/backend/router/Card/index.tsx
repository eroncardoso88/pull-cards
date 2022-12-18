import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { Card } from "@prisma/client";

export const createCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  info: z.string(),
  deckId: z.number(),
})

export const cardRouter = createRouter()
  .mutation('create-card', {
    input: createCardSchema,
    async resolve({ctx, input}) {
      const { 
        name,
        info,
        deckId
       } = input
      try {
        const user = await prisma.card.create({
          data: {
            name,
            info,
            deckId
          }
        })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
            })
          }
        }
      }
    }
  })
  .query('list-card', {
    async resolve (): Promise<Card[]> {
      const allCardsFound = await prisma.card.findMany(

      )

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCardsFound
    }
  })