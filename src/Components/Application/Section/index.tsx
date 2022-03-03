import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import { ItemsList } from "../../Controllers/Features/Items/List";

// #region CONSTANTS
const styles = ({ breakpoints }: Theme) => createStyles({
	section__container: {
		backgroundColor: "#FAFAFA",
		padding: "3rem 6rem 9rem",
		[breakpoints.down("md")]: { paddingLeft: "3rem", paddingRight: "3rem" },
		[breakpoints.down("sm")]: { paddingLeft: "6rem", paddingRight: "6rem" },
		[breakpoints.down("xs")]: { paddingLeft: "3rem", paddingRight: "3rem" },
	},
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
