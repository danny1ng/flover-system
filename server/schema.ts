import { declarativeWrappingPlugin, fieldAuthorizePlugin, makeSchema } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';

import * as types from './types';

const baseSchema = makeSchema({
  types,
  plugins: [nexusPrisma(), fieldAuthorizePlugin(), declarativeWrappingPlugin()],
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

export const schema = baseSchema;
