import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { rules } from './permissions';

if (process.env.NODE_ENV === 'development' && !(global as any).__prisma__) {
  (global as any).__prisma__ = new PrismaClient();
}

const prisma = (global as any).__prisma__ || new PrismaClient();

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
