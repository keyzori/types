/** JSON dates are ISO strings on the HTTP wire, never JavaScript Date objects. */
export type * from "./endpoints.js";
export type Timestamp = string;
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
/** Server schemas allow arbitrary metadata values; HTTP serialization produces JSON. */
export type Metadata = Record<string, unknown>;
export type LicenseType = "lifetime" | "subscription" | "metered" | "trial";
export interface PageQuery {
	limit?: string;
	offset?: string;
}
export interface Page<T> {
	items: T[];
	limit: number;
	offset: number;
	hasMore: boolean;
}
export interface ErrorResponse {
	error: { code: string; message: string };
}
export interface StatusResponse {
	status: string;
}
export interface TerminationResponse {
	terminated: boolean;
}
export interface ActivateRequest {
	key: string;
	deviceId: string;
}
export interface SessionHeaders {
	authorization: string;
	"x-device-id": string;
}
export interface HeartbeatResponse {
	licenseId: string;
	type: LicenseType;
	expiresIn: number;
}
export interface ActivateResponse extends HeartbeatResponse {
	token: string;
	metadata: Metadata;
}
export interface DeactivateResponse {
	deactivated: boolean;
}
export interface Session {
	id: string;
	licenseId: string;
	revision: number;
	ttl: number;
}
export interface SessionQuery extends PageQuery {
	licenseId: string;
}
export interface ConsumeRequest {
	meter: string;
	units: number;
	eventId: string;
}
export interface Usage {
	id: string;
	licenseId: string;
	meterId: string;
	eventId: string;
	units: number;
	used: number;
	remaining: number;
	createdAt: Timestamp;
}
export interface CustomerInput {
	email: string;
	name: string;
	metadata?: Metadata;
}
export interface Customer {
	id: string;
	email: string;
	name: string;
	metadata: Metadata;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
export type LicenseConfig =
	| { type: "lifetime" }
	| { type: "metered" }
	| { type: "subscription"; expiresAt: string }
	| { type: "trial"; durationSeconds: number };
export interface CreateLicenseRequest {
	customerId: string;
	config: LicenseConfig;
	metadata?: Metadata;
}
export interface UpdateLicenseRequest {
	customerId?: string;
	metadata?: Metadata;
}
export interface RenewLicenseRequest {
	expiresAt: string;
}
export interface LicenseQuery extends PageQuery {
	customerId?: string;
	type?: LicenseType;
}
export interface LicenseBlock {
	licenseId: string;
	source: string;
	reason: string;
	createdAt: Timestamp;
}
export interface License {
	id: string;
	customerId: string;
	type: LicenseType;
	policyRevision: number;
	maxDevices: number;
	maxIps: number;
	maxSessions: number;
	deviceAllowlistEnabled: boolean;
	ipAllowlistEnabled: boolean;
	metadata: Metadata;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	subscription?: { licenseId: string; expiresAt: Timestamp } | null;
	trial?: {
		licenseId: string;
		durationSeconds: number;
		activatedAt: Timestamp | null;
		expiresAt: Timestamp | null;
	} | null;
	blocks?: LicenseBlock[];
}
/** The secret key is returned only when creating or rotating a license. */
export interface CreatedLicense extends License {
	key: string;
}
export interface AccessPolicyInput {
	maxDevices?: number;
	maxIps?: number;
	maxSessions?: number;
	deviceAllowlistEnabled?: boolean;
	ipAllowlistEnabled?: boolean;
}
export interface AllowlistsInput {
	devices: string[];
	networks: string[];
}
export interface Allowlists {
	devices: { fingerprint: string }[];
	networks: { network: string }[];
}
export interface Access {
	license: License;
	allowlists: Allowlists;
}
export interface DeviceRegistration {
	id: string;
	licenseId: string;
	fingerprint: string;
	blocked: boolean;
	createdAt: Timestamp;
}
export interface IpRegistration {
	id: string;
	licenseId: string;
	address: string;
	blocked: boolean;
	createdAt: Timestamp;
}
export type Registration = DeviceRegistration | IpRegistration;
export interface BlockRegistrationRequest {
	blocked: boolean;
}
export interface RevokeLicenseRequest {
	reason?: string;
}
export interface CreateMeterRequest {
	licenseId: string;
	name: string;
	limit: number;
}
export interface UpdateMeterRequest {
	limit: number;
}
export interface Meter {
	id: string;
	licenseId: string;
	name: string;
	limit: number;
	used: number;
	createdAt: Timestamp;
}
export interface UsageQuery extends PageQuery {
	licenseId: string;
	meterId?: string;
}
export interface ActivityQuery extends PageQuery {
	licenseId?: string;
	customerId?: string;
	action?: string;
	source?: string;
	from?: string;
	to?: string;
}
export interface Activity {
	id: string;
	licenseId: string | null;
	customerId: string | null;
	action: string;
	source: string;
	createdAt: Timestamp;
}
export interface ActivityStatistics {
	items: { action: string; count: number }[];
	retentionDays: number;
}
export interface PruneActivityResponse {
	deleted: number;
}
export interface StripeLinkRequest {
	licenseId: string;
	subscriptionId: string;
}
export interface StripeLink {
	id: string;
	licenseId: string;
	subscriptionId: string;
	customerId: string;
	status: string;
	syncedAt: Timestamp;
}
export interface StripeEventQuery extends PageQuery {
	state?: "pending" | "processing" | "completed";
}
export interface StripeEvent {
	id: string;
	eventId: string;
	eventType: string;
	subscriptionId: string | null;
	state: string;
	attempts: number;
	nextAttemptAt: Timestamp;
	createdAt: Timestamp;
	completedAt: Timestamp | null;
}
export interface StripeRetryResponse {
	id: string;
	state: string;
}
export interface StripeWebhookResponse {
	received: boolean;
}
