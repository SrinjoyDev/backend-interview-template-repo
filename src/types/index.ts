// Type definitions for the Multi-Source Data Aggregator Assessment

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface UserPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface UserPosts {
  userId: string;
  totalPosts: number;
  recentPosts: UserPost[];
}

export interface UserAnalytics {
  userId: string;
  totalViews: number;
  avgEngagement: number;
  lastActiveAt: string;
  topCategories: string[];
}

export interface BatchInfoRequest {
  userIds: string[];
  includeAnalytics?: boolean;
  maxAge?: number; // Cache max age in seconds
}

export interface UserSummary {
  userId: string;
  profile: UserProfile | null;
  summary: {
    totalPosts: number;
    avgEngagement: number;
    lastActiveAt: string;
    status: string;
  } | null;
  error?: string;
}

export interface BatchInfoResponse {
  results: UserSummary[];
  metadata: {
    totalProcessed: number;
    successful: number;
    failed: number;
    processingTimeMs: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

// Mock API Response types
export interface MockApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}