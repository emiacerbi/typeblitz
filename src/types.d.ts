import { Session, Statistic, User } from '@prisma/client';

export type Session = {
  user: User;
  expires: string;
};

export type StatisticWithoutId = Omit<Statistic, 'id'>;
