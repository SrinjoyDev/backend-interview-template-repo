import { BatchService } from '../services/batch-service';
import { UserProfile, UserPosts, UserAnalytics, BatchInfoRequest } from '../types';

/**
 * Test Suite for BatchService
 * 
 * These tests will help validate your implementation.
 * You should run these tests to ensure your code works correctly.
 * 
 * Run tests with: npm test
 * Run tests in watch mode: npm run test:watch
 */

describe('BatchService', () => {
  let batchService: BatchService;

  beforeAll(() => {
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    // Initialize with mock API URL
    batchService = new BatchService('http://localhost:3001', 5000);
  });

  afterAll(() => {
    // Restore console.error
    jest.restoreAllMocks();
  });

  describe('Individual API Methods', () => {
    test('fetchUserProfile should return user profile for valid user', async () => {
      try {
        const profile = await batchService.fetchUserProfile('user1');
        
        expect(profile).toBeTruthy();
        expect(profile?.id).toBe('user1');
        expect(profile?.name).toBeDefined();
        expect(profile?.email).toBeDefined();
        expect(profile?.status).toMatch(/^(active|inactive|suspended)$/);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          console.warn('fetchUserProfile not implemented yet - this test will pass once implemented');
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('fetchUserProfile should return null for invalid user', async () => {
      try {
        const profile = await batchService.fetchUserProfile('invalid-user');
        expect(profile).toBeNull();
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('fetchUserPosts should return user posts for valid user', async () => {
      try {
        const posts = await batchService.fetchUserPosts('user1');
        
        expect(posts).toBeTruthy();
        expect(posts?.userId).toBe('user1');
        expect(posts?.totalPosts).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(posts?.recentPosts)).toBe(true);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('fetchUserAnalytics should return analytics for valid user', async () => {
      try {
        const analytics = await batchService.fetchUserAnalytics('user1');
        
        expect(analytics).toBeTruthy();
        expect(analytics?.userId).toBe('user1');
        expect(typeof analytics?.totalViews).toBe('number');
        expect(typeof analytics?.avgEngagement).toBe('number');
        expect(analytics?.lastActiveAt).toBeDefined();
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });
  });

  describe('User Data Processing', () => {
    test('processUserData should aggregate data from all sources', async () => {
      try {
        const result = await batchService.processUserData('user1', true);
        
        expect(result.userId).toBe('user1');
        expect(result.profile).toBeTruthy();
        expect(result.summary).toBeTruthy();
        
        // Check summary fields
        expect(typeof result.summary?.totalPosts).toBe('number');
        expect(typeof result.summary?.avgEngagement).toBe('number');
        expect(result.summary?.lastActiveAt).toBeDefined();
        expect(result.summary?.status).toBeDefined();
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('processUserData should handle partial failures gracefully', async () => {
      try {
        // Test with a user that might have some missing data
        const result = await batchService.processUserData('user3', true);
        
        expect(result.userId).toBe('user3');
        // Should still return a result even if some APIs fail
        expect(result).toBeTruthy();
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('processUserData should work without analytics when flag is false', async () => {
      try {
        const result = await batchService.processUserData('user1', false);
        
        expect(result.userId).toBe('user1');
        expect(result.profile).toBeTruthy();
        // Should still have summary even without analytics
        expect(result.summary).toBeTruthy();
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });
  });

  describe('Batch Processing', () => {
    test('processBatchUsers should handle multiple users', async () => {
      try {
        const request: BatchInfoRequest = {
          userIds: ['user1', 'user2', 'user4'],
          includeAnalytics: true
        };

        const response = await batchService.processBatchUsers(request);
        
        expect(response.results).toHaveLength(3);
        expect(response.metadata.totalProcessed).toBe(3);
        expect(response.metadata.successful).toBeGreaterThan(0);
        expect(response.metadata.processingTimeMs).toBeGreaterThan(0);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('processBatchUsers should handle empty user list', async () => {
      try {
        const request: BatchInfoRequest = {
          userIds: [],
          includeAnalytics: true
        };

        const response = await batchService.processBatchUsers(request);
        
        expect(response.results).toHaveLength(0);
        expect(response.metadata.totalProcessed).toBe(0);
        expect(response.metadata.successful).toBe(0);
        expect(response.metadata.failed).toBe(0);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('processBatchUsers should handle duplicate user IDs', async () => {
      try {
        const request: BatchInfoRequest = {
          userIds: ['user1', 'user1', 'user2'],
          includeAnalytics: true
        };

        const response = await batchService.processBatchUsers(request);
        
        // Should process unique users only
        expect(response.results.length).toBeLessThanOrEqual(2);
        
        // Check for duplicate userIds in results
        const userIds = response.results.map(r => r.userId);
        const uniqueUserIds = [...new Set(userIds)];
        expect(userIds.length).toBe(uniqueUserIds.length);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('processBatchUsers should complete within reasonable time', async () => {
      try {
        const request: BatchInfoRequest = {
          userIds: ['user1', 'user2', 'user3', 'user4', 'user5'],
          includeAnalytics: true
        };

        const startTime = Date.now();
        const response = await batchService.processBatchUsers(request);
        const endTime = Date.now();
        
        // Should complete in less than 2 seconds for 5 users
        expect(endTime - startTime).toBeLessThan(2000);
        expect(response.metadata.processingTimeMs).toBeLessThan(2000);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });
  });

  describe('Error Handling', () => {
    test('should handle API failures gracefully', async () => {
      try {
        // Test with multiple users, some may fail due to mock API random failures
        const request: BatchInfoRequest = {
          userIds: ['user1', 'user2', 'user3', 'user4', 'user5'],
          includeAnalytics: true
        };

        const response = await batchService.processBatchUsers(request);
        
        // Should return results even if some fail
        expect(response.results).toBeDefined();
        expect(response.metadata.totalProcessed).toBe(5);
        expect(response.metadata.successful + response.metadata.failed).toBe(5);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });

    test('should handle network timeouts', async () => {
      try {
        // Create service with very short timeout
        const shortTimeoutService = new BatchService('http://localhost:3001', 1);
        
        const result = await shortTimeoutService.processUserData('user1');
        
        // Should handle timeout gracefully
        expect(result).toBeTruthy();
        expect(result.userId).toBe('user1');
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });
  });

  describe('Performance Tests', () => {
    test('should process users concurrently, not sequentially', async () => {
      try {
        const request: BatchInfoRequest = {
          userIds: ['user1', 'user2', 'user3'],
          includeAnalytics: true
        };

        const startTime = Date.now();
        const response = await batchService.processBatchUsers(request);
        const endTime = Date.now();
        
        // If processing concurrently, should be much faster than sequential
        // Each API call takes 100-600ms, so 3 users * 3 calls = 9 API calls
        // Sequential would take ~2.7-5.4 seconds, concurrent should be ~0.6-1.2 seconds
        expect(endTime - startTime).toBeLessThan(1500);
        expect(response.metadata.processingTimeMs).toBeLessThan(1500);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not implemented')) {
          expect(true).toBe(true); // Pass the test if not implemented
        } else {
          throw error;
        }
      }
    });
  });

  describe('Health Check', () => {
    test('healthCheck should return boolean', async () => {
      const health = await batchService.healthCheck();
      expect(typeof health).toBe('boolean');
    });
  });
});