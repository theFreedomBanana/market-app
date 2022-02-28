import { FeatureState } from "./";
import { FEATURE_ACTIONS } from "./actions";

/**
 * feature is a reducer that handles any event related to the displayed components, aka features.
 */
export const feature = () => (
	state: FeatureState = {}, payload: { label: string; type: FEATURE_ACTIONS; [otherArgs: string]: any },
) => {
	const { label, type, ...params } = payload;
	if (type === FEATURE_ACTIONS.UPDATE_FEATURE) {
		const nextState = {
			...state,
			...label.split(".").reduceRight(
				(node, field, index, array) => ({
					[field]: {
						...array.slice(0, index + 1).reduce((reduction: any, key) => reduction?.[key], state),
						...node,
					},
				}),
				params,
			),
		};

		return nextState;
	} else if (type === FEATURE_ACTIONS.DELETE_FEATURE) {

		return {
			...state,
			...label.split(".").reduceRight(
				(node: any, field, index, array) => {
					const thing = {
						[field]: array.length === 1
							? undefined
							: {
								...array.slice(0, index + 1).reduce((reduction: any, key) => reduction?.[key], state),
								...node,
							},
					};
					if (index === array.length - 2) {
						delete thing[field][array[array.length - 1]];
					}

					return thing;
				},
				undefined,
			),
		};
	} else {

		return state;
	}
};
