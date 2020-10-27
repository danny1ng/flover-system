import { makeSchema } from '@nexus/schema';
import { applyMiddleware } from 'graphql-middleware';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';

import { permissions } from './permissions';
import * as types from './types';

const baseSchema = makeSchema({
  types,
  // plugins: [nexusPrisma()],
  outputs: {
    typegen: path.join(process.cwd(), 'nexus-typegen.d.ts'),
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
