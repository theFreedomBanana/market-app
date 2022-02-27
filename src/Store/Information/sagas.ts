import { put, takeEvery } from "redux-saga/effects";

import { INFORMATION_ACTIONS } from "./actions";
import { Item } from "../../Classes/Item";

function* fetchItems() {
	try {
		const items = fetch("http://localhost:3000/items");
		const results: Item[] = yield items.then((response) => response.json());
		yield put({ items: results, type: INFORMATION_ACTIONS.FETCH_SUCCEEDED });
	} catch ({ message }) {
		yield put({ message, type: INFORMATION_ACTIONS.FETCH_FAILED });
	}
}


export function* sagaForFetchRequested() {
	yield takeEvery(INFORMATION_ACTIONS.FETCH_REQUESTED, fetchItems);
}
