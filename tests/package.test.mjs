import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const require = createRequire(import.meta.url);
test("types have empty, loadable ESM and CommonJS runtime entrypoints", async () => {
	assert.deepEqual(Object.keys(await import("../dist/esm/index.js")), []);
	assert.deepEqual(Object.keys(require("../dist/cjs/index.js")), []);
	for (const format of ["esm", "cjs"])
		assert.match(
			readFileSync(
				new URL(`../dist/${format}/index.d.ts`, import.meta.url),
				"utf8",
			),
			/interface ActivateResponse/,
		);
});
test("release metadata rejects an unrelated tag", () => {
	assert.throws(() =>
		execFileSync(process.execPath, ["scripts/verifyRelease.mjs", "v999.0.0"], {
			stdio: "pipe",
		}),
	);
});
