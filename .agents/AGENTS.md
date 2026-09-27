# Project Rules

- **Git Workflow**: Always commit and push changes exclusively to `main` (`git commit` and `git push origin main`) after completing modifications, unless explicitly told otherwise by the user. Do NOT push directly to `develop`; a nocturnal GitHub Actions workflow automatically syncs `main` into `develop` every night at 23:55 if there were changes.
- **Testing Workflow**: Do NOT open Chrome or use browser subagents for testing unless explicitly asked by the user. Verify changes exclusively via fast terminal commands (`npm run build`, linting, unit tests, scripts, curl, etc.).
