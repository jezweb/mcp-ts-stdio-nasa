# Contributing to MCP TypeScript NASA Server

First off, thank you for considering contributing to this project! 🚀

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (OS, Node version, npm version)
- Relevant logs or error messages

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- Detailed description of the proposed enhancement
- Use cases and examples
- Possible implementation approach (if you have one)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Add tests** if applicable
5. **Update documentation** if needed
6. **Run tests and linting**: `npm run lint` and `npm test`
7. **Commit your changes** using conventional commits
8. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/mcp-ts-stdio-nasa.git
cd mcp-ts-stdio-nasa

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Test with MCP Inspector
npm run mcp:inspect
```

## Coding Standards

### TypeScript Guidelines

- Use TypeScript strict mode
- Define types for all function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use enums for fixed sets of values
- Document complex types with JSDoc comments

### Code Style

- Follow the existing code style (enforced by ESLint and Prettier)
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Use async/await over promises when possible

### File Structure

```
src/
├── tools/         # One file per NASA API tool
├── services/      # API service layer
├── types/         # TypeScript type definitions
└── utils/         # Shared utilities
```

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add NASA Exoplanet Archive tool
fix: handle rate limiting in APOD requests
docs: update Mars Rover camera codes
```

## Adding New NASA API Tools

To add a new NASA API integration:

1. **Create the tool file** in `src/tools/`:
```typescript
// src/tools/your-tool.tool.ts
import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

const YourToolSchema = z.object({
  // Define parameters
});

export const yourTool = {
  definition: {
    name: 'nasa_your_tool',
    description: 'Description of what it does',
    inputSchema: { /* ... */ },
  } as Tool,
  
  handler: async (args: Record<string, unknown>): Promise<string> => {
    // Implementation
  },
};
```

2. **Add NASA API types** to `src/types/nasa.ts`

3. **Add service method** to `src/services/nasa.service.ts`

4. **Register the tool** in `src/tools/index.ts`

5. **Update documentation** in README.md

## Testing

### Manual Testing

Use the MCP Inspector to test your changes:

```bash
npm run build
npm run mcp:inspect
```

### Testing Checklist

- [ ] Tool responds correctly to valid inputs
- [ ] Tool handles errors gracefully
- [ ] Tool returns properly formatted markdown
- [ ] API rate limits are respected
- [ ] Documentation is clear and accurate

## Documentation

- Update README.md for new features or tools
- Add JSDoc comments for public functions
- Include example queries for new tools
- Update CHANGELOG.md for releases

## Questions?

Feel free to open an issue for:
- Questions about the codebase
- Clarification on requirements
- Help with your contribution

## License

By contributing, you agree that your contributions will be licensed under the MIT License.