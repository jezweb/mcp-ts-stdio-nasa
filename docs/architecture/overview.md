# Architecture Overview

## System Design

The MCP TypeScript NASA Server follows a clean, layered architecture that promotes maintainability, testability, and clear separation of concerns.

```
┌─────────────────────────────────────────┐
│         MCP Client (Claude, etc.)        │
└────────────────┬────────────────────────┘
                 │ STDIO/JSON-RPC
┌────────────────┴────────────────────────┐
│            MCP Server Layer              │
│         (src/index.ts)                   │
│  - Protocol handling                     │
│  - Request/Response management           │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│     Tools, Resources & Prompts Layer     │
│  Tools (src/tools/*.ts)                  │
│  - Tool definitions & validation         │
│  Resources (src/resources/*.ts)          │
│  - URI-based data access                 │
│  Prompts (src/prompts/*.ts)              │
│  - Interaction templates                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│           Service Layer                  │
│      (src/services/nasa.service.ts)      │
│  - NASA API integration                  │
│  - HTTP requests                         │
│  - Error handling                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│           NASA APIs                      │
│  - APOD, Mars Rovers, NEO, DONKI, EPIC  │
└─────────────────────────────────────────┘
```

## Core Components

### 1. MCP Server (`src/index.ts`)

The entry point that:
- Initializes the MCP server with capabilities (tools, resources, prompts)
- Sets up STDIO transport for communication
- Registers request handlers for:
  - Listing and executing tools
  - Listing and reading resources
  - Listing and getting prompts
- Manages the server lifecycle

### 2. Tools Layer (`src/tools/`)

Each tool:
- Defines its MCP-compliant interface
- Validates inputs using Zod schemas
- Calls the service layer for data
- Formats responses as markdown

Tools are self-contained and follow a consistent pattern:
```typescript
export const toolName = {
  definition: Tool,
  handler: async (args) => string
}
```

### 3. Service Layer (`src/services/nasa.service.ts`)

A centralized service that:
- Manages all NASA API interactions
- Handles authentication (API keys)
- Implements error handling and retries
- Provides typed responses

### 4. Type Definitions (`src/types/nasa.ts`)

Comprehensive TypeScript interfaces for:
- NASA API responses
- Internal data structures
- Ensuring type safety across the application

### 5. Utilities (`src/utils/`)

Supporting modules:
- **config.ts**: Environment configuration and URL building
- **logger.ts**: Structured logging with debug support

## Design Principles

### 1. Separation of Concerns

Each layer has a specific responsibility:
- Tools handle MCP protocol specifics
- Services manage external API communication
- Types ensure data consistency

### 2. Type Safety

- Full TypeScript implementation
- Zod for runtime validation
- Strict compiler settings

### 3. Error Handling

```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof NasaApiError) {
    // Handle API errors
  }
  // Log and re-throw with context
}
```

### 4. Configuration Management

- Environment variables for sensitive data
- Fallback to demo values for testing
- Centralized configuration module

## Data Flow

1. **Client Request** → MCP Server receives tool invocation
2. **Validation** → Zod validates input parameters
3. **Service Call** → NASA API request with proper authentication
4. **Response Processing** → Transform API response to user-friendly format
5. **Markdown Generation** → Format data as readable markdown
6. **Client Response** → Return formatted text to MCP client

## Security Considerations

- API keys stored in environment variables
- No sensitive data in logs
- Input validation on all user inputs
- Rate limiting awareness

## Extensibility

Adding new NASA APIs is straightforward:

1. Add types to `src/types/nasa.ts`
2. Add service method to `nasa.service.ts`
3. Create new tool in `src/tools/`
4. Register in `src/tools/index.ts`

The architecture supports:
- Additional NASA endpoints
- New response formats
- Enhanced error handling
- Caching mechanisms (future)