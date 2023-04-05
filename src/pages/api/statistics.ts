import { StatisticWithoutId } from '@/types';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return await createStatistic(req, res);
  }
}

const createStatistic = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newEntry = newStatisticEntry(req.body);
    const response = await prisma.statistic.create({
      data: newEntry,
    });

    await prisma.$disconnect();

    return res.status(200).send(response);
  } catch (error) {
    return res.send({ message: error });
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isWpm = (wpm: unknown): string => {
  if (!wpm || !isString(wpm)) {
    throw new Error('Wpm should be a string');
  }

  return wpm;
};

const isUserId = (userId: unknown): string => {
  if (!userId || !isString(userId)) {
    throw new Error('Wpm should be a string');
  }

  return userId;
};

const newStatisticEntry = (object: unknown): StatisticWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('wpm' in object && 'userId' in object) {
    const newEntry: StatisticWithoutId = {
      wpm: isWpm(object.wpm),
      userId: isUserId(object.userId),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};
