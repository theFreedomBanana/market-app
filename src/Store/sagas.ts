import { put, takeEvery } from "redux-saga/effects";

import { ACTIONS } from "./actions";
import { Item } from "../Classes/Item";

interface ActionParams {
	readonly data: {
		readonly label: string;
		readonly limit: number;
	}
	readonly type: typeof ACTIONS;
}

function* fetchItems(actionParams: ActionParams) {
	const { label, limit } = actionParams.data;
	try {
		const items = fetch(`http://localhost:3000/items?_limit=${limit || 16}`);
		const results: Item[] = yield items.then((response) => response.json());
		yield put({ items: results, type: ACTIONS.FETCH_SUCCEEDED });
		yield put({
			fetchedSlugs: results.map(({ slug }) => slug),
			label,
			type: ACTIONS.UPDATE_FEATURE,
		});
	} catch ({ message }) {
		yield put({ message, type: ACTIONS.THROW_ERROR });
	}
}

export function* sagaForFetchRequested() {
	yield takeEvery(ACTIONS.FETCH_REQUESTED, fetchItems);
}
