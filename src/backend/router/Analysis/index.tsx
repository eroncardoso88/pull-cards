import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { Analysis } from "@prisma/client";
import { uuid } from "uuidv4";
export const createAnalysisSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  description: z.string(),
  textOne: z.string(),
  textTwo: z.string(),
  textThree: z.string(),
  textFour: z.string(),
  combinationInfoId: z.string(),
})

export const analysisRouter = createRouter()
  .mutation('create-analysis', {
    input: createAnalysisSchema,
    async resolve({ctx, input}) {
      const { 
        combinationInfoId,
        textOne,
        textTwo,
        textThree,
        textFour,
       } = input
      try {
        const analysis = await prisma.analysis.create({
          data: {
            id: uuid(),
            authorId: 'temp',
            createdAt: new Date(),
            combinationInfoId,
            textOne,
            textTwo,
            textThree,
            textFour,
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
  .query('list-analysis', {
    async resolve (): Promise<Analysis[]> {
      const allAnalysisFound = await prisma.analysis.findMany(

      )

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allAnalysisFound
    }
  })