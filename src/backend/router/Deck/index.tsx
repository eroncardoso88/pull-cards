import { number, z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';
import { Deck } from "@prisma/client";

export const createDeckSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const deckRouter = createRouter()
  .mutation('create-deck', {
    input: createDeckSchema,
    async resolve({ctx, input}) {
      const { 
        name,
       } = input
      try {
        const user = await prisma.deck.create({
          data: {
            name
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
  .mutation('edit-deck', {
    input: createDeckSchema,
    async resolve({ctx, input}) {
      const { 
        name,
        id
       } = input
       console.log(`input `, input)
      try {
        await prisma.deck.update({
          where: {
            id: id
          },
          data: {
            name
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
  .mutation('disableone-deck', {
    input: createDeckSchema,
    async resolve({ctx, input}) {
      const { 
        id
       } = input
      try {
        await prisma.deck.update({
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
  .query('list-deck', {
    async resolve (): Promise<Deck[]> {
      const allDeckssFound = await prisma.deck.findMany(
        {
          where: {
            active: true
          }
        }
      )

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allDeckssFound
    }
  })