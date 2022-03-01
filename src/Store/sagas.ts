import { put, takeEvery } from "redux-saga/effects";

import { ACTIONS } from "./actions";
import { Item } from "../Classes/Item";

interface ActionParams {
	readonly data: {
		readonly label: string;
		readonly limit: number;
		readonly start: number;
	}
	readonly type: typeof ACTIONS;
}

function* fetchItems(actionParams: ActionParams) {
	const { label, limit = 16, start = 0 } = actionParams.data;
	try {
		const items = fetch(`http://localhost:3000/items?_limit=${limit}&_start=${start}`);
		const results: Item[] = yield items.then((response) => response.json());
		const count: string = yield items.then((response) => response.headers.get("X-Total-Count"));
		yield put({ items: results, type: ACTIONS.FETCH_SUCCEEDED });
		yield put({
			count: parseInt(count, 10),
			fetchedSlugs: results.map(({ slug }) => slug),
			label,
			limit,
			start,
			type: ACTIONS.UPDATE_FEATURE,
		});
	} catch ({ message }) {
		yield put({ message, type: ACTIONS.THROW_ERROR });
	}
}

export function* sagaForFetchRequested() {
	yield takeEvery(ACTIONS.FETCH_REQUESTED, fetchItems);
}
