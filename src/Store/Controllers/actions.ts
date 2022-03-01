/**
 * FEATURE_ACTIONS represents the actions that are interpreted by the feature reducers.
 */
export enum FEATURE_ACTIONS {
	DELETE_FEATURE = "DELETE_FEATURE",
	UPDATE_FEATURE = "UPDATE_FEATURE",
}

/**
 * UTILITY_ACTIONS represents the actions that are interpreted by the utility reducers.
 */
export enum UTILITY_ACTIONS {
	DELETE_UTILITY = "DELETE_UTILITY",
	UPDATE_UTILITY = "UPDATE_UTILITY",
}

/**
 * CONTROLLERS_ACTIONS represents the combination of all controllers actions, e.g feature and utility.
 */
export const CONTROLLERS_ACTIONS = {
	FEATURE_ACTIONS: FEATURE_ACTIONS,
	UTILITY_ACTIONS: UTILITY_ACTIONS,
};
