import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';
import { logger } from '../utils/logger.js';

const ApodSchema = z.object({
  date: z
    .string()
    .optional()
    .describe('Date in YYYY-MM-DD format. Defaults to today.'),
});

export const apodTool = {
  definition: {
    name: 'nasa_apod',
    description: 'Get NASA Astronomy Picture of the Day with detailed explanation',
    inputSchema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: 'Date in YYYY-MM-DD format. Defaults to today.',
        },
      },
    },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    try {
      const params = ApodSchema.parse(args);
      logger.debug('Fetching APOD', params);
      
      const apod = await nasaService.getApod(params.date);
      
      let result = `# ${apod.title}\n\n`;
      result += `**Date:** ${apod.date}\n\n`;
      
      if (apod.copyright) {
        result += `**Copyright:** ${apod.copyright}\n\n`;
      }
      
      result += `## Explanation\n\n${apod.explanation}\n\n`;
      
      if (apod.media_type === 'image') {
        result += `## Image\n\n`;
        result += `- **Standard Resolution:** ${apod.url}\n`;
        if (apod.hdurl) {
          result += `- **High Resolution:** ${apod.hdurl}\n`;
        }
      } else if (apod.media_type === 'video') {
        result += `## Video\n\n`;
        result += `**Video URL:** ${apod.url}\n`;
      }
      
      return result;
    } catch (error) {
      logger.error('APOD tool error:', error);
      throw new Error(`Failed to fetch APOD: ${error}`);
    }
  },
};