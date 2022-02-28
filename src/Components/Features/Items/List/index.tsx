import { createStyles, Grid, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Item } from "../../../../Classes/Item";
import { Store } from "../../../../Store";
import { ACTIONS } from "../../../../Store/actions";
import { ItemCard } from "../Card";

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

const mapStateToProps = (store: Store) => ({
	store: {
		information: {
			item: { ...store.information?.item },
		},
	},
});

type ItemsListProps = { dispatch: Dispatch; store: any } & WithStyles<typeof styles>;

export const ItemsList = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, dispatch, store }: ItemsListProps) => {
				const { t } = useTranslation();

				useEffect(
					() => {
						dispatch({ data: { limit: 16 }, type: ACTIONS.FETCH_REQUESTED });
					},
					[dispatch],
				);

				const items: Item[] = useMemo(
					() => Object.values(store?.information.item),
					[store?.information.item],
				);

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
