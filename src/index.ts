import { config } from 'dotenv-flow'
config()
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import * as HTTP from 'http'
import { createContext } from './context'
import { permissions } from './permissions'
import { schema } from './schema'

const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"

const graphqlServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})
const app = express().use(
  cookieParser(process.env.SESSION_SECRET || 's4per$ecret'),
)
const http = HTTP.createServer(app)

graphqlServer.applyMiddleware({ app })
graphqlServer.installSubscriptionHandlers(http)

http.listen(Number(port), String(host), () => {
  console.log(
    `🚀 GraphQL service ready at http://${host}:${port}/graphql`,
  )
})
