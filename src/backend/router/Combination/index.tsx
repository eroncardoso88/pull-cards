import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { Combination } from "@prisma/client";

export const createCombinationSchema = z.object({
  id: z.any(),
  name: z.string(),
  combinationTypeId: z.any(),
  combinationSubjectId: z.any()
})

export const disableSchema = z.any();

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
            combinationTypeId: parseInt(combinationTypeId),
            combinationSubjectId: parseInt(combinationSubjectId)
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
  .mutation('edit-combination', {
    input: createCombinationSchema,
    async resolve({ctx, input}) {
      const { 
        id,
        name,
        combinationTypeId,
        combinationSubjectId
       } = input
      try {
        const user = await prisma.combination.update({
          where: {
            id: id,
          },
          data: {
            name,
            combinationTypeId: parseInt(combinationTypeId),
            combinationSubjectId: parseInt(combinationSubjectId)
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
  .mutation('disableone-combination', {
    input: disableSchema,
    async resolve({ctx, input}) {
      const id = input
      try {
        await prisma.combination.update({
          where: {
            id: id
          },
          data: {
            active: false
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
      const allCombinationsFound = await prisma.combination.findMany({
        where: {
          active: true,
        },
      })

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationsFound
    }
  })