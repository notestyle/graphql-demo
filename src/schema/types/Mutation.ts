import { mutationType } from 'nexus'
import moment = require('moment-timezone')

export const Mutation = mutationType({
  definition(t) {
    t.crud.deleteOneUser()
    t.crud.updateOneUser()
  },
})
