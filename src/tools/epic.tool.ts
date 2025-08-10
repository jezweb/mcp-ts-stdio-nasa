import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';
import { logger } from '../utils/logger.js';

const EpicSchema = z.object({
  image_type: z
    .enum(['natural', 'enhanced'])
    .default('natural')
    .describe('Type of image: natural color or enhanced'),
  date: z
    .string()
    .optional()
    .describe('Date in YYYY-MM-DD format. Defaults to most recent available.'),
  limit: z
    .number()
    .min(1)
    .max(20)
    .default(5)
    .describe('Maximum number of images to return'),
});

export const epicTool = {
  definition: {
    name: 'nasa_epic_earth_imagery',
    description: 'Get full disc imagery of Earth from DSCOVR\'s Earth Polychromatic Imaging Camera',
    inputSchema: {
      type: 'object',
      properties: {
        image_type: {
          type: 'string',
          enum: ['natural', 'enhanced'],
          description: 'Type of image: natural color or enhanced',
          default: 'natural',
        },
        date: {
          type: 'string',
          description: 'Date in YYYY-MM-DD format. Defaults to most recent available.',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of images to return',
          default: 5,
        },
      },
    },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    try {
      const params = EpicSchema.parse(args);
      logger.debug('Fetching EPIC Earth imagery', params);
      
      const images = await nasaService.getEpicImages(params.image_type, params.date);
      
      if (!images || images.length === 0) {
        return `No EPIC images found for the specified date.`;
      }
      
      const limitedImages = images.slice(0, params.limit);
      
      let result = `# EPIC Earth Imagery\n\n`;
      result += `**Image Type:** ${params.image_type === 'natural' ? 'Natural Color' : 'Enhanced'}\n`;
      result += `**Total Images Available:** ${images.length}\n`;
      result += `**Showing:** ${limitedImages.length} images\n\n`;
      
      limitedImages.forEach((image, index) => {
        result += `## Image ${index + 1}\n\n`;
        result += `- **Date/Time:** ${image.date}\n`;
        result += `- **Caption:** ${image.caption}\n`;
        result += `- **Identifier:** ${image.identifier}\n`;
        
        // Centroid coordinates
        if (image.centroid_coordinates) {
          result += `- **Earth Center Coordinates:** ${image.centroid_coordinates.lat.toFixed(2)}° lat, ${image.centroid_coordinates.lon.toFixed(2)}° lon\n`;
        }
        
        // Spacecraft position
        if (image.dscovr_j2000_position) {
          const pos = image.dscovr_j2000_position;
          const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
          result += `- **DSCOVR Distance from Earth:** ${(distance / 1000).toFixed(0)} km\n`;
        }
        
        // Image URL (if we have it from our enhanced response)
        const imageUrl = (image as any).image_url;
        if (imageUrl) {
          result += `- **Image URL:** ${imageUrl}\n`;
        }
        
        result += '\n';
      });
      
      result += `## About EPIC\n\n`;
      result += `The Earth Polychromatic Imaging Camera (EPIC) is aboard NOAA's Deep Space Climate Observatory (DSCOVR) satellite, `;
      result += `positioned at the L1 Lagrange point between Earth and the Sun (approximately 1.5 million km from Earth). `;
      result += `EPIC provides full disc imagery of the sunlit side of Earth, offering a unique perspective of our planet.\n`;
      
      return result;
    } catch (error) {
      logger.error('EPIC tool error:', error);
      throw new Error(`Failed to fetch EPIC Earth imagery: ${error}`);
    }
  },
};