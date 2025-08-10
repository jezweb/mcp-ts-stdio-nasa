# Tool API Documentation

## Overview

The MCP TypeScript NASA Server provides 5 tools for accessing NASA's public APIs. Each tool returns formatted markdown text for optimal display in AI assistants.

## Tools

### 1. `nasa_apod` - Astronomy Picture of the Day

Fetches NASA's daily featured astronomy image or video with detailed scientific explanation.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | string | No | Date in YYYY-MM-DD format. Defaults to today. |

#### Response Format

Returns markdown containing:
- Title and date
- Copyright information (if applicable)
- Detailed scientific explanation
- Image URLs (standard and HD)
- Video URL (if media type is video)

#### Example Usage

```json
{
  "tool": "nasa_apod",
  "arguments": {
    "date": "2024-01-01"
  }
}
```

#### Sample Response

```markdown
# Cosmic Cliffs in the Carina Nebula

**Date:** 2024-01-01
**Copyright:** NASA, ESA, CSA, STScI

## Explanation

What looks like craggy mountains on a moonlit evening...

## Image

- **Standard Resolution:** https://apod.nasa.gov/...
- **High Resolution:** https://apod.nasa.gov/...
```

---

### 2. `nasa_mars_rover_photos` - Mars Rover Photography

Retrieves photos from Mars rovers with filtering options.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `rover` | string | Yes | Rover name: "curiosity", "opportunity", "spirit", "perseverance" |
| `sol` | number | No | Martian day (sol) to get photos from |
| `earth_date` | string | No | Earth date in YYYY-MM-DD format |
| `camera` | string | No | Camera code (e.g., FHAZ, RHAZ, NAVCAM) |
| `limit` | number | No | Max photos to return (1-25, default: 5) |

#### Camera Codes

- `FHAZ` - Front Hazard Avoidance Camera
- `RHAZ` - Rear Hazard Avoidance Camera
- `MAST` - Mast Camera
- `CHEMCAM` - Chemistry and Camera Complex
- `MAHLI` - Mars Hand Lens Imager
- `MARDI` - Mars Descent Imager
- `NAVCAM` - Navigation Camera

#### Example Usage

```json
{
  "tool": "nasa_mars_rover_photos",
  "arguments": {
    "rover": "perseverance",
    "sol": 1000,
    "camera": "NAVCAM",
    "limit": 3
  }
}
```

---

### 3. `nasa_neo_feed` - Near Earth Objects

Tracks asteroids and comets passing near Earth within a date range.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | string | No | Start date in YYYY-MM-DD format (default: today) |
| `end_date` | string | No | End date in YYYY-MM-DD format (default: 7 days from start) |

#### Response Format

Returns markdown containing:
- Date range and total object count
- Daily breakdown of NEOs
- For each object:
  - Name and ID
  - Size estimates
  - Velocity and miss distance
  - Hazard status (marked with ⚠️ if potentially hazardous)
- Summary statistics

#### Example Usage

```json
{
  "tool": "nasa_neo_feed",
  "arguments": {
    "start_date": "2024-08-01",
    "end_date": "2024-08-07"
  }
}
```

---

### 4. `nasa_donki_space_weather` - Space Weather Events

Monitors solar and space weather phenomena from the DONKI database.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_type` | string | No | Event type code (default: "FLR") |
| `start_date` | string | No | Start date in YYYY-MM-DD format |
| `end_date` | string | No | End date in YYYY-MM-DD format |

#### Event Types

- `FLR` - Solar Flare
- `SEP` - Solar Energetic Particle
- `CME` - Coronal Mass Ejection
- `IPS` - Interplanetary Shock
- `MPC` - Magnetopause Crossing
- `GST` - Geomagnetic Storm
- `RBE` - Radiation Belt Enhancement

#### Response Format

Returns markdown containing:
- Event type and date range
- Total event count
- For each event:
  - Timing (begin, peak, end)
  - Classification/intensity
  - Source location
  - Instruments used
  - Additional details

#### Example Usage

```json
{
  "tool": "nasa_donki_space_weather",
  "arguments": {
    "event_type": "FLR",
    "start_date": "2024-08-01",
    "end_date": "2024-08-31"
  }
}
```

---

### 5. `nasa_epic_earth_imagery` - Earth Polychromatic Imaging

Provides full-disc Earth images from the DSCOVR satellite.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image_type` | string | No | "natural" or "enhanced" (default: "natural") |
| `date` | string | No | Date in YYYY-MM-DD format |
| `limit` | number | No | Max images to return (1-20, default: 5) |

#### Response Format

Returns markdown containing:
- Image type and count
- For each image:
  - Date and time
  - Earth center coordinates
  - DSCOVR distance from Earth
  - Direct image URL
- Information about the EPIC camera

#### Example Usage

```json
{
  "tool": "nasa_epic_earth_imagery",
  "arguments": {
    "image_type": "enhanced",
    "date": "2024-08-01",
    "limit": 3
  }
}
```

## Error Handling

All tools implement consistent error handling:

### Common Errors

1. **Invalid Parameters**: Returns clear error message about which parameter is invalid
2. **API Rate Limiting**: Indicates rate limit exceeded (use API key for higher limits)
3. **No Data Found**: Returns user-friendly message when no data matches criteria
4. **Network Errors**: Reports connection issues with NASA APIs

### Error Response Format

```markdown
Failed to fetch [resource]: [specific error message]
```

## Rate Limits

| API Key Type | Requests per Hour |
|--------------|-------------------|
| DEMO_KEY | 30 |
| Registered Key | 1000 |

## Best Practices

1. **Use specific dates** when possible to reduce response size
2. **Set reasonable limits** to avoid overwhelming responses
3. **Handle no-data scenarios** gracefully in your application
4. **Cache responses** when appropriate to reduce API calls
5. **Use your own API key** for production applications