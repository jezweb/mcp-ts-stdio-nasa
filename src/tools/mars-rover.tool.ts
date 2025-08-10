import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';
import { logger } from '../utils/logger.js';

const MarsRoverSchema = z.object({
  rover: z
    .enum(['curiosity', 'opportunity', 'spirit', 'perseverance'])
    .default('perseverance')
    .describe('Mars rover name'),
  sol: z
    .number()
    .optional()
    .describe('Martian sol (day) to get photos from'),
  earth_date: z
    .string()
    .optional()
    .describe('Earth date in YYYY-MM-DD format'),
  camera: z
    .string()
    .optional()
    .describe('Camera abbreviation (e.g., FHAZ, RHAZ, NAVCAM)'),
  limit: z
    .number()
    .min(1)
    .max(25)
    .default(5)
    .describe('Maximum number of photos to return'),
});

const CAMERA_NAMES: Record<string, string> = {
  FHAZ: 'Front Hazard Avoidance Camera',
  RHAZ: 'Rear Hazard Avoidance Camera',
  MAST: 'Mast Camera',
  CHEMCAM: 'Chemistry and Camera Complex',
  MAHLI: 'Mars Hand Lens Imager',
  MARDI: 'Mars Descent Imager',
  NAVCAM: 'Navigation Camera',
  PANCAM: 'Panoramic Camera',
  MINITES: 'Miniature Thermal Emission Spectrometer',
};

export const marsRoverTool = {
  definition: {
    name: 'nasa_mars_rover_photos',
    description: 'Get photos from Mars rovers (Curiosity, Opportunity, Spirit, Perseverance)',
    inputSchema: {
      type: 'object',
      properties: {
        rover: {
          type: 'string',
          enum: ['curiosity', 'opportunity', 'spirit', 'perseverance'],
          description: 'Mars rover name',
          default: 'perseverance',
        },
        sol: {
          type: 'number',
          description: 'Martian sol (day) to get photos from',
        },
        earth_date: {
          type: 'string',
          description: 'Earth date in YYYY-MM-DD format',
        },
        camera: {
          type: 'string',
          description: 'Camera abbreviation (e.g., FHAZ, RHAZ, NAVCAM)',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of photos to return',
          default: 5,
        },
      },
    },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    try {
      const params = MarsRoverSchema.parse(args);
      logger.debug('Fetching Mars Rover photos', params);
      
      const response = await nasaService.getMarsRoverPhotos(
        params.rover,
        params.sol,
        params.earth_date,
        params.camera
      );
      
      if (!response.photos || response.photos.length === 0) {
        return `No photos found for ${params.rover} rover with the specified criteria.`;
      }
      
      const photos = response.photos.slice(0, params.limit);
      
      let result = `# Mars Rover Photos: ${params.rover.toUpperCase()}\n\n`;
      result += `**Total photos found:** ${response.photos.length}\n`;
      result += `**Showing:** ${photos.length} photos\n\n`;
      
      photos.forEach((photo, index) => {
        result += `## Photo ${index + 1}\n\n`;
        result += `- **Sol:** ${photo.sol}\n`;
        result += `- **Earth Date:** ${photo.earth_date}\n`;
        result += `- **Camera:** ${CAMERA_NAMES[photo.camera.name] || photo.camera.full_name}\n`;
        result += `- **Camera Abbreviation:** ${photo.camera.name}\n`;
        result += `- **Image URL:** ${photo.img_src}\n`;
        result += `- **Rover Status:** ${photo.rover.status}\n`;
        result += `- **Total Photos by Rover:** ${photo.rover.total_photos}\n\n`;
      });
      
      return result;
    } catch (error) {
      logger.error('Mars Rover tool error:', error);
      throw new Error(`Failed to fetch Mars Rover photos: ${error}`);
    }
  },
};