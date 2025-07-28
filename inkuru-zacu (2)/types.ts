
export type Language = 'rw' | 'en' | 'fr' | 'sw';
export type Theme = 'light' | 'dark';
export type UserRole = 'child' | 'parent' | 'teacher' | 'student';

export interface MultilingualString {
  rw: string;
  en: string;
  fr: string;
  sw: string;
}

export interface Story {
  id: string;
  title: MultilingualString;
  description: MultilingualString;
  coverImage: string;
  content: StorySegment[];
  isFavorite?: boolean;
  isCompleted?: boolean;
}

export interface StorySegment {
  text: MultilingualString;
  image: string;
  audio: string; // URL to audio file
}

export interface Lesson {
  id: string;
  title: MultilingualString;
  category: 'children' | 'adults' | 'health';
  content: string; // Can be more complex later
  isCompleted?: boolean;
}

export interface Comment {
  id: string;
  storyId: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}
