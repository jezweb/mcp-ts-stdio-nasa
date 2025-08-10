import { Resource } from '@modelcontextprotocol/sdk/types.js';
import {
  configResource,
  getConfigResourceContent,
  missionsResource,
  getMissionsResourceContent,
} from './static.resource.js';
import {
  isApodResource,
  listApodResources,
  getApodResourceContent,
} from './apod.resource.js';
import {
  isRoverResource,
  listRoverResources,
  getRoverResourceContent,
} from './rover.resource.js';
import {
  neoTodayResource,
  getNeoTodayResourceContent,
} from './neo.resource.js';

export function listResources(): Resource[] {
  return [
    // Static resources
    configResource,
    missionsResource,
    neoTodayResource,
    // Dynamic resource examples
    ...listApodResources(),
    ...listRoverResources(),
  ];
}

export async function readResource(uri: string): Promise<{ contents: Array<{ uri: string; mimeType?: string; text?: string }> }> {
  // Check static resources
  if (uri === configResource.uri) {
    const content = await getConfigResourceContent(uri);
    return { contents: [content] };
  }
  
  if (uri === missionsResource.uri) {
    const content = await getMissionsResourceContent(uri);
    return { contents: [content] };
  }
  
  if (uri === neoTodayResource.uri) {
    const content = await getNeoTodayResourceContent(uri);
    return { contents: [content] };
  }
  
  // Check dynamic APOD resource
  const apodMatch = isApodResource(uri);
  if (apodMatch.match && apodMatch.date) {
    const content = await getApodResourceContent(uri, apodMatch.date);
    return { contents: [content] };
  }
  
  // Check dynamic rover resource
  const roverMatch = isRoverResource(uri);
  if (roverMatch.match && roverMatch.rover) {
    const content = await getRoverResourceContent(uri, roverMatch.rover);
    return { contents: [content] };
  }
  
  throw new Error(`Resource not found: ${uri}`);
}