export const LocaleStorage = {
  DEFAULT_LANGUAGE: 'edu-admin:siteLang',
  AUTH_TOKEN: 'edu-admin:authToken',
  USER_INFO: 'edu-admin:user',
};

export const appLanguages = [
  {
    label: 'العربية',
    locale: 'ar',
    icon: 'sd.svg',
  },
  {
    label: 'English',
    locale: 'en',
    icon: 'au.svg',
  },
  {
    label: 'አማርኛ',
    locale: 'am',
    icon: 'et.svg',
  },
  {
    label: 'Swahili',
    locale: 'sw',
    icon: 'sw.svg',
  },
];

export const Config = {
  API_URL: process.env.REACT_APP_STRAPI_API,
  FRONT_END_URL: process.env.REACT_APP_FRONT_END_URL || '',
};

export const CourseLevels = ['Beginner', 'Intermediate', 'Advanced'];

export const ResourceTypes = ['exercise', 'link'];
