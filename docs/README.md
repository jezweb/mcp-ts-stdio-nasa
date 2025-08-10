# MCP TypeScript NASA Server Documentation

Welcome to the comprehensive documentation for the MCP TypeScript NASA Server.

## 📚 Documentation Structure

### Getting Started
- [Quick Start Guide](guides/getting-started.md) - Get up and running in minutes
- [Example Queries](guides/examples.md) - Real-world usage examples

### API Reference
- [Tool Documentation](api/tools.md) - Detailed API for all 5 NASA tools

### Architecture
- [System Overview](architecture/overview.md) - Design and architecture details

### Development
- [Development Setup](guides/getting-started.md#development-setup-for-contributors) - For contributors
- [Deployment Guide](development/deployment.md) - Publishing and maintenance

## 🚀 Quick Links

- **npm Package**: https://www.npmjs.com/package/mcp-ts-stdio-nasa
- **GitHub Repository**: https://github.com/jezweb/mcp-ts-stdio-nasa
- **NASA API Portal**: https://api.nasa.gov/
- **MCP Specification**: https://modelcontextprotocol.io/

## 📦 Current Version

- **Version**: 0.1.0
- **Status**: Published and available on npm
- **Last Updated**: 2025-08-10

## 🛠️ Available Tools

1. **nasa_apod** - Astronomy Picture of the Day
2. **nasa_mars_rover_photos** - Mars Rover Photography
3. **nasa_neo_feed** - Near Earth Objects tracking
4. **nasa_donki_space_weather** - Space Weather events
5. **nasa_epic_earth_imagery** - Full Earth imagery

## 💡 Usage

### Quick Test
```bash
npx mcp-ts-stdio-nasa
```

### With Claude Desktop
Add to your Claude Desktop configuration:
```json
{
  "mcpServers": {
    "nasa": {
      "command": "npx",
      "args": ["mcp-ts-stdio-nasa"],
      "env": {
        "NASA_API_KEY": "DEMO_KEY"
      }
    }
  }
}
```

## 📝 License

MIT License - See [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📧 Support

- **Issues**: https://github.com/jezweb/mcp-ts-stdio-nasa/issues
- **Author**: Jez (Jeremy Dawes) - jeremy@jezweb.net
- **Website**: https://www.jezweb.com.au