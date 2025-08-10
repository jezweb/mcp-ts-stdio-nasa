import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';

// Resource template pattern: nasa://rover/{rover}/latest
export function isRoverResource(uri: string): { match: boolean; rover?: string } {
  const pattern = /^nasa:\/\/rover\/([a-z]+)\/latest$/;
  const match = uri.match(pattern);
  if (match) {
    return { match: true, rover: match[1] };
  }
  return { match: false };
}

export function listRoverResources(): Resource[] {
  const rovers = ['curiosity', 'perseverance', 'opportunity', 'spirit'];
  
  return rovers.map(rover => ({
    uri: `nasa://rover/${rover}/latest`,
    name: `Latest ${rover.charAt(0).toUpperCase() + rover.slice(1)} Photos`,
    description: `Most recent photos from ${rover.charAt(0).toUpperCase() + rover.slice(1)} rover`,
    mimeType: 'application/json',
  }));
}

export async function getRoverResourceContent(uri: string, rover: string): Promise<{ uri: string; mimeType: string; text: string }> {
  try {
    // Get the latest photos (last Earth date with data)
    const photos = await nasaService.getMarsRoverPhotos(
      rover,
      1, // sol
      undefined, // earthDate
      undefined, // camera
      1 // page
    );

    const content = {
      rover: rover,
      count: photos.photos.length,
      photos: photos.photos.map((photo: any) => ({
        id: photo.id,
        camera: photo.camera.full_name,
        sol: photo.sol,
        earth_date: photo.earth_date,
        img_src: photo.img_src,
      })),
      query_date: new Date().toISOString(),
    };

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(content, null, 2),
    };
  } catch (error) {
    // Try with a recent Earth date instead
    try {
      const recentDate = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
      const photos = await nasaService.getMarsRoverPhotos(
        rover,
        undefined, // sol
        recentDate, // earthDate
        undefined, // camera
        1 // page
      );

      const content = {
        rover: rover,
        count: photos.photos.length,
        photos: photos.photos.map((photo: any) => ({
          id: photo.id,
          camera: photo.camera.full_name,
          sol: photo.sol,
          earth_date: photo.earth_date,
          img_src: photo.img_src,
        })),
        query_date: new Date().toISOString(),
        note: `Using photos from ${recentDate}`,
      };

      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(content, null, 2),
      };
    } catch (fallbackError) {
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ error: `Failed to fetch photos for ${rover}: ${fallbackError}` }, null, 2),
      };
    }
  }
}