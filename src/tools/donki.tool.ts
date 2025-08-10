import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';
import { logger } from '../utils/logger.js';

const DonkiSchema = z.object({
  event_type: z
    .enum(['FLR', 'SEP', 'CME', 'IPS', 'MPC', 'GST', 'RBE'])
    .default('FLR')
    .describe('Type of space weather event'),
  start_date: z
    .string()
    .optional()
    .describe('Start date in YYYY-MM-DD format'),
  end_date: z
    .string()
    .optional()
    .describe('End date in YYYY-MM-DD format'),
});

const EVENT_TYPES: Record<string, string> = {
  FLR: 'Solar Flare',
  SEP: 'Solar Energetic Particle',
  CME: 'Coronal Mass Ejection',
  IPS: 'Interplanetary Shock',
  MPC: 'Magnetopause Crossing',
  GST: 'Geomagnetic Storm',
  RBE: 'Radiation Belt Enhancement',
};

export const donkiTool = {
  definition: {
    name: 'nasa_donki_space_weather',
    description: 'Get space weather events from NASA DONKI (Database Of Notifications, Knowledge, Information)',
    inputSchema: {
      type: 'object',
      properties: {
        event_type: {
          type: 'string',
          enum: ['FLR', 'SEP', 'CME', 'IPS', 'MPC', 'GST', 'RBE'],
          description: 'Type of space weather event: FLR (Solar Flare), SEP (Solar Energetic Particle), CME (Coronal Mass Ejection), IPS (Interplanetary Shock), MPC (Magnetopause Crossing), GST (Geomagnetic Storm), RBE (Radiation Belt Enhancement)',
          default: 'FLR',
        },
        start_date: {
          type: 'string',
          description: 'Start date in YYYY-MM-DD format',
        },
        end_date: {
          type: 'string',
          description: 'End date in YYYY-MM-DD format',
        },
      },
    },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    try {
      const params = DonkiSchema.parse(args);
      logger.debug('Fetching DONKI space weather events', params);
      
      // Default to last 30 days if no dates provided
      const endDate = params.end_date || new Date().toISOString().split('T')[0];
      const startDate = params.start_date || (() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
      })();
      
      const events = await nasaService.getDonkiEvents(
        params.event_type,
        startDate,
        endDate
      );
      
      if (!events || events.length === 0) {
        return `No ${EVENT_TYPES[params.event_type]} events found between ${startDate} and ${endDate}.`;
      }
      
      let result = `# Space Weather Events: ${EVENT_TYPES[params.event_type]}\n\n`;
      result += `**Period:** ${startDate} to ${endDate}\n`;
      result += `**Total Events:** ${events.length}\n\n`;
      
      events.forEach((event, index) => {
        result += `## Event ${index + 1}\n\n`;
        
        // Common fields
        if (event.messageType) {
          result += `- **Message Type:** ${event.messageType}\n`;
        }
        if (event.messageID) {
          result += `- **Message ID:** ${event.messageID}\n`;
        }
        if (event.messageIssueTime) {
          result += `- **Issue Time:** ${event.messageIssueTime}\n`;
        }
        
        // Event-specific fields
        if (event.beginTime) {
          result += `- **Begin Time:** ${event.beginTime}\n`;
        }
        if (event.peakTime) {
          result += `- **Peak Time:** ${event.peakTime}\n`;
        }
        if (event.endTime) {
          result += `- **End Time:** ${event.endTime}\n`;
        }
        if (event.classType) {
          result += `- **Class Type:** ${event.classType}\n`;
        }
        if (event.sourceLocation) {
          result += `- **Source Location:** ${event.sourceLocation}\n`;
        }
        if (event.activeRegionNum) {
          result += `- **Active Region Number:** ${event.activeRegionNum}\n`;
        }
        
        // Instruments
        if (event.instruments && event.instruments.length > 0) {
          result += `- **Instruments:** ${event.instruments.map(i => i.displayName).join(', ')}\n`;
        }
        
        // Message URL
        if (event.messageURL) {
          result += `- **More Info:** ${event.messageURL}\n`;
        }
        
        // Message body (if available)
        if (event.messageBody) {
          result += `\n**Details:**\n${event.messageBody}\n`;
        }
        
        result += '\n';
      });
      
      return result;
    } catch (error) {
      logger.error('DONKI tool error:', error);
      throw new Error(`Failed to fetch DONKI space weather events: ${error}`);
    }
  },
};