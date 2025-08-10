import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { apodTool } from './apod.tool.js';
import { marsRoverTool } from './mars-rover.tool.js';
import { neoTool } from './neo.tool.js';
import { donkiTool } from './donki.tool.js';
import { epicTool } from './epic.tool.js';

// Define all tools
const tools = [
  apodTool,
  marsRoverTool,
  neoTool,
  donkiTool,
  epicTool,
];

// Register all tools
export function registerTools(): Tool[] {
  return tools.map(tool => tool.definition);
}

// Handle tool calls
export async function handleToolCall(
  toolName: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const tool = tools.find(t => t.definition.name === toolName);
  
  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }
  
  const result = await tool.handler(args);
  
  return {
    content: [
      {
        type: 'text',
        text: result,
      },
    ],
  };
}