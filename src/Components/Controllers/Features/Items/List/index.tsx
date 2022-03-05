import React, { BaseSyntheticEvent, memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Company } from "../../../../../Classes/Company";
import { Item, ItemType } from "../../../../../Classes/Item";
import { Store } from "../../../../../Store";
import { ACTIONS } from "../../../../../Store/actions";
import { FilterButtonProps } from "../../../Utilities/FilterButton";
import { View } from "./view";

// #region TYPES
interface ItemsListSetup {
	/**
	 * An object where each key is a company slug, and each value the number of items with this company for `item.manufacturer`
	 */
	readonly companyCount?: { [index: string]: number };
	/**
	 * The total amount of items in DB
	 */
	readonly count?: number;
	/**
	 * An array containing the slugs of the previous request
	 */
	readonly fetchedSlugs?: string[];
	/**
	 * The filter used to fetch items
	 */
	readonly filters?: { key: string; value: string }[];
	/**
	 * The maximum number of items fetched in each request
	 */
	readonly limit?: number;
	/**
	 * The text typed in the manufaturer filter search input
	 */
	readonly manufacturerFilterSearchedtext?: string;
	/**
	 * A list of companies to filter on when searching for items
	 */
	readonly selectedCompanies?: string[];
	/**
	 * A list of tags to filter on when searching for items
	 */
	readonly selectedTags?: string[];
	/**
	 * Defines how the items are sorted when requested
	 */
	readonly sort?: string;
	/**
	 * The position where the previous request was started
	 */
	readonly start?: number;
	/**
	 * An object where each key is a tag, and each value the number of items containing that tag in `item.tags`
	 */
	readonly tagsCount?: { [index: string]: number };
	/**
	 * The text typed in the tag filter search input
	 */
	readonly tagFilterSearchedtext?: string;
}

type ItemsListProps = {
	companies?: Company[];
	dispatch: Dispatch;
	label: string;
	items?: Item[];
	setup?: ItemsListSetup;
};
// #endregion

// #region CONSTANTS
const selectSetup = createSelector(
	[(store) => store.controllers.feature],
	(feature) => (label: string) => {
		const params: ItemsListSetup | undefined = label.split(".").reduce(
			(reduction: { [index: string]: any }, key: string) => reduction && reduction[key],
			feature,
		);

		return params;
	},
);

const selectItems = createSelector(
	[
		(store) => store.information.item,
		(store) => store.controllers.feature,
	],
	(itemPerSlug, feature) => (label: string) => {
		const params: ItemsListSetup | undefined = label.split(".").reduce(
			(reduction: { [index: string]: any }, key: string): ItemsListSetup => reduction && reduction[key],
			feature,
		);

		if (params?.fetchedSlugs) {

			return params.fetchedSlugs.map((slug: string): Item => itemPerSlug[slug]);
		} else {

			return undefined;
		}
	},
);

const selectCompanies = createSelector(
	[(store) => store.information.company],
	(companyPerSlug) => {
		const companies: Company[] | undefined = companyPerSlug ? Object.values(companyPerSlug) : undefined;

		return companies;
	},
);

const mapStateToProps = (store: Store, { label }: { label: string; }) => ({
	companies: selectCompanies(store),
	items: selectItems(store)(label),
	label,
	setup: selectSetup(store)(label),
});
// #region

// #region COMPONENT
/**
 * A feature that dispays a list of items
 */
export const ItemsList = connect(mapStateToProps)(
	memo(
		({ companies, dispatch, items, label, setup }: ItemsListProps) => {
			const { t } = useTranslation();

			useEffect(
				() => () => { dispatch({ label, type: ACTIONS.DELETE_FEATURE }); },
				[dispatch, label],
			);

			useEffect(
				() => {
					dispatch({
						data: {
							className: "item",
							filters: [{ key: "itemType", value: ItemType.MUG }],
							label,
							limit: 16,
							sort: { key: "price", value: "asc" },
							start: 0,
							table: "items",
						},
						type: ACTIONS.FETCH_RECORDS_REQUEST,
					});
					dispatch({ data: { className: "company", table: "companies" }, type: ACTIONS.FETCH_RECORDS_REQUEST });
					dispatch({ data: { filter: "company", label }, type: ACTIONS.FETCH_COUNTS_REQUEST });
					dispatch({ data: { filter: "tags", label }, type: ACTIONS.FETCH_COUNTS_REQUEST });
				},
				[dispatch, label],
			);

			// #region MODELS
			const currentPage = useMemo(
				() => setup?.start && setup?.limit ? Math.ceil((setup?.start + setup?.limit) / setup?.limit) : 1,
				[setup?.start, setup?.limit],
			);

			const pageCount = useMemo(
				() => setup?.count ? Math.ceil(setup?.count / 16) : 0,
				[setup?.count],
			);

			const sortOptions = useMemo(
				() => ["lowToHigh", "highToLow", "newToOld", "oldToNew"].map((id) => ({
					id,
					text: t(`Feature:Items:List:${id}`),
				})),
				[t],
			);

			const manufacturerFilterOptions = useMemo(
				() => (companies || [])
					.map(({ name, slug }) => ({
						checked: setup?.selectedCompanies?.includes(slug) || false,
						id: slug,
						textPrimary: name,
						textSecondary: `(${setup?.companyCount?.[slug] || 0})`,
					}))
					.filter(({ textPrimary }) => textPrimary.toLowerCase().includes(setup?.manufacturerFilterSearchedtext?.toLowerCase() || "")),
				[companies, setup?.companyCount, setup?.selectedCompanies, setup?.manufacturerFilterSearchedtext],
			);

			const typeFilterSelectedValue = useMemo(
				() => {
					if (setup?.filters) {

						return setup.filters.find(({ key }) => key === "itemType")?.value;
					} else {

						return undefined;
					}
				},
				[setup?.filters],
			);

			const typeFilterOptions = useMemo(
				() => Object.values(ItemType).map((type) => ({
					text: t(`Information:Item:type:${type}`),
					value: type,
				})),
				[t],
			);

			const tagFilterOptions = useMemo(
				() => Object.entries(setup?.tagsCount || {}).map(([name, count]) => ({
					checked: setup?.selectedTags?.includes(name) || false,
					id: name,
					textPrimary: name,
					textSecondary: `(${count})`,
				})).filter(({ textPrimary }) => textPrimary.toLowerCase().includes(setup?.tagFilterSearchedtext?.toLowerCase() || "")),
				[setup?.selectedTags, setup?.tagsCount, setup?.tagFilterSearchedtext],
			);
			// #endregion

			// #region EVENTS
			const navigateToPage = useCallback(
				(pageNumber: number) => {
					if (setup?.limit) {
						dispatch({
							data: {
								className: "item",
								filters: setup?.filters,
								label,
								limit: setup?.limit,
								sort: setup?.sort,
								start: (pageNumber - 1) * setup?.limit,
								table: "items",
							},
							type: ACTIONS.FETCH_RECORDS_REQUEST,
						});
					}
				},
				[dispatch, label, setup?.filters, setup?.limit, setup?.sort],
			);

			const filterItemsByType: FilterButtonProps["onSelectCallback"] = useCallback(
				(event: BaseSyntheticEvent) =>{
					if (event.currentTarget.dataset?.value) {
						dispatch({
							data: {
								className: "item",
								filters: (setup?.filters?.filter((filter) => filter.key !== "itemType") || [])
									.concat({ key: "itemType", value: event.currentTarget.dataset.value }),
								label,
								limit: setup?.limit,
								sort: setup?.sort,
								start: 0,
								table: "items",
							},
							type: ACTIONS.FETCH_RECORDS_REQUEST,
						});
					}
				},
				[dispatch, label, setup?.filters, setup?.limit, setup?.sort],
			);

			const sortItemsBy = useCallback(
				(event: BaseSyntheticEvent) => {
					let sort;
					switch (event.currentTarget.value) {
					case "lowToHigh":
						sort = { key: "price", value: "asc" };
						break;
					case "highToLow":
						sort = { key: "price", value: "desc" };
						break;
					case "newToOld":
						sort = { key: "added", value: "desc" };
						break;
					case "oldToNew":
						sort = { key: "added", value: "asc" };
						break;
					}
					dispatch({
						data: {
							className: "item",
							filters: setup?.filters,
							label,
							limit: setup?.limit,
							sort,
							start: 0,
							table: "items",
						},
						type: ACTIONS.FETCH_RECORDS_REQUEST,
					});
				},
				[dispatch, label, setup?.filters, setup?.limit],
			);

			const updateManufacturersFilterList = useCallback(
				(event: BaseSyntheticEvent) => {
					const value = event?.currentTarget?.value;
					setTimeout(
						() => {
							dispatch({
								label,
								manufacturerFilterSearchedtext: value,
								type: ACTIONS.UPDATE_FEATURE,
							});
						},
						300,
					);
				},
				[dispatch, label],
			);

			const filterItemsByManufacturer = useCallback(
				(event: BaseSyntheticEvent) => {
					if (event?.currentTarget) {
						const { checked, value } = event.currentTarget;
						const selectedCompanies = [...setup?.selectedCompanies || []];
						checked
							? selectedCompanies.push(value)
							: selectedCompanies.splice(selectedCompanies.indexOf(value), 1);
						dispatch({
							label,
							selectedCompanies,
							type: ACTIONS.UPDATE_FEATURE,
						});

						dispatch({
							data: {
								className: "item",
								filters: checked
									? (setup?.filters || []).concat({ key: "manufacturer", value })
									: (setup?.filters || []).filter((filter) => !(filter.key === "manufacturer" && filter.value === value)),
								label,
								limit: setup?.limit,
								sort: setup?.sort,
								start: setup?.start,
								table: "items",
							},
							type: ACTIONS.FETCH_RECORDS_REQUEST,
						});
					}
				},
				[dispatch, label, setup?.filters, setup?.limit, setup?.selectedCompanies, setup?.sort, setup?.start],
			);

			const updateTagsFilterList = useCallback(
				(event: BaseSyntheticEvent) => {
					const value = event?.currentTarget?.value;
					setTimeout(
						() => {
							dispatch({
								label,
								tagFilterSearchedtext: value,
								type: ACTIONS.UPDATE_FEATURE,
							});
						},
						300,
					);
				},
				[dispatch, label],
			);

			const filterItemsByTag = useCallback(
				(event: BaseSyntheticEvent) => {
					if (event?.currentTarget) {
						const { checked, value } = event.currentTarget;
						const selectedTags = [...setup?.selectedTags || []];
						checked
							? selectedTags.push(value)
							: selectedTags.splice(selectedTags.indexOf(value), 1);
						dispatch({
							label,
							selectedTags,
							type: ACTIONS.UPDATE_FEATURE,
						});

						dispatch({
							data: {
								className: "item",
								filters: checked
									? (setup?.filters || []).concat({ key: "tags", value })
									: (setup?.filters || []).filter((filter) => !(filter.key === "tags" && filter.value === value)),
								label,
								limit: setup?.limit,
								sort: setup?.sort,
								start: setup?.start,
								table: "items",
							},
							type: ACTIONS.FETCH_RECORDS_REQUEST,
						});
					}
				},
				[dispatch, label, setup?.filters, setup?.limit, setup?.selectedTags, setup?.sort, setup?.start],
			);
			// #endregion

			// #region RENDERING
			return (
				<View
					currentPage={currentPage}
					filterItemsByTag={filterItemsByTag}
					filterItemsByType={filterItemsByType}
					filterItemsByManufacturer={filterItemsByManufacturer}
					items={items}
					manufacturerFilterOptions={manufacturerFilterOptions}
					navigateToPage={navigateToPage}
					pageCount={pageCount}
					sortItemsBy={sortItemsBy}
					sortOptions={sortOptions}
					tagFilterOptions={tagFilterOptions}
					typeFilterOptions={typeFilterOptions}
					typeFilterSelectedValue={typeFilterSelectedValue}
					updateManufacturersFilterList={updateManufacturersFilterList}
					updateTagsFilterList={updateTagsFilterList}
				/>
			);
			// #endregion
		},
	),
);
// #endregion

ItemsList.displayName = "itemsList";
