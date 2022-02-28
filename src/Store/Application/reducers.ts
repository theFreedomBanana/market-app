import { ApplicationState } from "./";
import { APPLICATION_ACTIONS } from "./actions";

/**
 * application is a reducer that handles any events related to application on a global level.
 */
export const application = () => (state: ApplicationState = {}, payload: { error: string; type: string; }) => {
	const { error, type } = payload;
	if (type === APPLICATION_ACTIONS.THROW_ERROR) {

		return {
			...state,
			error,
		};
	} else if (type === APPLICATION_ACTIONS.DELETE_ERROR) {

		return {
			...state,
			error: undefined,
		};
	} else {

		return state;
	}
};
