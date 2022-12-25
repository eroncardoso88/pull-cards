import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { CombinationSubject } from "@prisma/client";

export const createCombinationSubjectSchema = z.object({
  id: z.any(),
  description: z.string(),
})

export const disableSchema = z.any();


export const combinationSubjectRouter = createRouter()
  .mutation('create-combination-subject', {
    input: createCombinationSubjectSchema,
    async resolve({ctx, input}) {
      const { 
        description,
       } = input
      try {
        await prisma.combinationSubject.create({
          data: {
            description,
            active: true
          }
        })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
            })
          }
          throw new trpc.TRPCError({
            code: 'CONFLICT',
          })
        }
        throw e
      }
    }
  })
  .mutation('edit-combination-subject', {
    input: createCombinationSubjectSchema,
    async resolve({ctx, input}) {
      const { 
        id,
        description,
       } = input
      try {
        await prisma.combinationSubject.update({
          where: {
            id: id
          },
          data: {
            description,
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
  .mutation('disableone-combination-subject', {
    input: disableSchema,
    async resolve({ctx, input}) {
      const id = input
      try {
        await prisma.combinationSubject.update({
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
  .query('list-combination-subject', {
    async resolve (): Promise<CombinationSubject[]> {
      const allCombinationSubjectsFound = await prisma.combinationSubject.findMany({
        where: {
          active: true,
        },
      })

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allCombinationSubjectsFound
    }
  })