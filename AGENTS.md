# Shared Keyzori types

- This repository owns public HTTP types. Use plain names such as Customer, License, ActivateRequest, and HeartbeatResponse.
- Keep requests, responses, pagination, errors, and optional plugin types synchronized with the server. Dates on the wire are strings.
- Update and run server/SDK contract checks whenever changing types. Never weaken an assertion to hide contract drift.
- Publish JavaScript and declarations for ESM and CommonJS. No runtime dependencies or Bun APIs in public output.
- Use Bun for dependency management, Node for package tests, TypeScript and Biome. Run `bun run check`.
- Release Please manages versions. Publish this package before releasing a dependent SDK version.
- Preserve unrelated work and never commit secrets.
