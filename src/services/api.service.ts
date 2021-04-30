import axios from 'axios';
import { Config } from '../common/constants';
import { Profile, Course, Language, Tag, Lecture } from '../types/api.types';
import {
  CourseFormTypes,
  ImportFormTypes,
  LectureFormTypes,
} from '../types/form.types';
import { getTokenFromCookie } from './cookie.service';

const axiosInstance = () => {
  const token = getTokenFromCookie();
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

/**
 * Remove unused fields from the api profile
 * @param profile Profile from the api
 * @returns sanatized profile
 */
const sanatizeProfile = (profile: Profile): Profile => {
  const { user } = profile;
  const { role } = user;

  return {
    name: profile.name,
    user: {
      role: {
        name: role.name,
        type: role.type,
      },
    },
  };
};

export const getProfile = async (token: string): Promise<Profile> => {
  const { data } = await axios.get(`${Config.API_URL}/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return sanatizeProfile(data);
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
