import axios from 'axios';
import { Config, LocaleStorage } from '../common/constants';
import { Profile, Course, Language } from '../types/api.types';
import { getLocalStorage } from './storage.service';

const axiosInstance = () => {
  const token = getLocalStorage(LocaleStorage.AUTH_TOKEN);
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const params = {
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {},
  };
  if (headers) {
    params.headers = headers;
  }
  return axios.create(params);
};

export const getProfile = async (token: string): Promise<Profile> => {
  const { data } = await axios.get(`${Config.API_URL}/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getCourses = async (): Promise<[Course]> => {
  const { data } = await axiosInstance().get(
    `/teacher?_sort=status:asc,created_at:desc`
  );
  return data;
};

export const saveCourse = async (course: any): Promise<void> =>
  axiosInstance().post(`/courses`, course);

export const getLanguages = async (): Promise<[Language]> => {
  const { data } = await axiosInstance().get(`/languages`);
  return data;
};
