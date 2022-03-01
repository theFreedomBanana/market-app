import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo, useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useTranslation } from "react-i18next";
import { createSelector } from "reselect";
import { Item } from "../../../../../Classes/Item";
import { Store } from "../../../../../Store";
import { ACTIONS } from "../../../../../Store/actions";

// #region TYPE
type ItemCardProps = {
	articleInCartPerItemSlug?: {
		[index: string]: { count: number };
	};
	dispatch: Dispatch;
	item: Item;
	label: string;
} & WithStyles<typeof styles>;
// #endregion

// #region CONSTANTS
const styles = () => createStyles({
	card__button: {
		"&:hover": {
			boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .25)",
			cursor: "pointer",
		},
		backgroundColor: "#1EA4CE",
		border: "none",
		borderRadius: "2px",
		color: "#FFFFFF",
		fontSize: "0.9rem",
		fontWeight: 600,
		lineHeight: "1.3rem",
		padding: "0.3rem 0",
		width: "100%",
	},
	card__container: { display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" },
	card__itemImage: { maxWidth: "100%" },
	card__itemImageContainer: {
		backgroundColor: "#FEFEFE",
		border: "1.18px solid #F3F0FE",
		borderRadius: "12px",
		display: "flex",
		marginBottom: "0.7rem",
		padding: "1rem",
	},
	card__itemName: {
		color: "#191919",
		flexGrow: 2,
		fontWeight: 600,
		marginBottom: "0.7rem",
	},
	card__itemPrice: {
		color: "#1EA4CE",
		display: "inline",
		marginBottom: "0.7rem",
	},
	card__itemPriceText: { fontWeight: 700 },
});

const selectItemsInCart = createSelector(
	[(store) => store.controllers.feature],
	(feature) => (label: string) => {
		const params: { articlePerItemSlug?: { [index: string]: { count: number } } } | undefined = label.split(".").reduce(
			(reduction: { [index: string]: any }, key: string) => reduction && reduction[key],
			feature,
		);

		return params?.articlePerItemSlug;
	},
);

const mapStateToProps = (store: Store, { label }: { label: string; }) => ({
	articleInCartPerItemSlug: selectItemsInCart(store)("cart"),
	label,
});

// #endregion

// #region COMPONENT
/**
 * A feature that displays infos about an item
 */
export const ItemCard = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, dispatch, item, articleInCartPerItemSlug }: ItemCardProps) => {
				const { t } = useTranslation();

				// #region EVENTS
				const addItemToCart = useCallback(
					(item: Item) => {
						const newArticlePerItemSlug = {
							...articleInCartPerItemSlug,
							[item.slug]: {
								count: (articleInCartPerItemSlug?.[item.slug]?.count || 0) + 1,
							},
						};
						dispatch({ articlePerItemSlug: newArticlePerItemSlug, label: "cart", type: ACTIONS.UPDATE_FEATURE });
					},
					[dispatch, articleInCartPerItemSlug],
				);
				// #endregion

				// #region RENDERING
				return (
					<div className={classes.card__container}>
						<div className={classes.card__itemImageContainer}>
							<img alt="Nicholas Cage" className={classes.card__itemImage} src="https://www.placecage.com/640/640" />
						</div>
						<div>
							<Typography className={classes.card__itemPrice}>&#8378; </Typography>
							<Typography
								className={`${classes.card__itemPrice} ${classes.card__itemPriceText}`}
							>
								{item.price}
							</Typography>
						</div>
						<Typography className={classes.card__itemName}>{item.name}</Typography>
						<button
							className={classes.card__button}
							onClick={() => addItemToCart(item)}
						>
							{t("Feature:Items:Card:add")}
						</button>
					</div>
				);
				// #endregion
			},
		),
	),
);
// #endregion

ItemCard.displayName = "itemCard";
