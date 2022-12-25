import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { CombinationType } from "@prisma/client";
import { Z_STREAM_END } from "zlib";

export const createCombinationTypeSchema = z.object({
  id: z.any(),
  description: z.string(),
  deckId: z.any()
})

export const disableSchema = z.any();

export const combinationTypeRouter = createRouter()
  .mutation('create-combination-type', {
    input: createCombinationTypeSchema,
    async resolve({ctx, input}) {
      const { 
        description,
        deckId
       } = input
      try {
        const user = await prisma.combinationType.create({
          data: {
            description,
            deckId: parseInt(deckId)
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
  .mutation('edit-combination-type', {
    input: createCombinationTypeSchema,
    async resolve({ctx, input}) {
      const { 
        id,
        description,
        deckId
       } = input
       console.log('AEAEAE', input)
      try {
        await prisma.combinationType.update({
          where: {
            id: id
          },
          data: {
            description,
            deckId: parseInt(deckId)
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
  .mutation('disableone-combination-type', {
    input: disableSchema,
    async resolve({ctx, input}) {
      const id = input
      try {
        await prisma.combinationType.update({
          where: {
            id: id
          },
          data: {
            active: false,
          },
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
      const allCombinationTypesFound = await prisma.combinationType.findMany({
        where: {
          active: true,
        },
      })

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationTypesFound
    }
  })