import { makeSchema } from '@nexus/schema';
import * as types from './types';
import { applyMiddleware } from 'graphql-middleware';
import path from 'path';
import { permissions } from './permissions';

const baseSchema = makeSchema({
  types,
  outputs: {
    typegen: path.join(process.cwd(), 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'server', 'schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});

// export const schema = applyMiddleware(baseSchema, permissions);

export const schema = baseSchema;
