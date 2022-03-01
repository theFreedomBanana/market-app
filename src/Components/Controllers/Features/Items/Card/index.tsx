import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import { Item } from "../../../../../Classes/Item";

const styles = () => createStyles({
	card__itemImage: { maxWidth: "100%" },
	card__itemImageContainer: {
		backgroundColor: "#FEFEFE",
		border: "1.18px solid #F3F0FE",
		borderRadius: "12px",
		display: "flex",
		marginBottom: "0.5rem",
		padding: "1rem",
	},
	card__itemName: {
		color: "#191919",
		fontWeight: 600,
	},
	card__itemPrice: {
		color: "#1EA4CE",
		display: "inline",
		marginBottom: "0.5rem",
	},
	card__itemPriceText: { fontWeight: 700 },
});

interface ItemCardProps {
	readonly item: Item;
}

export const ItemCard = withStyles(styles)(
	memo(
		({ classes, item }: WithStyles<typeof styles> & ItemCardProps) => (
			<div>
				<div className={classes.card__itemImageContainer}>
					<img alt="Nicholas Cage" className={classes.card__itemImage} src="https://www.placecage.com/640/640" />
				</div>
				<Typography className={classes.card__itemPrice}>&#8378; </Typography>
				<Typography
					className={`${classes.card__itemPrice} ${classes.card__itemPriceText}`}
				>
					{item.price}
				</Typography>
				<Typography className={classes.card__itemName}>{item.name}</Typography>
			</div>
		),
	),
);

ItemCard.displayName = "itemCard";
