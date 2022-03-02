import { createStyles, Grid, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { ChangeEvent, memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Item, ItemType } from "../../../../../Classes/Item";
import { Store } from "../../../../../Store";
import { ACTIONS } from "../../../../../Store/actions";
import { ItemCard } from "../Card";
import { Pagination } from "../../../Utility/Pagination";
import { SortRadio } from "../../../Utility/SortRadio";

// #region TYPES
interface ItemsListSetup {
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
	 * Defines how the items are sorted when requested
	 */
	readonly sort?: string;
	/**
	 * The position where the previous request was started
	 */
	readonly start?: number;
}

type ItemsListProps = { dispatch: Dispatch; label: string; items?: Item[]; setup?: ItemsListSetup } & WithStyles<typeof styles>;
// #endregion

// #region CONSTANTS
const selectFeatureSetup = createSelector(
	[(store) => store.controllers.feature],
	(feature) => (label: string) => {
		const params: ItemsListSetup | undefined = label.split(".").reduce(
			(reduction: { [index: string]: any }, key: string) => reduction && reduction[key],
			feature,
		);

		return params;
	},
);

const selectFetchedItems = createSelector(
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

const mapStateToProps = (store: Store, { label }: { label: string; }) => ({
	items: selectFetchedItems(store)(label),
	label,
	setup: selectFeatureSetup(store)(label),
});

const styles = () => createStyles({
	list__container: { marginBottom: "2rem", padding: "1rem" },
	list__filterContainer: { marginBottom: "1rem" },
	list__filterItem: {
		"&:hover": { boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .25)" },
		borderRadius: "2px",
		cursor: "pointer",
		display: "inline-block",
		fontSize: ".8rem",
		fontWeight: 600,
		marginRight: "1rem",
		padding: "0.5rem 1rem",
		textTransform: "lowercase",
	},
	"list__filterItem--disabled": { backgroundColor: "#F2F0FD", color: "#1EA4CE" },
	"list__filterItem--enabled": { backgroundColor: "#1EA4CE", color: "#FFFFFF" },
	list__sortRadio: { marginBottom: "2rem" },
	list__title: {
		backgroundColor: "#FAFAFA",
		color: "#6F6F6F",
		lineHeigh: "26px",
		marginBottom: "1rem",
		size: "20px",
	},
});
// #region

// #region COMPONENT
/**
 * A feature that dispays a list of items
 */
export const ItemsList = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, dispatch, items, label, setup }: ItemsListProps) => {
				const { t } = useTranslation();

				useEffect(
					() => {
						dispatch({
							data: {
								filters: [{ key: "itemType", value: ItemType.MUG }],
								label,
								limit: 16,
								sort: { key: "price", value: "asc" },
								start: 0,
								table: "items",
							},
							type: ACTIONS.FETCH_REQUESTED,
						});
					},
					[dispatch, label],
				);

				// #region MODELS
				const currentPage = useMemo(
					() => setup?.start && setup?.limit ? Math.ceil(setup?.start / setup?.limit) : 1,
					[setup?.start, setup?.limit],
				);

				const pageCount = useMemo(
					() => setup?.count ? Math.floor(setup?.count / 16) : 0,
					[setup?.count],
				);

				const sortOptions = useMemo(
					() => ["lowToHigh", "highToLow", "newToOld", "oldToNew"].map((id) => ({
						id,
						text: t(`Feature:Items:List:${id}`),
					})),
					[t],
				);
				// #endregion

				// #region EVENTS
				const navigateToPage = useCallback(
					(pageNumber: number) => {
						if (setup?.limit) {
							dispatch({
								data: {
									filters: setup?.filters,
									label,
									limit: setup?.limit,
									sort: setup?.sort,
									start: pageNumber * setup?.limit,
									table: "items",
								},
								type: ACTIONS.FETCH_REQUESTED,
							});
						}
					},
					[dispatch, label, setup?.filters, setup?.limit, setup?.sort],
				);

				const searchItemsWithItemType = useCallback(
					(itemType: ItemType) => {
						dispatch({
							data: {
								filters: (setup?.filters?.filter((filter) => filter.key !== "itemType") || []).concat({ key: "itemType", value: itemType }),
								label,
								limit: setup?.limit,
								sort: setup?.sort,
								start: 0,
								table: "items",
							},
							type: ACTIONS.FETCH_REQUESTED,
						});
					},
					[dispatch, label, setup?.filters, setup?.limit, setup?.sort],
				);

				const searchItemsBy = useCallback(
					(event: ChangeEvent<HTMLInputElement>) => {
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
								filters: setup?.filters,
								label,
								limit: setup?.limit,
								sort,
								start: 0,
								table: "items",
							},
							type: ACTIONS.FETCH_REQUESTED,
						});
					},
					[dispatch, label, setup?.filters, setup?.limit],
				);
				// #endregion

				// #region RENDERING
				if (!(items)) {

					return null;
				}
				return (
					<Grid container spacing={2}>
						<Grid item md={3}>
							<SortRadio
								custom={{
									formControlProps: {
										classes: { root: classes.list__sortRadio },
									},
								}}
								defaultOption={sortOptions[0]}
								label={t("Feature:Items:List:sorting")}
								onChangeEventHandler={searchItemsBy}
								options={sortOptions}
							/>
						</Grid>
						<Grid item md={9}>
							<Typography className={classes.list__title} variant="h4">{t("Feature:Items:List:products")}</Typography>
							<div className={classes.list__filterContainer}>
								<div
									className={clsx(
										classes.list__filterItem,
										setup?.filters?.find(({ key, value }) => key === "itemType" && value === ItemType.MUG)
											? classes["list__filterItem--enabled"]
											: classes["list__filterItem--disabled"],
									)}
									onClick={() => searchItemsWithItemType(ItemType.MUG)}
								>
									{t("Feature:Items:List:mug")}
								</div>
								<div
									className={clsx(
										classes.list__filterItem,
										setup?.filters?.find(({ key, value }) => key === "itemType" && value === ItemType.SHIRT)
											? classes["list__filterItem--enabled"]
											: classes["list__filterItem--disabled"],
									)}
									onClick={() => searchItemsWithItemType(ItemType.SHIRT)}
								>
									{t("Feature:Items:List:shirt")}
								</div>
							</div>
							<Paper className={classes.list__container} elevation={2}>
								<Grid container spacing={2}>
									{items.map((item) => (
										<Grid item key={item.slug} md={3}>
											<ItemCard item={item} label="cart" />
										</Grid>
									))}
								</Grid>
							</Paper>
							<Pagination currentPage={currentPage} navigateToPage={navigateToPage} pageCount={pageCount} />
						</Grid>
					</Grid>
				);
				// #endregion
			},
		),
	),
);
// #endregion

ItemsList.displayName = "itemsList";
