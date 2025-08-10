import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nasa: {
    apiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
    baseUrl: process.env.NASA_API_BASE_URL || 'https://api.nasa.gov',
  },
  debug: process.env.DEBUG === 'true',
} as const;

export function getNasaApiUrl(endpoint: string, params: Record<string, string> = {}): string {
  const url = new URL(`${config.nasa.baseUrl}${endpoint}`);
  
  // Always add API key
  url.searchParams.append('api_key', config.nasa.apiKey);
  
  // Add any additional parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}