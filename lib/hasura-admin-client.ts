import { GraphQLClient } from 'graphql-request'

export const hasuraAdminClient = new GraphQLClient(`${process.env.HASURA_GRAPHQL_API_ENDPOINT}`, {
  headers: {
    'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
  }
})
