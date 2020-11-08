import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { rules } from './permissions';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  auth: typeof rules;
}

export function createContext(request: any) {
  return {
    ...request,
    prisma,
    auth: rules,
  };
}
