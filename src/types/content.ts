import type { Profile } from "./profile";

export type Status = 'active' | 'archived' | 'wip' | 'planned';

export interface Tag {
  id: string;
  label: string;
  profile: Profile[];
  category: string;
}

export interface LinkedResource {
  type: 'external' | 'project' | 'article' | 'certification' | 'experience' | 'education';
  id?: string;
  label: string;
  url?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  profile: Profile[];
  status: Status;
  tags: string[];
  techs: string[];
  links?: {
    code?: string;
    download?: string;
    live?: string;
    demo?: string;
  };
  team?: { name: string; role: string; url?: string }[];
  tasks?: string[];
  learnings?: string[];
  history?: { date: string; event: string }[];
  resources?: LinkedResource[];
  featured?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Skill {
  id: string;
  slug: string;
  label: string;
  category: string;
  profile: Profile[];
  level?: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  description?: string;
  tasks?: string[];
  mentor?: { name: string; url?: string };
  history?: { date: string; event: string }[];
  learnings?: string[];
  resources?: LinkedResource[];
}

export interface Education {
  id: string;
  slug: string;
  label: string;
  school: string;
  schoolUrl?: string;
  startDate: string;
  endDate: string | 'present';
  isAlternance: boolean;
  hasInternship: boolean;
  internshipDuration?: string;
  profile: Profile[];
  description?: string;
  location?: string;
  tasks?: string[];
  mentors?: { name: string; role: string; url?: string }[];
  learnings?: string[];
  history?: { date: string; event: string }[];
  resources?: LinkedResource[];
}

export interface Experience {
  id: string;
  slug: string;
  label: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string | 'present';
  isAlternance: boolean;
  isInternship: boolean;
  internshipDuration?: string;
  profile: Profile[];
  description?: string;
  location?: string;
  tasks?: string[];
  mentors?: { name: string; role: string; url?: string }[];
  learnings?: string[];
  history?: { date: string; event: string }[];
  resources?: LinkedResource[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  profile: Profile[];
  status: Status;
  tags: string[];
  content?: string;
  publishDate?: string;
  team?: { name: string; role: string }[];
  history?: { date: string; event: string }[];
  resources?: LinkedResource[];
  links?: {
    download?: string;
    live?: string;
  };
}

export interface OtherSite {
  id: string;
  slug: string;
  title: string;
  description: string;
  profile: Profile[];
  status: Status;
  tags: string[];
  url?: string;
  resources?: LinkedResource[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  profile: Profile[];
  date: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'project' | 'skill' | 'education' | 'experience' | 'article' | 'update';
  profile: Profile[];
  link?: string;
}