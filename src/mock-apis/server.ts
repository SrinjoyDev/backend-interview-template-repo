import express from 'express';
import cors from 'cors';
import { UserProfile, UserPosts, UserAnalytics, UserPost } from '../types';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock data
const mockUsers: Record<string, UserProfile> = {
  'user1': { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com', joinedAt: '2023-01-15T10:00:00Z', status: 'active' },
  'user2': { id: 'user2', name: 'Bob Smith', email: 'bob@example.com', joinedAt: '2023-02-20T14:30:00Z', status: 'active' },
  'user3': { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', joinedAt: '2023-03-10T09:15:00Z', status: 'inactive' },
  'user4': { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', joinedAt: '2023-04-05T16:45:00Z', status: 'active' },
  'user5': { id: 'user5', name: 'Eve Wilson', email: 'eve@example.com', joinedAt: '2023-05-12T11:20:00Z', status: 'suspended' },
};

const mockPosts: Record<string, UserPost[]> = {
  'user1': [
    { id: 'post1', title: 'Getting Started with Node.js', content: 'A comprehensive guide...', createdAt: '2024-01-10T10:00:00Z', likes: 25, comments: 5 },
    { id: 'post2', title: 'TypeScript Best Practices', content: 'Learn how to...', createdAt: '2024-01-12T14:00:00Z', likes: 40, comments: 8 }
  ],
  'user2': [
    { id: 'post3', title: 'API Design Patterns', content: 'REST vs GraphQL...', createdAt: '2024-01-08T09:00:00Z', likes: 30, comments: 12 }
  ],
  'user3': [],
  'user4': [
    { id: 'post4', title: 'Database Optimization', content: 'Query performance...', createdAt: '2024-01-05T16:00:00Z', likes: 55, comments: 15 },
    { id: 'post5', title: 'Microservices Architecture', content: 'Scaling applications...', createdAt: '2024-01-15T12:00:00Z', likes: 70, comments: 20 }
  ],
  'user5': [
    { id: 'post6', title: 'Security Best Practices', content: 'Protecting your apps...', createdAt: '2024-01-03T08:00:00Z', likes: 35, comments: 7 }
  ]
};

const mockAnalytics: Record<string, UserAnalytics> = {
  'user1': { userId: 'user1', totalViews: 1250, avgEngagement: 4.2, lastActiveAt: '2024-01-15T10:30:00Z', topCategories: ['development', 'tutorial'] },
  'user2': { userId: 'user2', totalViews: 890, avgEngagement: 3.8, lastActiveAt: '2024-01-14T15:45:00Z', topCategories: ['api', 'design'] },
  'user3': { userId: 'user3', totalViews: 120, avgEngagement: 1.2, lastActiveAt: '2023-12-20T09:00:00Z', topCategories: ['beginner'] },
  'user4': { userId: 'user4', totalViews: 2100, avgEngagement: 5.1, lastActiveAt: '2024-01-16T18:20:00Z', topCategories: ['database', 'performance'] },
  'user5': { userId: 'user5', totalViews: 450, avgEngagement: 2.9, lastActiveAt: '2024-01-10T12:15:00Z', topCategories: ['security'] },
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random failures (10% chance)
const shouldFail = () => Math.random() < 0.1;

// User Profile API
app.get('/api/users/:id/profile', async (req, res) => {
  await delay(Math.random() * 200 + 100); // 100-300ms delay
  
  if (shouldFail()) {
    return res.status(500).json({ error: 'Internal server error', code: 'PROFILE_SERVICE_ERROR' });
  }
  
  const { id } = req.params;
  const user = mockUsers[id];
  
  if (!user) {
    return res.status(404).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
  }
  
  res.json({ data: user, status: 200 });
});

// User Posts API
app.get('/api/users/:id/posts', async (req, res) => {
  await delay(Math.random() * 300 + 150); // 150-450ms delay
  
  if (shouldFail()) {
    return res.status(503).json({ error: 'Service temporarily unavailable', code: 'POSTS_SERVICE_ERROR' });
  }
  
  const { id } = req.params;
  const posts = mockPosts[id] || [];
  
  const userPosts: UserPosts = {
    userId: id,
    totalPosts: posts.length,
    recentPosts: posts.slice(0, 3) // Return only recent 3 posts
  };
  
  res.json({ data: userPosts, status: 200 });
});

// User Analytics API
app.get('/api/users/:id/analytics', async (req, res) => {
  await delay(Math.random() * 400 + 200); // 200-600ms delay
  
  if (shouldFail()) {
    return res.status(502).json({ error: 'Bad gateway', code: 'ANALYTICS_SERVICE_ERROR' });
  }
  
  const { id } = req.params;
  const analytics = mockAnalytics[id];
  
  if (!analytics) {
    return res.status(404).json({ error: 'Analytics not found', code: 'ANALYTICS_NOT_FOUND' });
  }
  
  res.json({ data: analytics, status: 200 });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock APIs running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/users/:id/profile`);
  console.log(`  GET /api/users/:id/posts`);
  console.log(`  GET /api/users/:id/analytics`);
  console.log(`  GET /health`);
});

export default app;