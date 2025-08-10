# Getting Started

This guide will help you get the MCP TypeScript NASA Server up and running in minutes.

## Prerequisites

- **Node.js** version 18 or higher
- **npm** package manager (comes with Node.js)
- (Optional) NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

## Quick Start (NPX) - Recommended

The fastest and easiest way to use the server:

```bash
npx mcp-ts-stdio-nasa
```

This command downloads and runs the latest version directly from npm. No installation needed!

## Installation Options

### Option 1: Global Installation (Recommended)

```bash
# Install globally
npm install -g mcp-ts-stdio-nasa

# Verify installation
mcp-ts-stdio-nasa --version
```

### Option 2: Local Project Installation

```bash
# Create a new directory
mkdir my-nasa-project
cd my-nasa-project

# Initialize npm and install
npm init -y
npm install mcp-ts-stdio-nasa
```

### Option 3: Development Setup (For Contributors)

```bash
# Clone the repository
git clone https://github.com/jezweb/mcp-ts-stdio-nasa.git
cd mcp-ts-stdio-nasa

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start

# Or use MCP Inspector for testing
npm run mcp:inspect
```

## Claude Desktop Configuration

### Step 1: Locate Configuration File

Find your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Step 2: Edit Configuration

Add the NASA server to your configuration:

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

### Step 3: Get a NASA API Key (Optional)

While `DEMO_KEY` works for testing, for production use:

1. Visit [https://api.nasa.gov/](https://api.nasa.gov/)
2. Fill out the registration form
3. You'll receive an API key via email
4. Replace `DEMO_KEY` with your actual key

### Step 4: Restart Claude Desktop

After saving the configuration, restart Claude Desktop for the changes to take effect.

## Verify Installation

In Claude Desktop, try these queries to verify everything is working:

### Tools
1. **Test APOD**: "Show me today's NASA astronomy picture"
2. **Test Mars Rovers**: "Get me some photos from the Perseverance rover"
3. **Test NEO**: "Are there any asteroids passing Earth this week?"
4. **Test Space Weather**: "Check for recent solar flares"
5. **Test EPIC**: "Show me recent full Earth images"

### Resources (v0.2.0+)
1. **Test Config**: "Read the resource nasa://config"
2. **Test APOD Resource**: "Show me nasa://apod/2024-12-25"
3. **Test Rover Resource**: "Get nasa://rover/perseverance/latest"

### Prompts (v0.2.0+)
1. **Test Education**: "Use the explain-apod prompt for today"
2. **Test Analysis**: "Run the space-weather-report prompt for 3 days"

## Environment Variables

For more control, you can set these environment variables:

```bash
# Create .env file
cat > .env << EOF
NASA_API_KEY=your_actual_api_key
DEBUG=true  # Enable debug logging
EOF
```

Then update your Claude config to use the env file:

```json
{
  "mcpServers": {
    "nasa": {
      "command": "npx",
      "args": ["mcp-ts-stdio-nasa"],
      "env": {
        "NASA_API_KEY": "${NASA_API_KEY}",
        "DEBUG": "${DEBUG}"
      }
    }
  }
}
```

## Troubleshooting

### Server doesn't appear in Claude

1. Check the configuration file syntax (valid JSON)
2. Ensure the path to the command is correct
3. Restart Claude Desktop completely

### API rate limits

If you see rate limit errors:
1. Get your own NASA API key (free)
2. Replace `DEMO_KEY` in the configuration
3. NASA allows 1000 requests/hour with a key

### No data returned

1. Check your internet connection
2. Verify the NASA APIs are operational
3. Enable debug mode to see detailed logs

### Debug mode

Enable debug logging by setting `DEBUG=true`:

```json
{
  "mcpServers": {
    "nasa": {
      "command": "npx",
      "args": ["mcp-ts-stdio-nasa"],
      "env": {
        "NASA_API_KEY": "DEMO_KEY",
        "DEBUG": "true"
      }
    }
  }
}
```

Check Claude's developer tools or logs to see debug output.

## Next Steps

- Read the [Tool Documentation](../api/tools.md) to learn about each tool
- Explore [Example Queries](examples.md) for inspiration
- Check the [API Documentation](../api/tools.md) for detailed parameters
- Consider getting your own NASA API key for better rate limits

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/jezweb/mcp-ts-stdio-nasa/issues)
3. Create a new issue with:
   - Your configuration
   - Error messages
   - Steps to reproduce