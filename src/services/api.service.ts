import axios from 'axios';
import { Config, LocaleStorage } from '../common/constants';
import { Profile, Course, Language, Tag, Lecture } from '../types/api.types';
import {
  CourseFormTypes,
  ImportFormTypes,
  LectureFormTypes,
} from '../types/form.types';
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

export const getCourseDetails = async (slug: string): Promise<Course> => {
  const { data } = await axiosInstance().get(`/teacher/${slug}`);
  return data;
};

export const getLanguages = async (): Promise<Language[]> => {
  const { data } = await axiosInstance().get(`/languages`);
  return data;
};

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await axiosInstance().get('/tags');
  return data;
};

export const saveCourse = async (course: CourseFormTypes): Promise<Course> => {
  const { data } = await axiosInstance().post(`/courses`, course);
  return data;
};

export const updateCourse = async (
  info: CourseFormTypes,
  courseId: number
): Promise<Course> => {
  const { data } = await axiosInstance().put(`/courses/${courseId}`, info);
  return data;
};

export const updateLectures = async (lectures: Lecture[]): Promise<Course> => {
  const { data } = await axiosInstance().put(`/lectures`, lectures);
  return data;
};

export const patchCourse = async (
  info: Partial<Course>,
  courseId: number
): Promise<Course> => {
  const { data } = await axiosInstance().patch(`/courses/${courseId}`, info);
  return data;
};

export const saveLecture = async (
  lecture: LectureFormTypes
): Promise<Lecture> => {
  const { data } = await axiosInstance().post('/lectures', lecture);
  return data;
};

export const importFromYoutube = async (
  payload: ImportFormTypes
): Promise<void> => {
  await axiosInstance().post('/lectures/import', payload);
};

export const deleteLecture = async (id: number): Promise<void> => {
  await axiosInstance().delete(`/lectures/${id}`);
};
