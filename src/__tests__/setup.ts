// Test setup file
// This file is run before each test suite

// Mock console methods to avoid noise in test output
const consoleMock = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

global.console = consoleMock;

// Set test timeout
jest.setTimeout(10000);