import { Duration } from 'luxon';
import { appLanguages } from './constants';

const getYoutubeVideoId = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const EXTRACT_YOUTUBE_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(EXTRACT_YOUTUBE_REGEX);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return null;
};

export const getYoutubeThumbnail = (url: string): string => {
  try {
    const videoId = getYoutubeVideoId(url);
    return videoId
      ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      : 'https://cdn.nyaladev.com/barmaga.io/nyala-placeholder.png';
  } catch (e) {
    return 'https://cdn.nyaladev.com/barmaga.io/nyala-placeholder.png';
  }
};

export const getLocalisedLanguageName = (locale: string): string => {
  const language = appLanguages.find(lang => lang.locale === locale);
  return language ? language.label : '';
};

export const extractErrorMessage = (err: any): string => {
  try {
    const { response } = err;
    const { data } = response;
    return data.message;
  } catch (error) {
    return 'Something went wrong';
  }
};

export const formatDuration = (duration: string, format = 'hh:mm:ss'): string =>
  Duration.fromISO(duration).toFormat(format);
