import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';

// Static resource for today's NEO feed
export const neoTodayResource: Resource = {
  uri: 'nasa://neo/today',
  name: "Today's Near Earth Objects",
  description: 'NEOs passing Earth today',
  mimeType: 'application/json',
};

export async function getNeoTodayResourceContent(uri: string): Promise<{ uri: string; mimeType: string; text: string }> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const neoData = await nasaService.getNeoFeed(today, today);
    
    const content = {
      date: today,
      element_count: neoData.element_count,
      near_earth_objects: neoData.near_earth_objects[today]?.map((neo: any) => ({
        id: neo.id,
        name: neo.name,
        is_potentially_hazardous: neo.is_potentially_hazardous_asteroid,
        estimated_diameter: {
          meters: {
            min: neo.estimated_diameter.meters.estimated_diameter_min,
            max: neo.estimated_diameter.meters.estimated_diameter_max,
          },
        },
        close_approach: neo.close_approach_data[0] ? {
          date: neo.close_approach_data[0].close_approach_date_full,
          velocity_km_h: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
          miss_distance_km: neo.close_approach_data[0].miss_distance.kilometers,
        } : null,
      })) || [],
    };

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(content, null, 2),
    };
  } catch (error) {
    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify({ error: `Failed to fetch NEO data: ${error}` }, null, 2),
    };
  }
}