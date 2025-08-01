import axios from 'axios';
import { 
  UserProfile, 
  UserPosts, 
  UserAnalytics, 
  UserSummary, 
  BatchInfoResponse, 
  BatchInfoRequest,
  MockApiResponse 
} from '../types';

/**
 * Multi-Source Data Aggregator Service
 * 
 * TODO: Implement the following methods to complete the assessment:
 * 1. fetchUserProfile - Fetch user profile from mock API
 * 2. fetchUserPosts - Fetch user posts from mock API  
 * 3. fetchUserAnalytics - Fetch user analytics from mock API
 * 4. processUserData - Combine data from all sources for a single user
 * 5. processBatchUsers - Process multiple users efficiently using Promise.all
 * 
 * REQUIREMENTS:
 * - Use Promise.all for concurrent API calls
 * - Handle errors gracefully (partial failures should not break the entire batch)
 * - Implement proper error handling and logging
 * - Calculate processing time metrics
 * - Support request timeouts
 * 
 * BONUS POINTS:
 * - Implement retry logic for failed requests
 * - Add request deduplication for duplicate user IDs
 */

export class BatchService {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl: string = 'http://localhost:3001', timeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * TODO: Implement this method
   * Fetch user profile from the mock API
   * 
   * @param userId - The user ID to fetch profile for
   * @returns Promise<UserProfile | null> - User profile or null if failed
   */
  async fetchUserProfile(userId: string): Promise<UserProfile | null> {
    // TODO: Implement API call to /api/users/:id/profile
    // Handle errors and return null if failed
    // Use axios with timeout configuration
    
    throw new Error('fetchUserProfile not implemented');
  }

  /**
   * TODO: Implement this method
   * Fetch user posts from the mock API
   * 
   * @param userId - The user ID to fetch posts for
   * @returns Promise<UserPosts | null> - User posts or null if failed
   */
  async fetchUserPosts(userId: string): Promise<UserPosts | null> {
    // TODO: Implement API call to /api/users/:id/posts
    // Handle errors and return null if failed
    
    throw new Error('fetchUserPosts not implemented');
  }

  /**
   * TODO: Implement this method
   * Fetch user analytics from the mock API
   * 
   * @param userId - The user ID to fetch analytics for
   * @returns Promise<UserAnalytics | null> - User analytics or null if failed
   */
  async fetchUserAnalytics(userId: string): Promise<UserAnalytics | null> {
    // TODO: Implement API call to /api/users/:id/analytics
    // Handle errors and return null if failed
    
    throw new Error('fetchUserAnalytics not implemented');
  }

  /**
   * TODO: Implement this method
   * Process data for a single user by fetching from all sources concurrently
   * 
   * @param userId - The user ID to process
   * @param includeAnalytics - Whether to include analytics data
   * @returns Promise<UserSummary> - Processed user data
   */
  async processUserData(userId: string, includeAnalytics: boolean = true): Promise<UserSummary> {
    // TODO: Use Promise.all to fetch profile, posts, and analytics concurrently
    // TODO: Combine the data into a UserSummary object
    // TODO: Handle partial failures gracefully
    // TODO: Calculate derived metrics (avgEngagement, status, etc.)
    
    throw new Error('processUserData not implemented');
  }

  /**
   * TODO: Implement this method
   * Process multiple users efficiently using batch operations
   * 
   * @param request - Batch request containing user IDs and options
   * @returns Promise<BatchInfoResponse> - Aggregated results with metadata
   */
  async processBatchUsers(request: BatchInfoRequest): Promise<BatchInfoResponse> {
    const startTime = Date.now();
    
    // TODO: Validate input (remove duplicates, handle empty arrays, etc.)
    // TODO: Use Promise.all to process all users concurrently
    // TODO: Calculate success/failure metrics
    // TODO: Return results with metadata including processing time
    
    throw new Error('processBatchUsers not implemented');
  }

  /**
   * BONUS: Implement retry logic for failed requests
   * 
   * @param fn - Function to retry
   * @param maxRetries - Maximum number of retries
   * @param delay - Delay between retries in ms
   */
  private async withRetry<T>(
    fn: () => Promise<T>, 
    maxRetries: number = 3, 
    delay: number = 1000
  ): Promise<T> {
    // TODO: Implement retry logic with exponential backoff
    throw new Error('withRetry not implemented');
  }

  /**
   * BONUS: Health check for the service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, { 
        timeout: this.timeout 
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}