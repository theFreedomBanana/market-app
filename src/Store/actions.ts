import { APPLICATION_ACTIONS } from "./Application/actions";
import { CONTROLLERS_ACTIONS } from "./Controllers/actions";
import { INFORMATION_ACTIONS } from "./Information/actions";

export const ACTIONS = {
	...APPLICATION_ACTIONS,
	...CONTROLLERS_ACTIONS.FEATURE_ACTIONS,
	...CONTROLLERS_ACTIONS.UTILITY_ACTIONS,
	...INFORMATION_ACTIONS,
};
