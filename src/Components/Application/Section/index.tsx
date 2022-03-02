import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import { ItemsList } from "../../Controllers/Features/Items/List";

// #region CONSTANTS
const styles = () => createStyles({
	section__container: { backgroundColor: "#FAFAFA", padding: "3rem 6rem" },
});
// #endregion

// #region COMPONENT
/**
 * The main component
 * If charge of rendering the features according to navigation
 */
export const ApplicationSection = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => (
			<div className={classes.section__container}>
				<ItemsList label="item.list" />
			</div>
		)
	),
);
// #endregion

ApplicationSection.displayName = "applicationSection";
