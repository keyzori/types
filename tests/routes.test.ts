import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { createHttp } from "@keyzori/server/src/application/http.ts";
import type { Services } from "@keyzori/server/src/application/Services.ts";
import { Config } from "@keyzori/server/src/shared/Config.ts";
import StripePlugin from "@keyzori/server/plugins/stripe/index.ts";
import type { PluginContext } from "@keyzori/server/src/plugins/contract.ts";

test("every core and Stripe HTTP endpoint has a shared type entry", () => {
	const env = {
		KEYZORI_ADMIN_KEY: "test-only-admin-key-with-at-least-32-characters",
		KEYZORI_DATABASE_URL: "postgresql://localhost/contracts",
		KEYZORI_REDIS_URL: "redis://localhost",
		KEYZORI_STRIPE_SECRET_KEY: "sk_test_local",
		KEYZORI_STRIPE_WEBHOOK_SECRET: "whsec_test",
	};
	const { app, guard } = createHttp(new Config(env), {} as Services, {
		ready: false,
	});
	const plugin = new StripePlugin().create({
		env,
		adminGuard: guard,
	} as PluginContext);
	const actual = [...app.routes, ...plugin.routes]
		.filter(({ path }) => !["/docs", "/openapi.json"].includes(path))
		.map(({ method, path }) => `${method} ${path.replace(/\/$/, "")}`)
		.sort();
	const source = readFileSync(
		new URL("../src/endpoints.ts", import.meta.url),
		"utf8",
	);
	const declared = [
		...source.matchAll(/"((?:GET|POST|PUT|PATCH|DELETE) [^"]+)":/g),
	]
		.map((match) => match[1])
		.sort();
	expect(declared).toEqual(actual);
});
