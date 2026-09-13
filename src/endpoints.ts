import type * as T from "./index.js";

export type IdParams = { id: string };
export type SessionParams = { id: string; sessionId: string };
export type RegistrationParams = { id: string; registrationId: string };
export type EmptyRequest = Record<string, never>;
/** Select a request/response type with ApiEndpoints["POST /sessions"]["body"]. */
export interface Endpoint<
	Body,
	Response,
	Params = EmptyRequest,
	Query = EmptyRequest,
	Headers = EmptyRequest,
> {
	body: Body;
	response: Response;
	params: Params;
	query: Query;
	headers: Headers;
}
export interface AdminHeaders {
	"x-admin-key": string;
}
type AdminEndpoint<
	Body,
	Response,
	Params = EmptyRequest,
	Query = EmptyRequest,
> = Endpoint<Body, Response, Params, Query, AdminHeaders>;
type AdminRead<
	Response,
	Params = EmptyRequest,
	Query = EmptyRequest,
> = AdminEndpoint<never, Response, Params, Query>;
type Read<Response, Params = EmptyRequest, Query = EmptyRequest> = Endpoint<
	never,
	Response,
	Params,
	Query
>;
type SessionEndpoint<Body, Response> = Endpoint<
	Body,
	Response,
	EmptyRequest,
	EmptyRequest,
	T.SessionHeaders
>;

export interface ApiEndpoints {
	"GET /health": Read<T.StatusResponse>;
	"GET /ready": Read<T.StatusResponse>;
	"POST /sessions": Endpoint<T.ActivateRequest, T.ActivateResponse>;
	"POST /sessions/heartbeat": SessionEndpoint<
		EmptyRequest,
		T.HeartbeatResponse
	>;
	"POST /sessions/deactivate": SessionEndpoint<
		EmptyRequest,
		T.DeactivateResponse
	>;
	"POST /usage": SessionEndpoint<T.ConsumeRequest, T.Usage>;
	"GET /admin/customers": AdminRead<
		T.Page<T.Customer>,
		EmptyRequest,
		T.PageQuery
	>;
	"POST /admin/customers": AdminEndpoint<T.CustomerInput, T.Customer>;
	"GET /admin/customers/:id": AdminRead<T.Customer, IdParams>;
	"PUT /admin/customers/:id": AdminEndpoint<
		T.CustomerInput,
		T.Customer,
		IdParams
	>;
	"DELETE /admin/customers/:id": AdminRead<T.Customer, IdParams>;
	"GET /admin/licenses": AdminRead<
		T.Page<T.License>,
		EmptyRequest,
		T.LicenseQuery
	>;
	"POST /admin/licenses": AdminEndpoint<
		T.CreateLicenseRequest,
		T.CreatedLicense
	>;
	"GET /admin/licenses/:id": AdminRead<T.License, IdParams>;
	"PATCH /admin/licenses/:id": AdminEndpoint<
		T.UpdateLicenseRequest,
		T.License,
		IdParams
	>;
	"PUT /admin/licenses/:id/type": AdminEndpoint<
		T.LicenseConfig,
		T.License,
		IdParams
	>;
	"POST /admin/licenses/:id/renew": AdminEndpoint<
		T.RenewLicenseRequest,
		T.License,
		IdParams
	>;
	"POST /admin/licenses/:id/rotate": AdminEndpoint<
		EmptyRequest,
		T.CreatedLicense,
		IdParams
	>;
	"POST /admin/licenses/:id/revoke": AdminEndpoint<
		T.RevokeLicenseRequest,
		T.License,
		IdParams
	>;
	"POST /admin/licenses/:id/restore": AdminEndpoint<
		EmptyRequest,
		T.License,
		IdParams
	>;
	"GET /admin/access/:id": AdminRead<T.Access, IdParams>;
	"PATCH /admin/access/:id": AdminEndpoint<
		T.AccessPolicyInput,
		T.License,
		IdParams
	>;
	"PUT /admin/access/:id/allowlists": AdminEndpoint<
		T.AllowlistsInput,
		T.Allowlists,
		IdParams
	>;
	"GET /admin/access/:id/devices": AdminRead<
		T.Page<T.DeviceRegistration>,
		IdParams,
		T.PageQuery
	>;
	"GET /admin/access/:id/ips": AdminRead<
		T.Page<T.IpRegistration>,
		IdParams,
		T.PageQuery
	>;
	"PATCH /admin/access/:id/devices/:registrationId": AdminEndpoint<
		T.BlockRegistrationRequest,
		T.Registration,
		RegistrationParams
	>;
	"DELETE /admin/access/:id/devices/:registrationId": AdminRead<
		T.Registration,
		RegistrationParams
	>;
	"PATCH /admin/access/:id/ips/:registrationId": AdminEndpoint<
		T.BlockRegistrationRequest,
		T.Registration,
		RegistrationParams
	>;
	"DELETE /admin/access/:id/ips/:registrationId": AdminRead<
		T.Registration,
		RegistrationParams
	>;
	"GET /admin/sessions": AdminRead<
		T.Page<T.Session>,
		EmptyRequest,
		T.SessionQuery
	>;
	"DELETE /admin/sessions/:id": AdminRead<T.TerminationResponse, IdParams>;
	"DELETE /admin/sessions/:id/:sessionId": AdminRead<
		T.TerminationResponse,
		SessionParams
	>;
	"GET /admin/meters": AdminRead<T.Page<T.Meter>, EmptyRequest, T.UsageQuery>;
	"POST /admin/meters": AdminEndpoint<T.CreateMeterRequest, T.Meter>;
	"GET /admin/meters/:id": AdminRead<T.Meter, IdParams>;
	"PATCH /admin/meters/:id": AdminEndpoint<
		T.UpdateMeterRequest,
		T.Meter,
		IdParams
	>;
	"GET /admin/usage": AdminRead<T.Page<T.Usage>, EmptyRequest, T.UsageQuery>;
	"GET /admin/activity": AdminRead<
		T.Page<T.Activity>,
		EmptyRequest,
		T.ActivityQuery
	>;
	"GET /admin/activity/statistics": AdminRead<
		T.ActivityStatistics,
		EmptyRequest,
		T.ActivityQuery
	>;
	"POST /admin/activity/prune": AdminEndpoint<
		EmptyRequest,
		T.PruneActivityResponse
	>;
	"GET /plugins/stripe/admin/links": AdminRead<
		T.Page<T.StripeLink>,
		EmptyRequest,
		T.PageQuery
	>;
	"POST /plugins/stripe/admin/links": AdminEndpoint<
		T.StripeLinkRequest,
		T.StripeLink
	>;
	"DELETE /plugins/stripe/admin/links/:id": AdminRead<T.StripeLink, IdParams>;
	"POST /plugins/stripe/admin/links/:id/sync": AdminEndpoint<
		EmptyRequest,
		T.StripeLink,
		IdParams
	>;
	"GET /plugins/stripe/admin/events": AdminRead<
		T.Page<T.StripeEvent>,
		EmptyRequest,
		T.StripeEventQuery
	>;
	"POST /plugins/stripe/admin/events/:id/retry": AdminEndpoint<
		EmptyRequest,
		T.StripeRetryResponse,
		IdParams
	>;
	/** Raw signed bytes; do not parse and reserialize Stripe webhook bodies. */
	"POST /plugins/stripe/webhook": Endpoint<
		Uint8Array,
		T.StripeWebhookResponse,
		EmptyRequest,
		EmptyRequest,
		{ "stripe-signature": string }
	>;
}
