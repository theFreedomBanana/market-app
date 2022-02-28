import { APPLICATION_ACTIONS } from "./Application/actions";
import { FEATURE_ACTIONS } from "./Feature/actions";
import { INFORMATION_ACTIONS } from "./Information/actions";

export const ACTIONS = {
	...APPLICATION_ACTIONS,
	...FEATURE_ACTIONS,
	...INFORMATION_ACTIONS,
};
