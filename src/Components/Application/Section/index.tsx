import { createStyles, Grid, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";

import { ItemsList } from "../../Features/Items/List";

const styles = () => createStyles({
	section__container: { backgroundColor: "#FAFAFA", padding: "3rem 6rem" },
});

export const ApplicationSection = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => (
			<div className={classes.section__container}>
				<Grid container>
					<Grid item md={3}>

					</Grid>
					<Grid item md={6}>
						<ItemsList />
					</Grid>
					<Grid item md={3}>

					</Grid>
				</Grid>
			</div>
		)
	),
);

ApplicationSection.displayName = "applicationSection";
