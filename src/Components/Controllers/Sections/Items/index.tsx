import { createStyles, Grid, Theme, useMediaQuery, withStyles, WithStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { memo } from "react";
import { Cart } from "../..//Features/Cart";
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
	section__cartContainer: { border: "8px solid #1EA4CE", borderRadius: "2px", display: "flex", maxHeight: "500px" },
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
		({ classes, label }: ItemsSectionProps & WithStyles<typeof styles>) => {
			const lgBreakpoint = useMediaQuery(useTheme().breakpoints.up("lg"));

			// #region RENDERING
			return (
				<div className={classes.section__container}>
					<Grid container spacing={2}>
						<Grid item lg={9} xs={12}>
							<ItemsList label={`${label}.list`} />
						</Grid>
						{lgBreakpoint && (
							<Grid item lg={3}>
								<div className={classes.section__cartContainer}>
									<Cart label="cart" />
								</div>
							</Grid>
						)}
					</Grid>
				</div>
			);
			// #endregion
		},
	),
);
// #endregion

ItemsSection.displayName = "ItemsSection";
