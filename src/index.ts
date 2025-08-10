#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

import { registerTools, handleToolCall } from './tools/index.js';
import { logger } from './utils/logger.js';

dotenv.config();

const server = new Server(
  {
    name: 'mcp-ts-stdio-nasa',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools = registerTools();
  logger.debug(`Registered ${tools.length} tools`);
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    logger.debug(`Tool called: ${request.params.name}`);
    return await handleToolCall(request.params.name, request.params.arguments || {});
  } catch (error) {
    logger.error(`Tool execution failed: ${error}`);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error}`);
  }
});

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('NASA MCP Server started successfully');
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});