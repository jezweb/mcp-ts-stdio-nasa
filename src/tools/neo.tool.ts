import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';
import { logger } from '../utils/logger.js';

const NeoSchema = z.object({
  start_date: z
    .string()
    .optional()
    .describe('Start date in YYYY-MM-DD format. Defaults to today.'),
  end_date: z
    .string()
    .optional()
    .describe('End date in YYYY-MM-DD format. Defaults to 7 days from start date.'),
});

export const neoTool = {
  definition: {
    name: 'nasa_neo_feed',
    description: 'Get Near Earth Objects (asteroids) passing near Earth within a date range',
    inputSchema: {
      type: 'object',
      properties: {
        start_date: {
          type: 'string',
          description: 'Start date in YYYY-MM-DD format. Defaults to today.',
        },
        end_date: {
          type: 'string',
          description: 'End date in YYYY-MM-DD format. Defaults to 7 days from start date.',
        },
      },
    },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    try {
      const params = NeoSchema.parse(args);
      logger.debug('Fetching NEO feed', params);
      
      // If no dates provided, use today and 7 days from now
      const startDate = params.start_date || new Date().toISOString().split('T')[0];
      const endDate = params.end_date || (() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
      })();
      
      const response = await nasaService.getNeoFeed(startDate, endDate);
      
      let result = `# Near Earth Objects (NEOs)\n\n`;
      result += `**Period:** ${startDate} to ${endDate}\n`;
      result += `**Total Objects:** ${response.element_count}\n\n`;
      
      let hazardousCount = 0;
      const dates = Object.keys(response.near_earth_objects).sort();
      
      dates.forEach(date => {
        const neos = response.near_earth_objects[date];
        if (!neos || neos.length === 0) return;
        
        result += `## ${date}\n\n`;
        result += `**Objects on this date:** ${neos.length}\n\n`;
        
        neos.forEach(neo => {
          if (neo.is_potentially_hazardous_asteroid) {
            hazardousCount++;
            result += `### ⚠️ ${neo.name} (POTENTIALLY HAZARDOUS)\n\n`;
          } else {
            result += `### ${neo.name}\n\n`;
          }
          
          result += `- **ID:** ${neo.id}\n`;
          result += `- **Absolute Magnitude:** ${neo.absolute_magnitude_h}\n`;
          result += `- **Estimated Diameter:** ${neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1)} - ${neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)} meters\n`;
          result += `- **NASA JPL URL:** ${neo.nasa_jpl_url}\n`;
          
          if (neo.close_approach_data && neo.close_approach_data.length > 0) {
            const approach = neo.close_approach_data[0];
            result += `\n**Close Approach Data:**\n`;
            result += `- **Date:** ${approach.close_approach_date_full}\n`;
            result += `- **Velocity:** ${parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h\n`;
            result += `- **Miss Distance:** ${parseFloat(approach.miss_distance.kilometers).toFixed(0)} km (${parseFloat(approach.miss_distance.lunar).toFixed(2)} lunar distances)\n`;
            result += `- **Orbiting Body:** ${approach.orbiting_body}\n`;
          }
          
          result += '\n';
        });
      });
      
      result += `## Summary\n\n`;
      result += `- **Total NEOs in period:** ${response.element_count}\n`;
      result += `- **Potentially Hazardous:** ${hazardousCount}\n`;
      result += `- **Non-hazardous:** ${response.element_count - hazardousCount}\n`;
      
      return result;
    } catch (error) {
      logger.error('NEO tool error:', error);
      throw new Error(`Failed to fetch NEO feed: ${error}`);
    }
  },
};