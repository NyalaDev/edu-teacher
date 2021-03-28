import axios from 'axios';
import { Config } from '../common/constants';
import { ApiProfile } from '../types/api.types';

export const getUser = async () => {};

export const getProfile = async (token: string): Promise<ApiProfile> => {
  const { data } = await axios.get(`${Config.API_URL}/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
