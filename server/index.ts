import { ApolloServer } from 'apollo-server-micro';

import { createContext } from './context';
import { permissions } from './permissions';
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  context: createContext,
}).createHandler({
  path: '/api',
});
