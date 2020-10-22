import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
}

export function createContext(request: any) {
  return {
    ...request,
    prisma,
    // user: getUser(req),
  };
}
