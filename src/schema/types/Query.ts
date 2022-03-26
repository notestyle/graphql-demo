import { queryType } from 'nexus'
import moment = require('moment-timezone')
export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ filtering: true, ordering: true, pagination: true })
    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { email: ctx.auth.email },
        });
      },
    })
  },
})
