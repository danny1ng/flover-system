import { NextPageContext } from 'next';
import { GraphQLClient } from 'graphql-request';

export const graphQLClientClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND, {
  headers: { credential: 'same-origin' },
});

export const createGraphQLClientClient = (ctx: NextPageContext) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND, {
    headers: { credential: 'same-origin', cookie: ctx.req.headers.cookie },
  });
