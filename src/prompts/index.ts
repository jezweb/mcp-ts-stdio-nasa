import { Prompt } from '@modelcontextprotocol/sdk/types.js';
import {
  explainApodPrompt,
  getExplainApodPrompt,
} from './education.prompt.js';
import {
  spaceWeatherReportPrompt,
  getSpaceWeatherReportPrompt,
  asteroidAnalysisPrompt,
  getAsteroidAnalysisPrompt,
} from './analysis.prompt.js';

export function listPrompts(): Prompt[] {
  return [
    explainApodPrompt,
    spaceWeatherReportPrompt,
    asteroidAnalysisPrompt,
  ];
}

export async function getPrompt(name: string, args?: Record<string, unknown>): Promise<{
  description?: string;
  messages: Array<{ role: 'user' | 'assistant'; content: { type: 'text'; text: string } }>;
}> {
  const safeArgs = args || {};
  
  switch (name) {
    case 'explain-apod':
      return getExplainApodPrompt(safeArgs);
    case 'space-weather-report':
      return getSpaceWeatherReportPrompt(safeArgs);
    case 'asteroid-analysis':
      return getAsteroidAnalysisPrompt(safeArgs);
    default:
      throw new Error(`Prompt not found: ${name}`);
  }
}