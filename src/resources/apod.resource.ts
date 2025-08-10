import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { nasaService } from '../services/nasa.service.js';

// Resource template pattern: nasa://apod/{date}
export function isApodResource(uri: string): { match: boolean; date?: string } {
  const pattern = /^nasa:\/\/apod\/(\d{4}-\d{2}-\d{2})$/;
  const match = uri.match(pattern);
  if (match) {
    return { match: true, date: match[1] };
  }
  return { match: false };
}

export function listApodResources(): Resource[] {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  return [
    {
      uri: `nasa://apod/${today}`,
      name: `APOD for ${today}`,
      description: "Today's Astronomy Picture of the Day",
      mimeType: 'application/json',
    },
    {
      uri: `nasa://apod/${yesterday}`,
      name: `APOD for ${yesterday}`,
      description: "Yesterday's Astronomy Picture of the Day",
      mimeType: 'application/json',
    },
  ];
}

export async function getApodResourceContent(uri: string, date: string): Promise<{ uri: string; mimeType: string; text: string }> {
  try {
    const apodData = await nasaService.getApod(date);
    
    const content = {
      date: apodData.date,
      title: apodData.title,
      explanation: apodData.explanation,
      url: apodData.url,
      hdurl: apodData.hdurl,
      media_type: apodData.media_type,
      service_version: apodData.service_version,
      copyright: apodData.copyright,
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
      text: JSON.stringify({ error: `Failed to fetch APOD for ${date}: ${error}` }, null, 2),
    };
  }
}