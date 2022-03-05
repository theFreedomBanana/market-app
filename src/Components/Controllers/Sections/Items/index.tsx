import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import { ItemsList } from "../../Features/Items/List";

// #region TYPES
interface ItemsSectionProps {
	/**
	 * The name of the section
	 */
	label: string;
}
// #endregion


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
 * A container component in charge of rendering everything item related
 */
export const ItemsSection = withStyles(styles)(
	memo(
		({ classes, label }: ItemsSectionProps & WithStyles<typeof styles>) => (
			<div className={classes.section__container}>
				<ItemsList label={`${label}.list`} />
			</div>
		),
	),
);
// #endregion

ItemsSection.displayName = "ItemsSection";
