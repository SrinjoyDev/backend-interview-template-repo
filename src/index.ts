import express from 'express';
import cors from 'cors';
import { BatchService } from './services/batch-service';
import { BatchInfoRequest } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const batchService = new BatchService();

/**
 * TODO: Implement the main endpoint for batch user information processing
 * 
 * POST /users/batch-info
 * 
 * Expected request body:
 * {
 *   "userIds": ["user1", "user2", "user3"],
 *   "includeAnalytics": true,
 *   "maxAge": 300
 * }
 * 
 * This endpoint should:
 * 1. Validate the request body
 * 2. Call the batch service to process users
 * 3. Return the aggregated results
 * 4. Handle errors appropriately
 */
app.post('/users/batch-info', async (req, res) => {
  try {
    // TODO: Implement request validation
    // TODO: Call batchService.processBatchUsers()
    // TODO: Return appropriate response
    // TODO: Handle errors with proper HTTP status codes
    
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

/**
 * Health check endpoint
 */
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

/**
 * Example endpoint to test individual user processing
 */
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

// Start server
app.listen(PORT, () => {
  console.log(` Backend Interview Assessment Server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /users/batch-info - Main assessment endpoint`);
  console.log(`  GET  /users/:id/summary - Test individual user processing`);
  console.log(`  GET  /health - Health check`);
  console.log(`\nYour task: Implement the batch-info endpoint and BatchService methods`);
  console.log(`See README.md for detailed requirements`);
  console.log(`\nDon't forget to start the mock APIs: npm run mock-apis`);
});

export default app;
