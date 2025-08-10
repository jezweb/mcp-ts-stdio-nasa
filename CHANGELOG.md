# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-08-10

**🚀 Initial Release - Published to npm**

### Added
- Initial release of MCP TypeScript NASA Server
- STDIO transport support for MCP protocol
- Five NASA API integrations:
  - **APOD (Astronomy Picture of the Day)**: Daily astronomy images with explanations
  - **Mars Rover Photos**: Access photos from Curiosity, Opportunity, Spirit, and Perseverance
  - **NEO Feed (Near Earth Objects)**: Track asteroids passing near Earth
  - **DONKI (Space Weather)**: Monitor solar flares, CMEs, and other space weather events
  - **EPIC (Earth Imagery)**: Full-disc Earth images from DSCOVR satellite
- TypeScript implementation with strict type safety
- Zod schema validation for all tool inputs
- Comprehensive error handling and logging
- NPX support for instant execution
- Environment variable configuration
- Claude Desktop integration support
- MCP Inspector compatibility
- Demo API key support for testing
- Detailed markdown-formatted responses

### Technical Details
- Built with @modelcontextprotocol/sdk v1.0.0
- TypeScript 5.3 with ES2022 target
- Node.js 18+ required
- Full ESLint and Prettier configuration

### Documentation
- Comprehensive README with setup instructions
- Tool documentation with parameter descriptions
- Example queries for each tool
- Claude Desktop configuration guide
- Development setup instructions

### Deployment
- Published to npm registry as `mcp-ts-stdio-nasa`
- Available via npx: `npx mcp-ts-stdio-nasa`
- GitHub repository: https://github.com/jezweb/mcp-ts-stdio-nasa
- Package size: 18.7 kB (packed) / 72.4 kB (unpacked)

[0.1.0]: https://github.com/jezweb/mcp-ts-stdio-nasa/releases/tag/v0.1.0