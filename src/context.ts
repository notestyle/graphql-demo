import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PubSub } from 'apollo-server-express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { getUserEmail, Token } from './utils'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  request: Request
  response: Response
  pubsub: PubSub
  auth: Token
}

export async function createContext(ctx: ExpressContext) {
  return {
    ...ctx,
    prisma: prisma,
    pubsub,
    // auth: getUserEmail(ctx),
  }
}
