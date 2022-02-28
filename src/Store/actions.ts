import { APPLICATION_ACTIONS } from "./Application/actions";
import { INFORMATION_ACTIONS } from "./Information/actions";

export const ACTIONS = {
	...APPLICATION_ACTIONS,
	...INFORMATION_ACTIONS,
};
