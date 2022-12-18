import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { Combination } from "@prisma/client";

export const createCombinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  combinationTypeId: z.number(),
  combinationSubjectId: z.number()
})

export const combinationRouter = createRouter()
  .mutation('create-combination', {
    input: createCombinationSchema,
    async resolve({ctx, input}) {
      const { 
        name,
        combinationTypeId,
        combinationSubjectId
       } = input
      try {
        const user = await prisma.combination.create({
          data: {
            name,
            combinationTypeId,
            combinationSubjectId
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
  .query('list-combination', {
    async resolve (): Promise<Combination[]> {
      const allCombinationsFound = await prisma.combination.findMany(

      )

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationsFound
    }
  })