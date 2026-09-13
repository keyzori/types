import type * as Public from "@keyzori/types";
import type {
	activationBody,
	sessionHeaders,
	sessionQuery,
	sessionParams,
} from "@keyzori/server/src/sessions/schemas.ts";
import type {
	activationResponse,
	heartbeatResponse,
	deactivationResponse,
	sessionResponse,
} from "@keyzori/server/src/sessions/responses.ts";
import type {
	pageQuery,
	idParams,
	reasonBody,
	collection,
} from "@keyzori/server/src/shared/schemas.ts";
import type {
	errorResponse,
	terminationResponse,
	statusResponse,
} from "@keyzori/server/src/shared/responses.ts";
import type { customerBody } from "@keyzori/server/src/customers/schemas.ts";
import type { customerResponse } from "@keyzori/server/src/customers/responses.ts";
import type {
	licenseConfig,
	licenseBody,
	licenseUpdate,
	renewalBody,
	licenseQuery,
} from "@keyzori/server/src/licenses/schemas.ts";
import type {
	blockResponse,
	licenseResponse,
	createdLicenseResponse,
} from "@keyzori/server/src/licenses/responses.ts";
import type {
	policyBody,
	allowlistBody,
	blockBody,
} from "@keyzori/server/src/access/schemas.ts";
import type {
	deviceResponse,
	ipResponse,
	registrationResponse,
	allowlistsResponse,
	accessResponse,
} from "@keyzori/server/src/access/responses.ts";
import type {
	meterBody,
	meterUpdate,
	usageBody,
	usageQuery,
} from "@keyzori/server/src/meters/schemas.ts";
import type {
	meterResponse,
	usageResponse,
} from "@keyzori/server/src/meters/responses.ts";
import type { activityQuery } from "@keyzori/server/src/activity/schemas.ts";
import type {
	activityResponse,
	statisticsResponse,
	pruneResponse,
} from "@keyzori/server/src/activity/responses.ts";
import type {
	linkBody,
	eventQuery,
} from "@keyzori/server/plugins/stripe/schemas.ts";
import type {
	linkResponse,
	eventResponse,
	retryResponse,
	receivedResponse,
} from "@keyzori/server/plugins/stripe/responses.ts";

/** Compare the serialized HTTP shape, including optional properties and nulls. */
type Wire<T> = T extends Date
	? string
	: T extends (infer V)[]
		? Wire<V>[]
		: T extends object
			? { [K in keyof T]: Wire<T[K]> }
			: T;
type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
type Expect<T extends true> = T;
export type PublicContract = [
	Expect<Equal<Wire<typeof idParams.infer>, Public.IdParams>>,
	Expect<Equal<Wire<typeof sessionParams.infer>, Public.SessionParams>>,
	Expect<
		Equal<Wire<typeof reasonBody.infer>, Wire<Public.RevokeLicenseRequest>>
	>,
	Expect<
		Equal<
			Wire<ReturnType<typeof collection<Public.Customer>>>,
			Public.Page<Public.Customer>
		>
	>,
	Expect<
		Equal<Wire<typeof activationBody.infer>, Wire<Public.ActivateRequest>>
	>,
	Expect<Equal<Wire<typeof sessionHeaders.infer>, Wire<Public.SessionHeaders>>>,
	Expect<Equal<Wire<typeof sessionQuery.infer>, Wire<Public.SessionQuery>>>,
	Expect<
		Equal<Wire<typeof activationResponse.infer>, Wire<Public.ActivateResponse>>
	>,
	Expect<
		Equal<Wire<typeof heartbeatResponse.infer>, Wire<Public.HeartbeatResponse>>
	>,
	Expect<
		Equal<
			Wire<typeof deactivationResponse.infer>,
			Wire<Public.DeactivateResponse>
		>
	>,
	Expect<Equal<Wire<typeof sessionResponse.infer>, Wire<Public.Session>>>,
	Expect<Equal<Wire<typeof pageQuery.infer>, Wire<Public.PageQuery>>>,
	Expect<Equal<Wire<typeof errorResponse.infer>, Wire<Public.ErrorResponse>>>,
	Expect<
		Equal<
			Wire<typeof terminationResponse.infer>,
			Wire<Public.TerminationResponse>
		>
	>,
	Expect<Equal<Wire<typeof statusResponse.infer>, Wire<Public.StatusResponse>>>,
	Expect<Equal<Wire<typeof customerBody.infer>, Wire<Public.CustomerInput>>>,
	Expect<Equal<Wire<typeof customerResponse.infer>, Wire<Public.Customer>>>,
	Expect<Equal<Wire<typeof licenseConfig.infer>, Wire<Public.LicenseConfig>>>,
	Expect<
		Equal<Wire<typeof licenseBody.infer>, Wire<Public.CreateLicenseRequest>>
	>,
	Expect<
		Equal<Wire<typeof licenseUpdate.infer>, Wire<Public.UpdateLicenseRequest>>
	>,
	Expect<
		Equal<Wire<typeof renewalBody.infer>, Wire<Public.RenewLicenseRequest>>
	>,
	Expect<Equal<Wire<typeof licenseQuery.infer>, Wire<Public.LicenseQuery>>>,
	Expect<Equal<Wire<typeof blockResponse.infer>, Wire<Public.LicenseBlock>>>,
	Expect<Equal<Wire<typeof licenseResponse.infer>, Wire<Public.License>>>,
	Expect<
		Equal<
			Wire<typeof createdLicenseResponse.infer>,
			Wire<Public.CreatedLicense>
		>
	>,
	Expect<Equal<Wire<typeof policyBody.infer>, Wire<Public.AccessPolicyInput>>>,
	Expect<Equal<Wire<typeof allowlistBody.infer>, Wire<Public.AllowlistsInput>>>,
	Expect<
		Equal<Wire<typeof blockBody.infer>, Wire<Public.BlockRegistrationRequest>>
	>,
	Expect<
		Equal<Wire<typeof deviceResponse.infer>, Wire<Public.DeviceRegistration>>
	>,
	Expect<Equal<Wire<typeof ipResponse.infer>, Wire<Public.IpRegistration>>>,
	Expect<
		Equal<Wire<typeof registrationResponse.infer>, Wire<Public.Registration>>
	>,
	Expect<Equal<Wire<typeof allowlistsResponse.infer>, Wire<Public.Allowlists>>>,
	Expect<Equal<Wire<typeof accessResponse.infer>, Wire<Public.Access>>>,
	Expect<Equal<Wire<typeof meterBody.infer>, Wire<Public.CreateMeterRequest>>>,
	Expect<
		Equal<Wire<typeof meterUpdate.infer>, Wire<Public.UpdateMeterRequest>>
	>,
	Expect<Equal<Wire<typeof usageBody.infer>, Wire<Public.ConsumeRequest>>>,
	Expect<Equal<Wire<typeof usageQuery.infer>, Wire<Public.UsageQuery>>>,
	Expect<Equal<Wire<typeof meterResponse.infer>, Wire<Public.Meter>>>,
	Expect<Equal<Wire<typeof usageResponse.infer>, Wire<Public.Usage>>>,
	Expect<Equal<Wire<typeof activityQuery.infer>, Wire<Public.ActivityQuery>>>,
	Expect<Equal<Wire<typeof activityResponse.infer>, Wire<Public.Activity>>>,
	Expect<
		Equal<
			Wire<typeof statisticsResponse.infer>,
			Wire<Public.ActivityStatistics>
		>
	>,
	Expect<
		Equal<Wire<typeof pruneResponse.infer>, Wire<Public.PruneActivityResponse>>
	>,
	Expect<Equal<Wire<typeof linkBody.infer>, Wire<Public.StripeLinkRequest>>>,
	Expect<Equal<Wire<typeof eventQuery.infer>, Wire<Public.StripeEventQuery>>>,
	Expect<Equal<Wire<typeof linkResponse.infer>, Wire<Public.StripeLink>>>,
	Expect<Equal<Wire<typeof eventResponse.infer>, Wire<Public.StripeEvent>>>,
	Expect<
		Equal<Wire<typeof retryResponse.infer>, Wire<Public.StripeRetryResponse>>
	>,
	Expect<
		Equal<
			Wire<typeof receivedResponse.infer>,
			Wire<Public.StripeWebhookResponse>
		>
	>,
];
