# @keyzori/types

Shared public request and response types for the Keyzori server and SDK. The package has no runtime dependencies and supports TypeScript 5+ in ESM and CommonJS projects.

```ts
import type { ActivateRequest, ActivateResponse, Customer, Page } from "@keyzori/types";
```

Names follow the API: `Customer`, `License`, `ActivateRequest`, `HeartbeatResponse`, `ConsumeRequest`, and `Usage`. Dates are ISO strings after JSON serialization. Heartbeats return a license ID, type, and TTL; they do not return a new token or metadata. Types describe shapes; the server still validates values and permissions.

`Metadata` follows the server's `Record<string, unknown>` schema. `JsonValue` and `JsonObject` are available when an application wants stricter JSON-only metadata.

## Development

Keep `types`, `server`, and `ts-sdk` as sibling directories. Use Bun for dependency management and Node for package tests:

```sh
bun install --frozen-lockfile
bun run check
bun run test:contract
bun pm pack --destination .artifacts
```

Contract checks compare every exported server request/response schema with these types, including optional fields, nulls, and serialized dates. Install server dependencies before running them.

## Releases

Release Please creates the version PR, changelog, tag, and GitHub release after CI and CodeQL pass. Configure `RELEASE_TOKEN` for release PRs and `NPM_TOKEN` for npm publishing. Publish the types release before its dependent SDK release. No credentials are stored here.
