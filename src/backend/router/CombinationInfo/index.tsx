import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { CombinationInfo } from "@prisma/client";

export const createCombinationInfoSchema = z.object({
  id: z.string(),
  cardSequenceList: z.string(),
  combinationId: z.string(),
})

export const combinationInfoRouter = createRouter()
  .mutation('create-combination-info', {
    input: createCombinationInfoSchema,
    async resolve({ctx, input}) {
      const { 
        cardSequenceList,
        combinationId
       } = input
      try {
        const combinationInfo = await prisma.combinationInfo.create({
          data: {
            cardSequenceList,
            combinationId
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
  .query('list-combination-info', {
    async resolve (): Promise<CombinationInfo[]> {
      const allCombinationInfoFound = await prisma.combinationInfo.findMany({
        where: {
          active: true,
        },
      })


      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationInfoFound
    }
  })