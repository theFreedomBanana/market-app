import { InformationState } from "./";
import { Item } from "../../Classes/Item";

/**
 * information is a reducer that handles any events related to the database operations.
 */
export const information = (EMPTY_STATE: InformationState) => (state = EMPTY_STATE, payload: { items: Item[] }) => {
	const nextState = {
		...state,
		item: {
			...state?.item,
			...payload.items?.reduce(
				(reduction: { [itemSlug: string]: Item }, item: Item) => ({
					...reduction,
					[item.slug]: item,
				}),
				{},
			),
		},
	};

	return nextState;
};
