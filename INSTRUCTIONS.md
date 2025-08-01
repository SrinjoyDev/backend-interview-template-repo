# Quick Start Instructions

## For Interviewers

### Setup
1. Share this repository with the candidate
2. Ensure they have Node.js 18+ installed
3. Give them 45-60 minutes for the assessment

### Assessment Flow
1. **Introduction (5 mins)**: Explain the challenge and answer questions
2. **Implementation (40-50 mins)**: Candidate works on the solution
3. **Review (5-10 mins)**: Discuss their approach and trade-offs

### Evaluation Checklist
- [ ] Uses Promise.all for concurrent API calls
- [ ] Handles errors gracefully (partial failures)
- [ ] Implements proper TypeScript types
- [ ] Creates working REST endpoint
- [ ] Aggregates data correctly
- [ ] Tests pass
- [ ] Code is clean and readable

### Key Discussion Points
- How did you handle concurrent API calls?
- What's your error handling strategy?
- How would you scale this for 1000+ users?
- What monitoring/observability would you add?

## For Candidates

### Quick Setup
```bash
# Install dependencies
npm install

# Start mock APIs (terminal 1)
npm run mock-apis

# Start development server (terminal 2) 
npm run dev

# Run tests (terminal 3)
npm test
```

### Your Task
Implement the `BatchService` methods and the `/users/batch-info` endpoint.

### Key Requirements
1. Use **Promise.all** for concurrent API calls
2. Handle API failures gracefully
3. Return aggregated user data
4. Complete in 45-60 minutes

### Test Your Solution
```bash
# Check if mock APIs work
curl http://localhost:3001/api/users/user1/profile

# Test your endpoint (after implementation)
curl -X POST http://localhost:3000/users/batch-info \
  -H "Content-Type: application/json" \
  -d '{"userIds": ["user1", "user2"], "includeAnalytics": true}'
```
