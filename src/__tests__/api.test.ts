import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { BatchService } from '../services/batch-service';
import { BatchInfoRequest } from '../types';

// Create a test app instance instead of importing the main app
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  const batchService = new BatchService();

  app.post('/users/batch-info', async (req, res) => {
    try {
      res.status(501).json({
        error: 'Not implemented',
        message: 'Please implement the batch-info endpoint'
      });
    } catch (error) {
      console.error('Error processing batch request:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred'
      });
    }
  });

  app.get('/health', async (req, res) => {
    try {
      const serviceHealthy = await batchService.healthCheck();
      
      if (serviceHealthy) {
        res.json({ 
          status: 'OK', 
          timestamp: new Date().toISOString(),
          services: { mockApi: 'healthy' }
        });
      } else {
        res.status(503).json({ 
          status: 'Service Unavailable', 
          timestamp: new Date().toISOString(),
          services: { mockApi: 'unhealthy' }
        });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'Error', 
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      });
    }
  });

  app.get('/users/:id/summary', async (req, res) => {
    try {
      const { id } = req.params;
      const includeAnalytics = req.query.includeAnalytics !== 'false';
      
      const result = await batchService.processUserData(id, includeAnalytics);
      res.json(result);
    } catch (error) {
      console.error(`Error processing user ${req.params.id}:`, error);
      res.status(500).json({
        error: 'Failed to process user data',
        userId: req.params.id
      });
    }
  });

  return app;
};

/**
 * Integration Tests for the Main API
 * 
 * These tests validate the HTTP endpoints and overall system integration.
 */

describe('API Integration Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('POST /users/batch-info', () => {
    test('should return 501 until implemented', async () => {
      const requestBody: BatchInfoRequest = {
        userIds: ['user1', 'user2'],
        includeAnalytics: true
      };

      const response = await request(app)
        .post('/users/batch-info')
        .send(requestBody)
        .expect(501);

      expect(response.body.error).toBe('Not implemented');
    });

    // These tests will pass once the endpoint is implemented
    test.skip('should process batch request successfully', async () => {
      const requestBody: BatchInfoRequest = {
        userIds: ['user1', 'user2'],
        includeAnalytics: true
      };

      const response = await request(app)
        .post('/users/batch-info')
        .send(requestBody)
        .expect(200);

      expect(response.body.results).toBeDefined();
      expect(response.body.metadata).toBeDefined();
      expect(response.body.results).toHaveLength(2);
    });

    test.skip('should validate request body', async () => {
      const invalidRequest = {
        userIds: 'not-an-array',
        includeAnalytics: 'not-a-boolean'
      };

      await request(app)
        .post('/users/batch-info')
        .send(invalidRequest)
        .expect(400);
    });

    test.skip('should handle empty user list', async () => {
      const requestBody: BatchInfoRequest = {
        userIds: [],
        includeAnalytics: true
      };

      const response = await request(app)
        .post('/users/batch-info')
        .send(requestBody)
        .expect(200);

      expect(response.body.results).toHaveLength(0);
      expect(response.body.metadata.totalProcessed).toBe(0);
    });
  });

  describe('GET /users/:id/summary', () => {
    test('should return 500 until BatchService is implemented', async () => {
      await request(app)
        .get('/users/user1/summary')
        .expect(500);
    });

    test.skip('should return user summary when implemented', async () => {
      const response = await request(app)
        .get('/users/user1/summary')
        .expect(200);

      expect(response.body.userId).toBe('user1');
      expect(response.body.profile).toBeDefined();
      expect(response.body.summary).toBeDefined();
    });

    test.skip('should support includeAnalytics query parameter', async () => {
      const response = await request(app)
        .get('/users/user1/summary?includeAnalytics=false')
        .expect(200);

      expect(response.body.userId).toBe('user1');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBeDefined();
      expect(response.body.timestamp).toBeDefined();
    });
  });
});