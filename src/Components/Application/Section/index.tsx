import { createStyles, Grid, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";

import { ItemsList } from "../../Controllers/Features/Items/List";
import { Cart } from "../../Controllers/Features/Cart";

const styles = () => createStyles({
	section__container: { backgroundColor: "#FAFAFA", padding: "3rem 6rem" },
});

export const ApplicationSection = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => (
			<div className={classes.section__container}>
				<Grid container spacing={2}>
					<Grid item md={9}>
						<ItemsList label="item.list" />
					</Grid>
					<Grid item md={3}>
						<Cart label="cart" />
					</Grid>
				</Grid>
			</div>
		)
	),
);

ApplicationSection.displayName = "applicationSection";
