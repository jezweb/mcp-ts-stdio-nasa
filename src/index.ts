#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

import { registerTools, handleToolCall } from './tools/index.js';
import { listResources, readResource } from './resources/index.js';
import { listPrompts, getPrompt } from './prompts/index.js';
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
      resources: {},
      prompts: {},
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

// Register resources handler
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = listResources();
  logger.debug(`Registered ${resources.length} resources`);
  return { resources };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  try {
    logger.debug(`Resource requested: ${request.params.uri}`);
    return await readResource(request.params.uri);
  } catch (error) {
    logger.error(`Resource read failed: ${error}`);
    throw new McpError(ErrorCode.InvalidRequest, `Resource read failed: ${error}`);
  }
});

// Register prompts handler
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  const prompts = listPrompts();
  logger.debug(`Registered ${prompts.length} prompts`);
  return { prompts };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  try {
    logger.debug(`Prompt requested: ${request.params.name}`);
    return await getPrompt(request.params.name, request.params.arguments);
  } catch (error) {
    logger.error(`Prompt get failed: ${error}`);
    throw new McpError(ErrorCode.InvalidRequest, `Prompt get failed: ${error}`);
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