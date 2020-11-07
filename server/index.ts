import { ApolloServer } from 'apollo-server-micro';

import { createContext } from './context';
import { permissions } from './permissions';
import { schema } from './schema';
const connection = {};

export const server = () => {
  console.log('connection', connection);
  connection.isConnected = true;
  return new ApolloServer({
    schema,
    context: createContext,
  }).createHandler({
    path: '/api',
  });
};
