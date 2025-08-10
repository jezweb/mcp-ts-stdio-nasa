# MCP TypeScript NASA Server

[![npm version](https://img.shields.io/npm/v/mcp-ts-stdio-nasa.svg)](https://www.npmjs.com/package/mcp-ts-stdio-nasa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Version](https://img.shields.io/badge/MCP-1.0.0-blue)](https://modelcontextprotocol.io)

A TypeScript-based MCP (Model Context Protocol) server that provides seamless integration with NASA's public APIs, enabling AI assistants to access space and astronomy data including APOD, Mars rover photos, Near-Earth Objects, space weather, and Earth imagery.

## 🌟 Features

- **🚀 5 NASA API Integrations**: APOD, Mars Rovers, NEO Feed, DONKI Space Weather, EPIC Earth Imagery
- **📦 NPX Ready**: Run instantly with `npx mcp-ts-stdio-nasa`
- **🔧 Type-Safe**: Full TypeScript implementation with Zod validation
- **🎯 MCP Compliant**: Follows Model Context Protocol specification
- **⚡ Easy Setup**: Works with Claude Desktop and other MCP clients
- **🔑 API Key Support**: Use your own NASA API key or the demo key

## 🚀 Quick Start

### Run with NPX (No Installation)

```bash
npx mcp-ts-stdio-nasa
```

### Install Globally

```bash
npm install -g mcp-ts-stdio-nasa
mcp-ts-stdio-nasa
```

### Install as Dependency

```bash
npm install mcp-ts-stdio-nasa
```

## 🔧 Configuration

### Claude Desktop Setup

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "nasa": {
      "command": "npx",
      "args": ["mcp-ts-stdio-nasa"],
      "env": {
        "NASA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Environment Variables

Create a `.env` file in your project root:

```env
# NASA API Configuration
NASA_API_KEY=your_api_key_here  # Get from https://api.nasa.gov/
# Use "DEMO_KEY" for testing with rate limits

# Optional
DEBUG=false  # Enable debug logging
```

## 🛠️ Available Tools

### 1. `nasa_apod` - Astronomy Picture of the Day

Get NASA's daily featured astronomy image with detailed explanation.

**Parameters:**
- `date` (optional): Date in YYYY-MM-DD format

**Example Query:**
```
"Show me NASA's astronomy picture from January 1, 2024"
```

### 2. `nasa_mars_rover_photos` - Mars Rover Photography

Fetch photos from Mars rovers including Curiosity, Opportunity, Spirit, and Perseverance.

**Parameters:**
- `rover`: Rover name (curiosity, opportunity, spirit, perseverance)
- `sol` (optional): Martian day
- `earth_date` (optional): Earth date in YYYY-MM-DD
- `camera` (optional): Camera type (FHAZ, RHAZ, NAVCAM, etc.)
- `limit`: Maximum photos to return (1-25)

**Example Query:**
```
"Get recent photos from Perseverance rover's navigation camera"
```

### 3. `nasa_neo_feed` - Near Earth Objects

Track asteroids and comets passing near Earth.

**Parameters:**
- `start_date` (optional): Start date in YYYY-MM-DD
- `end_date` (optional): End date in YYYY-MM-DD

**Example Query:**
```
"Show me potentially hazardous asteroids passing Earth this week"
```

### 4. `nasa_donki_space_weather` - Space Weather Events

Monitor solar flares, coronal mass ejections, and other space weather phenomena.

**Parameters:**
- `event_type`: Event type (FLR, SEP, CME, IPS, MPC, GST, RBE)
- `start_date` (optional): Start date
- `end_date` (optional): End date

**Event Types:**
- `FLR`: Solar Flare
- `SEP`: Solar Energetic Particle
- `CME`: Coronal Mass Ejection
- `IPS`: Interplanetary Shock
- `MPC`: Magnetopause Crossing
- `GST`: Geomagnetic Storm
- `RBE`: Radiation Belt Enhancement

**Example Query:**
```
"Check for solar flares in the last week"
```

### 5. `nasa_epic_earth_imagery` - Earth Polychromatic Imaging

Get full-disc Earth images from the DSCOVR satellite.

**Parameters:**
- `image_type`: natural or enhanced
- `date` (optional): Date in YYYY-MM-DD
- `limit`: Maximum images (1-20)

**Example Query:**
```
"Show me recent full Earth images from space"
```

## 💻 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/jezweb/mcp-ts-stdio-nasa.git
cd mcp-ts-stdio-nasa

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run clean` - Clean build artifacts
- `npm run dev` - Watch mode for development
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run mcp:inspect` - Test with MCP Inspector

### Testing with MCP Inspector

```bash
npm run build
npm run mcp:inspect
```

This opens the MCP Inspector for interactive testing of all tools.

## 📚 Project Structure

```
mcp-ts-stdio-nasa/
├── src/
│   ├── index.ts           # Main server entry point
│   ├── tools/             # NASA API tool implementations
│   │   ├── apod.tool.ts
│   │   ├── mars-rover.tool.ts
│   │   ├── neo.tool.ts
│   │   ├── donki.tool.ts
│   │   └── epic.tool.ts
│   ├── services/          # NASA API service layer
│   │   └── nasa.service.ts
│   ├── types/             # TypeScript type definitions
│   │   └── nasa.ts
│   └── utils/             # Utility functions
│       ├── config.ts
│       └── logger.ts
├── dist/                  # Compiled JavaScript
├── docs/                  # Documentation
├── package.json
└── tsconfig.json
```

## 🌐 NASA API Information

This server uses NASA's public APIs. You can:
- Use `DEMO_KEY` for testing (limited rate)
- Get a free API key at [https://api.nasa.gov/](https://api.nasa.gov/)
- Most endpoints allow 1000 requests/hour with an API key

### API Documentation

- [NASA API Portal](https://api.nasa.gov/)
- [APOD API](https://github.com/nasa/apod-api)
- [Mars Rover Photos API](https://github.com/chrisccerami/mars-photo-api)
- [NEO API](https://api.nasa.gov/#NeoWS)
- [DONKI API](https://api.nasa.gov/#DONKI)
- [EPIC API](https://api.nasa.gov/#EPIC)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NASA](https://www.nasa.gov/) for providing public APIs
- [Anthropic](https://anthropic.com/) for the MCP specification
- [Model Context Protocol](https://modelcontextprotocol.io/) community

## 📧 Contact

**Author**: Jez (Jeremy Dawes)  
**Email**: jeremy@jezweb.net  
**Website**: [www.jezweb.com.au](https://www.jezweb.com.au)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/mcp-ts-stdio-nasa)
- [GitHub Repository](https://github.com/jezweb/mcp-ts-stdio-nasa)
- [Issue Tracker](https://github.com/jezweb/mcp-ts-stdio-nasa/issues)

---

Made with ❤️ for the space and AI communities