import { createStyles, Theme, Typography, useMediaQuery, withStyles, WithStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
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
const styles = ({ breakpoints }: Theme) => createStyles({
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
		[breakpoints.down("md")]: { flexGrow: 2, fontSize: "1.1rem" },
	},
	card__container: {
		display: "flex",
		flexDirection: "row",
		height: "100%",
		justifyContent: "space-between",
		[breakpoints.up("lg")]: { flexDirection: "column" },
	},
	card__imageContainer: {
		backgroundColor: "#FEFEFE",
		border: "1.18px solid #F3F0FE",
		borderRadius: "12px",
		padding: "1rem",
		[breakpoints.up("lg")]: { marginBottom: "0.7rem" },
		[breakpoints.down("xs")]: { display: "none" },
	},
	card__infoContainer: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		[breakpoints.up("sm")]: {
			[breakpoints.down("md")]: {
				borderLeft: "1px solid #F3F0FE",
				marginLeft: "1rem",
				padding: "1rem 0 1rem 1rem",
			},
		},
	},
	card__itemImage: { maxWidth: "100%" },
	card__itemName: {
		color: "#191919",
		flexGrow: 2,
		fontWeight: 600,
		marginBottom: "0.7rem",
		[breakpoints.down("md")]: { fontSize: "1.1rem" },
	},
	card__itemPrice: { fontWeight: 700 },
	card__itemPriceContainer: {
		color: "#1EA4CE",
		display: "inline",
		marginBottom: "0.7rem",
		[breakpoints.down("md")]: { fontSize: "1rem" },
	},
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
				const breakpointLgAndOver = useMediaQuery(useTheme().breakpoints.up("lg"));

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
						<div className={classes.card__imageContainer}>
							<img
								alt="Nicholas Cage"
								className={classes.card__itemImage}
								src={breakpointLgAndOver
									? "https://www.placecage.com/320/320"
									: "https://www.placecage.com/120/120"
								}
							/>
						</div>
						<div className={classes.card__infoContainer}>
							<div className={classes.card__itemPriceContainer}>
								<span>&#8378; </span>
								<span
									className={classes.card__itemPrice}
								>
									{item.price}
								</span>
							</div>
							<Typography className={classes.card__itemName}>{item.name}</Typography>
							<button
								className={classes.card__button}
								onClick={() => addItemToCart(item)}
							>
								{t("Feature:Items:Card:add")}
							</button>
						</div>
					</div>
				);
				// #endregion
			},
		),
	),
);
// #endregion

ItemCard.displayName = "itemCard";
