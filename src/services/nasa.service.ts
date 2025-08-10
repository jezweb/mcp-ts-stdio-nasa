import { getNasaApiUrl } from '../utils/config.js';
import { logger } from '../utils/logger.js';
import type {
  ApodResponse,
  MarsRoverPhotosResponse,
  NeoFeedResponse,
  DonkiEvent,
  EpicImage,
} from '../types/nasa.js';

export class NasaApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'NasaApiError';
  }
}

async function fetchFromNasa<T>(url: string): Promise<T> {
  logger.debug(`Fetching from NASA API: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new NasaApiError(
        `NASA API returned ${response.status}: ${response.statusText}`,
        response.status,
        url
      );
    }
    
    const data = await response.json() as T;
    return data;
  } catch (error) {
    if (error instanceof NasaApiError) {
      throw error;
    }
    throw new NasaApiError(`Failed to fetch from NASA API: ${error}`, undefined, url);
  }
}

export const nasaService = {
  // Astronomy Picture of the Day
  async getApod(date?: string): Promise<ApodResponse> {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    
    const url = getNasaApiUrl('/planetary/apod', params);
    return fetchFromNasa<ApodResponse>(url);
  },

  // Mars Rover Photos
  async getMarsRoverPhotos(
    rover: string,
    sol?: number,
    earthDate?: string,
    camera?: string,
    page: number = 1
  ): Promise<MarsRoverPhotosResponse> {
    const params: Record<string, string> = { page: page.toString() };
    
    if (sol !== undefined) {
      params.sol = sol.toString();
    } else if (earthDate) {
      params.earth_date = earthDate;
    } else {
      // Default to sol 1000 if no date specified
      params.sol = '1000';
    }
    
    if (camera) {
      params.camera = camera;
    }
    
    const url = getNasaApiUrl(`/mars-photos/api/v1/rovers/${rover}/photos`, params);
    return fetchFromNasa<MarsRoverPhotosResponse>(url);
  },

  // Near Earth Objects Feed
  async getNeoFeed(
    startDate?: string,
    endDate?: string
  ): Promise<NeoFeedResponse> {
    const params: Record<string, string> = {};
    
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const url = getNasaApiUrl('/neo/rest/v1/feed', params);
    return fetchFromNasa<NeoFeedResponse>(url);
  },

  // DONKI (Space Weather)
  async getDonkiEvents(
    eventType: string = 'FLR', // Solar Flares by default
    startDate?: string,
    endDate?: string
  ): Promise<DonkiEvent[]> {
    const params: Record<string, string> = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const url = getNasaApiUrl(`/DONKI/${eventType}`, params);
    return fetchFromNasa<DonkiEvent[]>(url);
  },

  // EPIC (Earth Polychromatic Imaging Camera)
  async getEpicImages(
    imageType: 'natural' | 'enhanced' = 'natural',
    date?: string
  ): Promise<EpicImage[]> {
    let endpoint = `/EPIC/api/${imageType}`;
    
    if (date) {
      endpoint += `/date/${date}`;
    }
    
    const url = getNasaApiUrl(endpoint);
    const images = await fetchFromNasa<EpicImage[]>(url);
    
    // Add full image URLs
    return images.map(img => ({
      ...img,
      image_url: `https://epic.gsfc.nasa.gov/archive/${imageType}/${date?.replace(/-/g, '/')}/${imageType}/${img.image}.png`
    } as EpicImage & { image_url: string }));
  },
};