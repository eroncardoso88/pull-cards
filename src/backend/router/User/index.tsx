import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "@/backend/utils/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server';

export const createUserSchema = z.object({
  createdAt: z.string(),
  email: z.string().email(),
  name: z.string(),
  birthday: z.string(),
  location: z.string(),
  role: z.string()
})

export const userRouter = createRouter()
  .mutation('create-user', {
    input: createUserSchema,
    async resolve({ctx, input}) {
      const { 
        createdAt,
        email,
        name,
        birthday,
        location,
        role
       } = input
      try {
        const user = await ctx.prisma.user.create({
          data: {
            createdAt,
            email,
            name,
            birthday,
            location,
            role
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
  .query('list-users', {
    async resolve () {
      const allUsersFound = await prisma.user.findMany()

      // if (allUsersFound.length === 0) {
      //   throw new Error('There are no users!')
      // }

      return allUsersFound
    }
  })