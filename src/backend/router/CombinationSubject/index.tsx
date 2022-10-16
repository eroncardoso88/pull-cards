import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { CombinationSubject } from "@prisma/client";

export const createCombinationSubjectSchema = z.object({
  id: z.number(),
  description: z.string(),
  deckName: z.enum(['MARSEILLE'])
})

export const combinationSubjectRouter = createRouter()
  .mutation('create-combination-subject', {
    input: createCombinationSubjectSchema,
    async resolve({ctx, input}) {
      const { 
        description,
        deckName
       } = input
      try {
        const user = await prisma.combinationSubject.create({
          data: {
            description,
            deckName
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
  .query('list-combination-subject', {
    async resolve (): Promise<CombinationSubject[]> {
      const allCombinationSubjectsFound = await prisma.combinationSubject.findMany({
        select: 
      })

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationSubjectsFound
    }
  })