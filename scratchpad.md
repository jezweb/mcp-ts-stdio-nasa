# MCP NASA Server - Resources and Prompts Implementation

## Current Status
- Version: 0.1.0
- Has 5 working tools (APOD, Mars Rover, NEO, DONKI, EPIC)
- No resources or prompts yet

## Implementation Plan

### Phase 1: Update Server Capabilities ✅
- [x] Update index.ts to add resources and prompts capabilities
- [x] Test server still starts

### Phase 2: Implement Static Resources
- [ ] Create resources directory structure
- [ ] Implement NASA config resource
- [ ] Test static resource

### Phase 3: Implement Dynamic Resources (Templates)
- [ ] APOD resource with date parameter
- [ ] Rover resource with rover name parameter
- [ ] Test dynamic resources

### Phase 4: Implement Prompts
- [ ] Create prompts directory structure
- [ ] Implement explain-apod prompt
- [ ] Implement space-weather-report prompt
- [ ] Test prompts

### Phase 5: Testing & Documentation
- [x] Run full test suite - Build passes!
- [ ] Update version to 0.2.0
- [ ] Update README with examples
- [ ] Commit changes

## Notes
- Keep it simple - no over-engineering
- Follow existing patterns in the codebase
- Test each component as we go
- Use existing NASA service where possible

## Resource URIs
- `nasa://config` - Static config
- `nasa://apod/{date}` - APOD by date
- `nasa://rover/{rover}/latest` - Latest rover photos
- `nasa://neo/{id}` - Specific NEO details

## Prompts
- `explain-apod` - Educational APOD explanation
- `space-weather-report` - Space weather summary
- `asteroid-analysis` - NEO risk assessment