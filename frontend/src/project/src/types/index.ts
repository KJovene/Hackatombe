export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url?: string;
  type: 'article' | 'video' | 'podcast';
  level: 'beginner' | 'intermediate' | 'expert';
  user_id: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  resource_id: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'design' | 'other';
}

export interface ViewMode {
  type: 'timeline' | 'grid';
}

export interface ThemeMode {
  isDark: boolean;
}