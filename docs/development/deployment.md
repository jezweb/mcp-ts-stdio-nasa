# Deployment & Publishing Guide

This guide covers how to deploy and publish the MCP TypeScript NASA Server.

## Current Status

- **npm Package**: Published as `mcp-ts-stdio-nasa` v0.2.0
- **GitHub Repository**: https://github.com/jezweb/mcp-ts-stdio-nasa
- **Package URL**: https://www.npmjs.com/package/mcp-ts-stdio-nasa

## Publishing to npm

### Prerequisites

1. npm account (create at https://www.npmjs.com/)
2. Login to npm: `npm login`
3. Proper version in package.json

### Publishing Process

1. **Update Version** (if needed):
```bash
npm version patch  # for bug fixes (0.1.0 → 0.1.1)
npm version minor  # for new features (0.1.0 → 0.2.0)
npm version major  # for breaking changes (0.1.0 → 1.0.0)
```

2. **Build the Project**:
```bash
npm run clean
npm run build
```

3. **Test the Package**:
```bash
npm pack --dry-run  # See what will be published
```

4. **Publish**:
```bash
npm publish
```

5. **Create Git Tag**:
```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

## GitHub Release

1. Go to https://github.com/jezweb/mcp-ts-stdio-nasa/releases
2. Click "Create a new release"
3. Choose the tag (e.g., v0.1.0)
4. Add release notes from CHANGELOG.md
5. Publish release

## Verification

After publishing, verify the deployment:

### npm Verification
```bash
# Check package info
npm view mcp-ts-stdio-nasa

# Test installation
npx mcp-ts-stdio-nasa

# Check global installation
npm install -g mcp-ts-stdio-nasa
mcp-ts-stdio-nasa --version
```

### GitHub Verification
- Check that the tag appears in the repository
- Verify the release is visible on the releases page
- Ensure all CI checks pass (if configured)

## Distribution Channels

The package is available through:

1. **npx** (No installation):
```bash
npx mcp-ts-stdio-nasa
```

2. **Global Installation**:
```bash
npm install -g mcp-ts-stdio-nasa
```

3. **Project Dependency**:
```bash
npm install mcp-ts-stdio-nasa
```

4. **Direct from GitHub**:
```bash
npm install github:jezweb/mcp-ts-stdio-nasa
```

## Maintenance

### Regular Updates

1. Keep dependencies updated:
```bash
npm update
npm audit fix
```

2. Update NASA API compatibility as needed

3. Follow semantic versioning:
- PATCH: Bug fixes, documentation updates
- MINOR: New features, backwards compatible
- MAJOR: Breaking changes

### Version History

- **v0.2.0** (2025-08-10): Added Resources and Prompts features
- **v0.1.0** (2025-08-10): Initial release with 5 NASA API tools

## Troubleshooting

### Publishing Issues

If publishing fails:

1. Check npm login: `npm whoami`
2. Verify package name availability
3. Ensure version is incremented
4. Check .npmignore file
5. Verify build output in dist/

### Package Size

Current size: 18.7 kB (packed) / 72.4 kB (unpacked)

To check size before publishing:
```bash
npm pack --dry-run
```

## Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Keep dependencies updated
- Run `npm audit` regularly

## Support

- Issues: https://github.com/jezweb/mcp-ts-stdio-nasa/issues
- npm Package: https://www.npmjs.com/package/mcp-ts-stdio-nasa
- Author: jeremy@jezweb.net