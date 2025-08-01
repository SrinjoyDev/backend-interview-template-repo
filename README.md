# Backend Developer Interview Assessment

## Multi-Source Data Aggregator Challenge

Welcome to our backend developer assessment! This challenge tests your ability to build efficient, scalable backend services that aggregate data from multiple sources using modern JavaScript/TypeScript patterns.

## 📋 Overview

You need to implement a service that:
- Fetches user data from multiple mock APIs concurrently
- Aggregates and processes the data efficiently
- Handles errors gracefully
- Provides metrics and monitoring capabilities

## 🎯 Assessment Goals

This assessment evaluates your skills in:
- **Asynchronous Programming**: Promise.all, async/await mastery
- **Error Handling**: Graceful failure management and partial success scenarios
- **Performance Optimization**: Concurrent processing and batch operations
- **API Design**: RESTful endpoints and proper HTTP status codes
- **Code Quality**: TypeScript usage, clean architecture, and maintainability
- **Testing**: Unit tests and integration testing practices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Basic knowledge of TypeScript and Express.js

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the mock APIs (in a separate terminal):
   ```bash
   npm run mock-apis
   ```
   The mock APIs will run on `http://localhost:3001`

3. Start the development server:
   ```bash
   npm run dev
   ```
   Your service will run on `http://localhost:3000`

4. Run tests to see what needs to be implemented:
   ```bash
   npm test
   ```

## 📚 Mock APIs Available

The following mock APIs are provided for testing:

- `GET /api/users/:id/profile` - User basic information
- `GET /api/users/:id/posts` - User posts and content metrics  
- `GET /api/users/:id/analytics` - User engagement analytics

**Available Test Users**: `user1`, `user2`, `user3`, `user4`, `user5`

**API Characteristics**:
- Random response delays (100-600ms) to simulate real network conditions
- 10% random failure rate to test error handling
- Various HTTP error codes (404, 500, 502, 503)

## 🎯 Your Tasks

### Core Implementation (Required)

#### 1. Implement BatchService Methods
In `src/services/batch-service.ts`, implement:

- `fetchUserProfile(userId)` - Fetch user profile from mock API
- `fetchUserPosts(userId)` - Fetch user posts from mock API  
- `fetchUserAnalytics(userId)` - Fetch user analytics from mock API
- `processUserData(userId, includeAnalytics)` - Aggregate data for single user using **Promise.all**
- `processBatchUsers(request)` - Process multiple users concurrently

#### 2. Implement Main API Endpoint
In `src/index.ts`, implement:

- `POST /users/batch-info` - Main assessment endpoint

### Expected Request/Response Format

#### Request
```json
POST /users/batch-info
{
  "userIds": ["user1", "user2", "user3"],
  "includeAnalytics": true,
  "maxAge": 300
}
```

#### Response
```json
{
  "results": [
    {
      "userId": "user1",
      "profile": {
        "id": "user1",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "status": "active"
      },
      "summary": {
        "totalPosts": 25,
        "avgEngagement": 4.2,
        "lastActiveAt": "2024-01-15T10:30:00Z",
        "status": "active"
      }
    }
  ],
  "metadata": {
    "totalProcessed": 3,
    "successful": 2,
    "failed": 1,
    "processingTimeMs": 850
  }
}
```

### Bonus Features (Optional)

Implement these for extra credit:

- **Retry Logic**: Retry failed requests with exponential backoff
- **Request Deduplication**: Handle duplicate user IDs in the request
- **Circuit Breaker**: Prevent cascade failures when APIs are down
- **Caching**: Cache responses to improve performance
- **Rate Limiting**: Respect external API rate limits
- **Streaming**: Support streaming responses for large batches

## ✅ Evaluation Criteria

### Functionality (40%)
- [ ] All required methods implemented correctly
- [ ] Main API endpoint works as specified
- [ ] Proper use of Promise.all for concurrent operations
- [ ] Correct data aggregation and transformation

### Error Handling (25%)
- [ ] Graceful handling of API failures
- [ ] Partial success scenarios handled properly
- [ ] Appropriate HTTP status codes and error messages
- [ ] Network timeouts and edge cases covered

### Performance (20%)
- [ ] Concurrent processing implementation
- [ ] Reasonable response times (< 2 seconds for 5 users)
- [ ] Efficient memory usage
- [ ] No unnecessary sequential operations

### Code Quality (15%)
- [ ] Clean, readable TypeScript code
- [ ] Proper type definitions usage
- [ ] Good separation of concerns
- [ ] Meaningful variable and function names
- [ ] Appropriate error logging

## 🧪 Testing

Run the test suite to validate your implementation:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

### Test Categories
- **Unit Tests**: Individual method functionality
- **Integration Tests**: API endpoint behavior
- **Performance Tests**: Concurrent processing validation
- **Error Handling Tests**: Failure scenario coverage

## 📊 Success Metrics

Your implementation should achieve:
- ✅ All unit tests passing
- ✅ Batch processing < 1.5 seconds for 5 users
- ✅ Graceful handling of at least 80% success rate with random failures
- ✅ Proper TypeScript types and no compilation errors
- ✅ Clean, maintainable code structure

## 🔧 Debugging Tips

1. **Check Mock APIs**: Ensure mock APIs are running on port 3001
2. **Network Issues**: Use `curl` to test mock APIs directly
3. **Timeout Issues**: Adjust timeout values in BatchService constructor
4. **Test Failures**: Read test descriptions carefully for requirements

## 📝 Submission Guidelines

1. Implement all required functionality
2. Ensure all tests pass
3. Add any additional tests you think are valuable
4. Include brief comments explaining your approach
5. Document any assumptions or design decisions

## 🎓 Learning Resources

- [Promise.all Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Async/Await Best Practices](https://javascript.info/async-await)
- [Error Handling in Node.js](https://nodejs.org/api/errors.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
