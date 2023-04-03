import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res);
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await prisma.user.findMany();

  return res.status(200).send(response);
};
