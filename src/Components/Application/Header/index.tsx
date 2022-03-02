import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo, useMemo } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Item } from "../../../Classes/Item";
import { Store } from "../../../Store";
import Logo from "../../../../res/images/logo.png";
import ShoppingBagIcon from "../../../../res/icons/shoppingBag.svg";

// #region TYPES
interface HeaderSetup {
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

type HeaderProps = {
	itemPerSlug?: { [index: string]: Item };
	label: string;
	setup?: HeaderSetup;
} & WithStyles<typeof styles>;

// #endregion

// #region CONSTANTS
const styles = () => createStyles({
	header__cartContainer: {
		alignItems: "center",
		backgroundColor: "#147594",
		color: "#FFFFFF",
		display: "inline-flex",
		padding: "2rem",
	},
	header__container: {
		backgroundColor: "#1EA4CE",
		padding: "0 6rem",
		textAlign: "right",
	},
	header__logo: {
		left: "0%",
		margin: "auto",
		position: "absolute",
		right: "0%",
		transform: "translate(0, 50%)",
	},
	header__shoppingBagIcon: { marginRight: "1rem" },
});

const selectCartSetup = createSelector(
	[(store) => store.controllers.feature],
	(feature) => (label: string) => {
		const params = label.split(".").reduce(
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
	setup: selectCartSetup(store)("cart"),
});
// #endregion

// #region COMPONENT
/**
 * A component that displays the global header
 */
export const ApplicationHeader = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ classes, itemPerSlug, setup }: HeaderProps) => {

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

				// #region RENDERING
				return (
					<div className={classes.header__container}>
						<img alt="logo" className={classes.header__logo} src={Logo} />
						<div className={classes.header__cartContainer}>
							<ShoppingBagIcon className={classes.header__shoppingBagIcon} />
							<Typography>&#8378; {totalPrice}</Typography>
						</div>
					</div>
				);
				// #endregion
			},
		),
	),
);
// #endregion

ApplicationHeader.displayName = "applicationHeader";
