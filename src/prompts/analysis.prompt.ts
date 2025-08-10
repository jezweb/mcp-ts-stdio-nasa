import { Prompt } from '@modelcontextprotocol/sdk/types.js';

export const spaceWeatherReportPrompt: Prompt = {
  name: 'space-weather-report',
  description: 'Generate a comprehensive space weather report',
  arguments: [
    {
      name: 'days',
      description: 'Number of days to analyze (1-7)',
      required: false,
    },
    {
      name: 'focus',
      description: 'Specific focus: solar-flares, cme, geomagnetic, or all',
      required: false,
    },
  ],
};

export async function getSpaceWeatherReportPrompt(args: Record<string, unknown>): Promise<{
  description?: string;
  messages: Array<{ role: 'user' | 'assistant'; content: { type: 'text'; text: string } }>;
}> {
  const days = Number(args.days) || 3;
  const focus = (args.focus as string) || 'all';
  
  const focusInstructionsMap = {
    'solar-flares': 'Focus on solar flare activity (FLR events)',
    'cme': 'Focus on Coronal Mass Ejections',
    'geomagnetic': 'Focus on Geomagnetic Storms',
    'all': 'Cover all space weather phenomena',
  };
  const focusInstructions = focusInstructionsMap[focus as keyof typeof focusInstructionsMap] || focusInstructionsMap.all;

  return {
    description: `Space weather report for the last ${days} days`,
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Generate a comprehensive space weather report for the last ${days} days. ${focusInstructions}.

Use the nasa_donki_space_weather tool to gather data on:
1. Solar Flares (FLR)
2. Coronal Mass Ejections (CME)
3. Geomagnetic Storms (GST)
4. Any other significant events

Then provide:
1. Executive Summary
2. Event Timeline
3. Potential Earth Impact Assessment
4. Notable Events Description
5. Forecast/Outlook (if applicable)
6. Recommendations for satellite operators and power grid managers

Format as a professional space weather bulletin.`,
        },
      },
    ],
  };
}

export const asteroidAnalysisPrompt: Prompt = {
  name: 'asteroid-analysis',
  description: 'Analyze Near-Earth Objects and assess potential risks',
  arguments: [
    {
      name: 'timeframe',
      description: 'Timeframe to analyze: today, week, or month',
      required: false,
    },
    {
      name: 'hazardous_only',
      description: 'Only analyze potentially hazardous asteroids (true/false)',
      required: false,
    },
  ],
};

export async function getAsteroidAnalysisPrompt(args: Record<string, unknown>): Promise<{
  description?: string;
  messages: Array<{ role: 'user' | 'assistant'; content: { type: 'text'; text: string } }>;
}> {
  const timeframe = (args.timeframe as string) || 'week';
  const hazardousOnly = args.hazardous_only === 'true' || args.hazardous_only === true;
  
  const timeframeDays = {
    today: 1,
    week: 7,
    month: 30,
  }[timeframe] || 7;

  return {
    description: `NEO risk assessment for the next ${timeframe}`,
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Analyze Near-Earth Objects for the next ${timeframeDays} days${hazardousOnly ? ' (focusing on potentially hazardous asteroids only)' : ''}.

Use the nasa_neo_feed tool to get NEO data, then provide:

1. Statistical Overview
   - Total number of objects
   - Number of potentially hazardous asteroids (PHAs)
   - Size distribution

2. Closest Approaches
   - Top 5 closest approaches
   - Their sizes, velocities, and miss distances

3. Risk Assessment
   - Any objects requiring monitoring
   - Comparison to typical asteroid activity
   - Context about what constitutes "close" in astronomical terms

4. Notable Objects
   - Largest objects passing by
   - Fastest moving objects
   - Any named or well-studied asteroids

5. Educational Context
   - What makes an asteroid "potentially hazardous"
   - How these distances compare to Earth-Moon distance
   - Historical context of similar passes

Format as a clear, informative report suitable for public communication.`,
        },
      },
    ],
  };
}