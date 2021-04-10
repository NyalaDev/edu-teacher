export type CourseFormTypes = {
  title: string;
  slug: string;
  description: string;
  github_repo: string;
  language: number;
  level: string;
};

export type LectureFormTypes = {
  title: string;
  url: string;
  description?: string;
  course: number;
};

export type ImportFormTypes = {
  url: string;
  course: number;
};
