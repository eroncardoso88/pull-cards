import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { CombinationType } from "@prisma/client";

export const createCombinationTypeSchema = z.object({
  id: z.number(),
  description: z.string(),
  deckName: z.enum(['MARSEILLE'])
})

export const combinationTypeRouter = createRouter()
  .mutation('create-combination-type', {
    input: createCombinationTypeSchema,
    async resolve({ctx, input}) {
      const { 
        description,
        deckName
       } = input
      try {
        const user = await prisma.combinationType.create({
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
  .query('list-combination-type', {
    async resolve (): Promise<CombinationType[]> {
      const allCombinationTypesFound = await prisma.combinationType.findMany(

      )

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationTypesFound
    }
  })