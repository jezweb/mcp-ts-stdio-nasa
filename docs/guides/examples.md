# Example Queries and Use Cases

This guide provides example queries you can use with the NASA MCP Server in Claude Desktop or other MCP clients.

## Astronomy Picture of the Day (APOD)

### Today's Picture
```
"Show me today's NASA astronomy picture"
```

### Historical Pictures
```
"Get the NASA astronomy picture from July 20, 1969"
"Show me the APOD from New Year's Day 2024"
"What was the astronomy picture on my birthday: March 15, 2023"
```

### Specific Events
```
"Show me the APOD from when the James Webb telescope's first images were released"
"Get the astronomy picture from the day of the last solar eclipse"
```

## Mars Rover Photos

### Latest Photos
```
"Show me recent photos from the Perseverance rover"
"Get the latest Mars photos from Curiosity"
```

### Specific Cameras
```
"Show me navigation camera photos from Perseverance on sol 1000"
"Get front hazard camera images from Curiosity"
"Find mast camera photos from the Perseverance rover"
```

### Specific Dates
```
"Get Mars rover photos from Perseverance on January 1, 2024"
"Show me what Curiosity saw on its 1000th Martian day"
```

### Comparative Queries
```
"Compare photos from different cameras on Perseverance from the same sol"
"Show me how the Martian landscape looks from Curiosity's perspective"
```

## Near Earth Objects (NEOs)

### Current Threats
```
"Are there any potentially hazardous asteroids passing Earth this week?"
"Show me all near-Earth objects for the next 7 days"
"What asteroids are closest to Earth today?"
```

### Specific Time Periods
```
"Check for asteroids passing Earth in August 2024"
"List all NEOs between Christmas and New Year"
"What space rocks passed by Earth last month?"
```

### Hazard Assessment
```
"Find the largest asteroids passing Earth this month"
"Show me only the potentially hazardous asteroids this week"
"What's the closest asteroid approach this year?"
```

## Space Weather (DONKI)

### Solar Flares
```
"Check for solar flares in the last week"
"Were there any major solar flares this month?"
"Show me X-class solar flares from the past 30 days"
```

### Coronal Mass Ejections
```
"Check for CMEs heading toward Earth"
"Show me coronal mass ejections from the last week"
"Were there any Earth-directed CMEs recently?"
```

### Geomagnetic Storms
```
"Check for geomagnetic storms in the past month"
"Is there any space weather that might affect satellites?"
"Show me all space weather events this week"
```

### Multiple Event Types
```
"Give me a complete space weather report for the last week"
"Check for all types of solar activity this month"
"What space weather events happened during the last aurora?"
```

## Earth Imagery (EPIC)

### Recent Images
```
"Show me recent full Earth images from space"
"Get the latest EPIC Earth imagery"
"Show me Earth from a million miles away"
```

### Enhanced Images
```
"Get enhanced Earth images from EPIC"
"Show me color-enhanced views of Earth"
```

### Specific Dates
```
"Show me how Earth looked from space on January 1, 2024"
"Get EPIC images from the last full moon"
"What did Earth look like from space during the eclipse?"
```

## Combined Queries

### Daily Space Report
```
"Give me a complete space report: today's APOD, any hazardous asteroids, recent solar flares, and latest Mars photos"
```

### Educational Queries
```
"I'm teaching about Mars - show me recent rover photos and explain what we're seeing"
"Help me understand space weather - check for recent solar flares and explain their impact"
```

### Research Queries
```
"I'm researching asteroid threats - show me all potentially hazardous NEOs this month with their sizes and distances"
"I need data on solar activity - get all solar flares and CMEs from the past week"
```

## Tips for Effective Queries

### Be Specific with Dates
- Use YYYY-MM-DD format for best results
- Specify date ranges when looking for events

### Use Proper Names
- Rover names: Perseverance, Curiosity, Opportunity, Spirit
- Camera codes: NAVCAM, FHAZ, RHAZ, MAST
- Event types: FLR, CME, GST

### Set Reasonable Limits
- Photos: Request 5-10 for manageable responses
- Date ranges: Keep to 7-30 days for space weather
- NEOs: Weekly ranges work best

### Combine Related Queries
- "Show me Mars photos and explain what the rover is investigating"
- "Get today's APOD and tell me about the astronomical object"

## Advanced Use Cases

### Monitoring Space Weather
Set up regular checks:
```
"Check for solar flares and CMEs every morning"
"Alert me to any potentially hazardous asteroids this week"
```

### Educational Content
Create learning materials:
```
"Create a presentation about Mars using recent rover photos"
"Explain today's APOD in simple terms for students"
```

### Research Support
Gather data for analysis:
```
"Compile all X-class solar flares from 2024"
"Track asteroid 2024 XY's approach to Earth"
```

## Error Handling

If queries fail, try:
1. Checking date formats (YYYY-MM-DD)
2. Verifying rover/camera names
3. Reducing date ranges
4. Simplifying the query

## Rate Limiting

If you encounter rate limits:
- Wait an hour (for DEMO_KEY)
- Get your own free NASA API key
- Reduce query frequency