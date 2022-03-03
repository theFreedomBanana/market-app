import { put, takeEvery } from "redux-saga/effects";
import { ClassEnumeration, ValueOf } from "../Classes";
import { ACTIONS } from "./actions";

interface FetchRecordsParams {
	/**
	 * A list of additional params for the action
	 */
	readonly data: {
		/**
		 * The fetched model
		 */
		readonly className: string;
		/**
		 * A list of filters for the request
		 */
		readonly filters?: {
			/**
			 * The attribute to filter on
			 */
			readonly key: string;
			/**
			 * The value used to filter
			 */
			readonly value: string;
		}[];
		/**
		 * The name of the component fetching the data
		 * When passed the fetched data's slugs will be put into the component stage along with the request params
		 */
		readonly label?: string;
		/**
		 * The number of elements to fetch
		 */
		readonly limit?: number;
		/**
		 * How the request should e sorted
		 */
		readonly sort: {
			/**
			 * The attribute to sort by
			 */
			readonly key: string;
			/**
			 * The value defining how to sort
			 */
			readonly value: string;
		};
		/**
		 * Where the request should start
		 */
		readonly start?: number;
		/**
		 * The table to fetch
		 */
		readonly table: string;
	}
	/**
	 * The called action
	 */
	readonly type: typeof ACTIONS;
}

function* fetchRecords(actionParams: FetchRecordsParams) {
	const { className, label, table } = actionParams.data;
	const start = actionParams.data.start ? `&_start=${actionParams.data.start}` : "";
	const limit = actionParams.data.limit ? `&_limit=${actionParams.data.limit}` : "";
	const filter = actionParams.data.filters
		? actionParams.data.filters.reduce(
			(reduction: string, { key, value }: Required<FetchRecordsParams["data"]>["filters"][0]) => reduction + `&${key}_like=${value}`,
			"",
		) : "";
	const sort = actionParams.data.sort ? `&_sort=${actionParams.data.sort.key}&_order=${actionParams.data.sort.value}` : "";
	try {
		const asyncDbRequest = fetch(`${process.env.SERVER_URL}/${table}?${start}${limit}${filter}${sort}`);
		const records: ValueOf<ClassEnumeration>[] = yield asyncDbRequest.then((response) => response.json());
		const count: string = yield asyncDbRequest.then((response) => response.headers.get("X-Total-Count"));
		yield put({ className, records, type: ACTIONS.FETCH_SUCCEEDED });
		if (label) {
			yield put({
				count: parseInt(count, 10),
				fetchedSlugs: records.map(({ slug }) => slug),
				filters: actionParams.data.filters,
				label,
				limit: actionParams.data.limit,
				sort: actionParams.data.sort,
				start: actionParams.data.start,
				type: ACTIONS.UPDATE_FEATURE,
			});
		}
	} catch ({ message }) {
		yield put({ message, type: ACTIONS.THROW_ERROR });
	}
}

export function* sagaForFetchRequested() {
	yield takeEvery(ACTIONS.FETCH_REQUESTED, fetchRecords);
}
