import { InformationState } from "./";
import { ClassEnumeration, ValueOf } from "../../Classes";
import { INFORMATION_ACTIONS } from "./actions";

/**
 * information is a reducer that handles any events related to the database operations.
 */
export const information = (
	EMPTY_STATE: InformationState,
) => (
	state = EMPTY_STATE,
	payload: { className: keyof InformationState; type: INFORMATION_ACTIONS, records: ValueOf<ClassEnumeration>[] },
) => {
	if (payload.type === INFORMATION_ACTIONS.FETCH_SUCCEEDED) {
		const nextState = {
			...state,
			[payload.className]: {
				...state?.[payload.className],
				...payload.records?.reduce(
					(reduction: InformationState, record: ValueOf<ClassEnumeration>) => ({
						...reduction,
						[record.slug]: record,
					}),
					{},
				),
			},
		};

		return nextState;
	} else {

		return state;
	}
};
