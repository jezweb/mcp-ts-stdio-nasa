#!/bin/bash

# Test script for MCP TypeScript NASA Server

echo "Testing MCP TypeScript NASA Server..."
echo "======================================"
echo ""

# Test basic MCP protocol initialization
echo "Testing MCP initialization request..."
echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"1.0.0","capabilities":{},"clientInfo":{"name":"test-client","version":"1.0.0"}},"id":1}' | node dist/index.js | head -n 1

echo ""
echo "Test complete!"
echo ""
echo "To use with Claude Desktop, add this to your config:"
echo "  ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)"
echo "  %APPDATA%\\Claude\\claude_desktop_config.json (Windows)"
echo ""
echo "Configuration:"
cat claude_desktop_config.example.json
echo ""
echo "For interactive testing, run:"
echo "  npm run mcp:inspect"