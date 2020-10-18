import { ApolloServer } from 'apollo-server-micro';
import { permissions } from './permissions';
import { schema } from './schema';
import { createContext } from './context';

export const server = new ApolloServer({
  schema,
  context: createContext,
}).createHandler({
  path: '/api',
});
