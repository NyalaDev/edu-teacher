export type Role = {
  name: string;
  type: string;
};

export type User = {
  role: Role;
};

export type Profile = {
  name: string;
  user: User;
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

type ResourceType = 'link' | 'exercise';

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

type CourseStatus = 'Published' | 'Draft' | 'Upcoming';
type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Course = {
  id: number;
  title: string;
  level: CourseLevel;
  slug: string;
  status: CourseStatus;
  description: string;
  github_repo: string;
  instructor: Profile;
  lectures: Lecture[];
  language: Language;
  tags: Tag[];
  resources: Resource[];
};
