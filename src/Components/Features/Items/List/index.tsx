import { createStyles, Grid, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Item } from "../../../../Classes/Item";
import { Store } from "../../../../Store";
import { ACTIONS } from "../../../../Store/actions";
import { ItemCard } from "../Card";

interface ItemsListSetup {
	readonly fetchedSlugs?: string[];
}

const styles = () => createStyles({
	list__container: { padding: "1rem" },
	list__title: {
		backgroundColor: "#FAFAFA",
		color: "#6F6F6F",
		lineHeigh: "26px",
		marginBottom: "1rem",
		size: "20px",
	},
});

const selectFetchedItems = createSelector(
	[
		(store) => store.information.item,
		(store) => store.feature,
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
});

type ItemsListProps = { dispatch: Dispatch; items?: Item[]; label: string; } & WithStyles<typeof styles>;

export const ItemsList = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, dispatch, items, label }: ItemsListProps) => {
				const { t } = useTranslation();

				useEffect(
					() => {
						dispatch({ data: { label, limit: 16 }, type: ACTIONS.FETCH_REQUESTED });
					},
					[dispatch, label],
				);

				if (!(items)) {

					return null;
				}
				return (
					<>
						<Typography className={classes.list__title} variant="h4">{t("Feature:Items:List:products")}</Typography>
						<Paper className={classes.list__container} elevation={2}>
							<Grid container spacing={2}>
								{items.map((item) => (
									<Grid item key={item.slug} md={3}>
										<ItemCard item={item} />
									</Grid>
								))}
							</Grid>
						</Paper>
					</>
				);
			},
		),
	),
);

ItemsList.displayName = "itemsList";
