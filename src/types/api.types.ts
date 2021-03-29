export type Profile = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  tagName: string;
  tagSlug: string;
};

export type Language = {
  id: number;
  iso2: string;
  name: string;
};

// type ResourceType = 'link' | 'Something else'
type ResourceType = 'link';

export type Resource = {
  url?: string;
  text: string;
  type: ResourceType;
};

export type Lecture = {
  id: number;
  title: string;
  description?: string;
  url: string;
  duration: string;
  position: number;
};

type CourseStatus = 'Published' | 'Draft' | 'Coming Soon';
export type Course = {
  id: number;
  title: string;
  level: string;
  slug: string;
  status: CourseStatus;
  description: string;
  github_repo: string;
  instructor: Profile;
  lectures: [Lecture];
  language: Language;
  tags: [Tag];
  resources: [Resource];
};
