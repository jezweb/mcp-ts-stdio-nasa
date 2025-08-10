import { Resource } from '@modelcontextprotocol/sdk/types.js';

export const configResource: Resource = {
  uri: 'nasa://config',
  name: 'NASA API Configuration',
  description: 'Current NASA API configuration and status',
  mimeType: 'application/json',
};

export async function getConfigResourceContent(uri: string): Promise<{ uri: string; mimeType: string; text: string }> {
  const config = {
    apiKey: process.env.NASA_API_KEY ? 'Configured' : 'Using DEMO_KEY',
    endpoints: {
      apod: 'https://api.nasa.gov/planetary/apod',
      marsRover: 'https://api.nasa.gov/mars-photos/api/v1',
      neo: 'https://api.nasa.gov/neo/rest/v1',
      donki: 'https://api.nasa.gov/DONKI',
      epic: 'https://api.nasa.gov/EPIC',
    },
    rateLimit: process.env.NASA_API_KEY ? '1000 requests/hour' : '30 requests/hour (DEMO)',
    version: '0.1.0',
    capabilities: ['tools', 'resources', 'prompts'],
  };

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(config, null, 2),
  };
}

export const missionsResource: Resource = {
  uri: 'nasa://missions/current',
  name: 'Current NASA Missions',
  description: 'List of currently active NASA missions',
  mimeType: 'application/json',
};

export async function getMissionsResourceContent(uri: string): Promise<{ uri: string; mimeType: string; text: string }> {
  // Static list of current missions - in production, this could fetch from a NASA API
  const missions = {
    mars: [
      { name: 'Perseverance Rover', status: 'Active', location: 'Jezero Crater', since: '2021-02-18' },
      { name: 'Curiosity Rover', status: 'Active', location: 'Gale Crater', since: '2012-08-06' },
      { name: 'InSight Lander', status: 'Completed', location: 'Elysium Planitia', ended: '2022-12-15' },
    ],
    space: [
      { name: 'International Space Station', status: 'Active', crew: 7, since: '1998-11-20' },
      { name: 'James Webb Space Telescope', status: 'Active', location: 'L2 Point', since: '2021-12-25' },
      { name: 'Hubble Space Telescope', status: 'Active', location: 'Low Earth Orbit', since: '1990-04-24' },
    ],
    lunar: [
      { name: 'Artemis Program', status: 'In Progress', nextMission: 'Artemis II', target: '2025' },
      { name: 'Lunar Reconnaissance Orbiter', status: 'Active', location: 'Lunar Orbit', since: '2009-06-23' },
    ],
  };

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(missions, null, 2),
  };
}