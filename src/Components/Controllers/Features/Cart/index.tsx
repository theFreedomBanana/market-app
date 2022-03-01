
import { createStyles, Grid, Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { memo, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { Item } from "../../../../Classes/Item";
import { Store } from "../../../../Store";
import { ACTIONS } from "../../../../Store/actions";

// #region TYPES
interface CartSetup {
	/**
	 * An object where each key is an item slug
	 */
	articlePerItemSlug?: {
		[itemSlug: string]: {
			/**
			 * The number of selected article for this item
			 */
			count: number;
		}
	}
}

type CartProps = {
	dispatch: Dispatch;
	itemPerSlug?: { [index: string]: Item };
	label: string;
	setup?: CartSetup;
} & WithStyles<typeof styles>;
// #endregion

// #region CONSTANTS

const styles = () => createStyles({
	cart__actionOnItem: { color: "#1EA4CE", cursor: "pointer", display: "inline", fontSize: "2rem", verticalAlign: "middle" },
	cart__addItem: { marginLeft: "0.75rem" },
	cart__container: {
		border: "8px solid #1EA4CE",
		borderRadius: "2px",
		display: "flex",
		flexDirection: "column",
		maxHeight: "700px",
		padding: "1rem 0 1rem 1rem",
	},
	cart__itemActionsContainer: { textAlign: "center" },
	cart__itemContainer: { borderBottom: "1px solid #F4F4F4", padding: "1.5rem 0" },
	cart__itemCount: { color: "#FFFFFF", position: "absolute", transform: "translate(-50%, -50%)" },
	cart__itemCountContainer: {
		backgroundColor: "#1EA4CE",
		display: "inline-block",
		padding: "1rem",
		position: "relative",
		textAling: "center",
		verticalAlign: "middle",
	},
	cart__itemName: { color: "#191919" },
	cart__itemPrice: { color: "#1EA4CE", fontWeight: 600 },
	cart__itemsListContainer: { marginBottom: "1.5rem", overflowY: "auto", paddingRight: "1rem" },
	cart__removeItem: { marginRight: "0.75rem" },
	cart__totalPrice: { fontWeight: 600 },
	cart__totalPriceContainer: { marginRight: "1rem", textAlign: "right" },
	cart__totalPriceSubContainer: {
		border: "3px solid #1EA4CE",
		borderRadius: "2px",
		color: "#1EA4CE",
		display: "inline-block",
		fontWeight: 600,
		padding: "1rem",
	},
});

const selectFeatureSetup = createSelector(
	[(store) => store.controllers.feature],
	(feature) => (label: string) => {
		const params: CartSetup | undefined = label.split(".").reduce(
			(reduction: { [index: string]: any }, key: string): CartSetup => reduction && reduction[key],
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
	(itemPerSlug, feature) => {
		const itemsSlugInCart = Object.keys(feature.cart?.articlePerItemSlug || {});
		const subsetOfItemPerSlug: { [slug: string]: Item } = itemsSlugInCart.reduce(
			(reduction, itemSlug) => ({
				...reduction,
				[itemSlug]: itemPerSlug[itemSlug],
			}),
			{},
		);

		return subsetOfItemPerSlug;
	},
);

const mapStateToProps = (store: Store, { label }: { label: string; }) => ({
	itemPerSlug: selectItems(store),
	label,
	setup: selectFeatureSetup(store)(label),
});


// #region

// #region COMPONENT
/**
 * A feature that dispays a shopping cart containing the customers selected items
 */
export const Cart = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, dispatch, itemPerSlug, label, setup }: CartProps) => {

				// #region MODEL
				const totalPrice = useMemo(
					() => Object.entries(setup?.articlePerItemSlug || {}).reduce(
						(reduction: number, [itemSlug, { count }]: [string, { count: number }]) => (
							reduction + (itemPerSlug?.[itemSlug].price || 0) * count
						),
						0,
					).toFixed(2),
					[itemPerSlug, setup?.articlePerItemSlug],
				);
				// #endregion

				// #region EVENTS
				const addItemToCart = useCallback(
					(itemSlug: string) => {
						const newArticlePerItemSlug = {
							...setup?.articlePerItemSlug,
							[itemSlug]: {
								count: (setup?.articlePerItemSlug?.[itemSlug]?.count || 0) + 1,
							},
						};
						dispatch({ articlePerItemSlug: newArticlePerItemSlug, label, type: ACTIONS.UPDATE_FEATURE });
					},
					[dispatch, label, setup?.articlePerItemSlug],
				);

				const removeItemFromCart = useCallback(
					(itemSlug: string) => {
						const newArticlePerItemSlug = { ...setup?.articlePerItemSlug };
						if (newArticlePerItemSlug[itemSlug].count <= 1) {
							delete newArticlePerItemSlug[itemSlug];
						} else {
							newArticlePerItemSlug[itemSlug].count = newArticlePerItemSlug[itemSlug].count - 1;
						}

						dispatch({ articlePerItemSlug: newArticlePerItemSlug, label, type: ACTIONS.UPDATE_FEATURE });
					},
					[dispatch, label, setup?.articlePerItemSlug],
				);
				// #endregion

				// #region RENDERING
				return (
					<div className={classes.cart__container}>
						<div className={classes.cart__itemsListContainer}>
							{Object.entries(setup?.articlePerItemSlug || {}).map(([itemSlug, { count }]) => (
								<Grid className={classes.cart__itemContainer} container key={itemSlug}>
									<Grid item xs={8}>
										<Typography className={classes.cart__itemName}>{itemPerSlug?.[itemSlug].name}</Typography>
										<Typography className={classes.cart__itemPrice}>
											&#8378; {itemPerSlug?.[itemSlug].price}
										</Typography>
									</Grid>
									<Grid className={classes.cart__itemActionsContainer} item xs={4}>
										<Typography
											className={clsx(classes.cart__actionOnItem, classes.cart__removeItem)}
											onClick={() => removeItemFromCart(itemSlug)}
										>
											-
										</Typography>
										<div className={classes.cart__itemCountContainer}>
											<Typography className={classes.cart__itemCount}>{count}</Typography>
										</div>
										<Typography
											className={clsx(classes.cart__actionOnItem, classes.cart__addItem)}
											onClick={() => addItemToCart(itemSlug)}
										>
											+
										</Typography>
									</Grid>
								</Grid>
							))}
						</div>
						<div className={classes.cart__totalPriceContainer}>
							<div className={classes.cart__totalPriceSubContainer}>
								<Typography className={classes.cart__totalPrice}>&#8378; {totalPrice}</Typography>
							</div>
						</div>
					</div>
				);
				// #endregion
			},
		),
	),
);

Cart.displayName = "cart";
