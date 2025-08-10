# Prompts API Documentation

This document describes all available prompts in the NASA MCP Server v0.2.0+.

## Overview

Prompts are pre-configured templates that guide AI interactions with NASA data. They combine tool usage with structured output formats.

## Available Prompts

### `explain-apod`
**Description**: Generate an educational explanation of an Astronomy Picture of the Day

**Arguments**:
- `date` (optional): Date in YYYY-MM-DD format (defaults to today)
- `audience` (optional): Target audience level
  - `child`: Simple terms for ages 6-10
  - `student`: High school or college level (default)
  - `expert`: Detailed technical explanation

**Example Usage**:
```
"Use the explain-apod prompt for today with audience set to child"
"Run explain-apod for 2024-01-15 with expert level"
```

**Output**: Educational explanation including:
1. What the image shows
2. Why it's scientifically interesting
3. Key astronomical concepts
4. Fun facts and context
5. Relation to our understanding of the universe

### `space-weather-report`
**Description**: Generate a comprehensive space weather report

**Arguments**:
- `days` (optional): Number of days to analyze (1-7, default: 3)
- `focus` (optional): Specific focus area
  - `solar-flares`: Focus on FLR events
  - `cme`: Focus on Coronal Mass Ejections
  - `geomagnetic`: Focus on Geomagnetic Storms
  - `all`: Cover all phenomena (default)

**Example Usage**:
```
"Generate a space-weather-report for the last 7 days"
"Create space-weather-report focusing on solar-flares"
```

**Output**: Professional space weather bulletin including:
1. Executive Summary
2. Event Timeline
3. Earth Impact Assessment
4. Notable Events Description
5. Forecast/Outlook
6. Recommendations for operators

### `asteroid-analysis`
**Description**: Analyze Near-Earth Objects and assess potential risks

**Arguments**:
- `timeframe` (optional): Analysis period
  - `today`: Current day only
  - `week`: Next 7 days (default)
  - `month`: Next 30 days
- `hazardous_only` (optional): Boolean (default: false)
  - `true`: Only analyze potentially hazardous asteroids
  - `false`: Analyze all NEOs

**Example Usage**:
```
"Run asteroid-analysis for this week with hazardous_only true"
"Generate asteroid-analysis for the month"
```

**Output**: Comprehensive NEO report including:
1. Statistical Overview
   - Total objects count
   - Number of PHAs
   - Size distribution
2. Closest Approaches
   - Top 5 closest passes
   - Sizes, velocities, miss distances
3. Risk Assessment
   - Objects requiring monitoring
   - Comparison to typical activity
4. Notable Objects
   - Largest objects
   - Fastest moving
   - Named asteroids
5. Educational Context
   - What makes an asteroid "potentially hazardous"
   - Distance comparisons

## Implementation Details

Prompts are implemented in `/src/prompts/` with the following structure:
- Educational prompts: `education.prompt.ts`
- Analysis prompts: `analysis.prompt.ts`
- Index: `index.ts` (registration and routing)

## How Prompts Work

1. **User Request**: User invokes a prompt with optional arguments
2. **Template Processing**: Server generates appropriate messages
3. **Tool Integration**: Prompts may instruct the AI to use specific tools
4. **Structured Output**: Results are formatted according to the prompt template

## Creating Custom Interactions

While the server provides these pre-built prompts, users can also:
- Combine multiple tools manually
- Create custom analysis workflows
- Mix resources and tools for specific needs

## Best Practices

1. **Choose the Right Audience**: For educational prompts, select appropriate complexity
2. **Specify Timeframes**: For analysis prompts, be specific about date ranges
3. **Use Focus Options**: Narrow down reports to specific phenomena when needed
4. **Combine with Resources**: Use resources for raw data, prompts for analysis

## Examples in Claude Desktop

```
"Use the explain-apod prompt for Christmas 2023"
"Generate a space weather report for the last week"
"Run an asteroid analysis for potentially hazardous objects this month"
"Create an educational APOD explanation for children"
```