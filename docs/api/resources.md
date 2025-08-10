# Resources API Documentation

This document describes all available resources in the NASA MCP Server v0.2.0+.

## Overview

Resources provide URI-based access to NASA data. They can be static (fixed URIs) or dynamic (URI templates with parameters).

## Static Resources

### `nasa://config`
**Description**: NASA API configuration and status  
**Returns**: JSON object with API configuration

```json
{
  "apiKey": "Configured" | "Using DEMO_KEY",
  "endpoints": { ... },
  "rateLimit": "1000 requests/hour" | "30 requests/hour (DEMO)",
  "version": "0.2.0",
  "capabilities": ["tools", "resources", "prompts"]
}
```

### `nasa://missions/current`
**Description**: List of currently active NASA missions  
**Returns**: JSON object with categorized missions

```json
{
  "mars": [...],
  "space": [...],
  "lunar": [...]
}
```

### `nasa://neo/today`
**Description**: Today's Near-Earth Objects  
**Returns**: JSON object with NEO data

```json
{
  "date": "2024-01-15",
  "element_count": 12,
  "near_earth_objects": [...]
}
```

## Dynamic Resources (URI Templates)

### `nasa://apod/{date}`
**Description**: Astronomy Picture of the Day for specific date  
**Parameters**:
- `date`: Date in YYYY-MM-DD format

**Example**: `nasa://apod/2024-12-25`

**Returns**: JSON object with APOD data
```json
{
  "date": "2024-12-25",
  "title": "...",
  "explanation": "...",
  "url": "...",
  "hdurl": "...",
  "media_type": "image"
}
```

### `nasa://rover/{rover}/latest`
**Description**: Latest photos from specified Mars rover  
**Parameters**:
- `rover`: Rover name (curiosity, perseverance, opportunity, spirit)

**Example**: `nasa://rover/perseverance/latest`

**Returns**: JSON object with recent photos
```json
{
  "rover": "perseverance",
  "count": 5,
  "photos": [...],
  "query_date": "2024-01-15T12:00:00Z"
}
```

## Usage Examples

### In Claude Desktop

```
"Read the resource nasa://config"
"Show me nasa://apod/2024-01-01"
"Get nasa://rover/curiosity/latest"
"Display nasa://missions/current"
"Check nasa://neo/today"
```

### Error Handling

If a resource is not found or an error occurs, the response will include an error field:

```json
{
  "error": "Resource not found: nasa://invalid/path"
}
```

## Implementation Details

Resources are implemented in `/src/resources/` with the following structure:
- Static resources: `static.resource.ts`
- APOD resources: `apod.resource.ts`
- Rover resources: `rover.resource.ts`
- NEO resources: `neo.resource.ts`
- Index: `index.ts` (registration and routing)

## Rate Limiting

Resources respect the same rate limits as tools:
- With API key: 1000 requests/hour
- Demo key: 30 requests/hour