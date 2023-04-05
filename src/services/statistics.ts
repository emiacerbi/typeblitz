import { StatisticWithoutId } from '@/types';
import { Statistic } from '@prisma/client';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/statistics';

const getAll = async () => {
  const response = await axios.get<Statistic>(baseUrl);
  return response.data;
};

const create = async (newObj: StatisticWithoutId) => {
  const response = await axios.post<Statistic>(baseUrl, newObj);
  return response.data;
};

export const statisticService = {
  getAll,
  create,
};
