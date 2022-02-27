import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import Logo from "../../../../res/images/logo.png";

const styles = () => createStyles({
	header__container: {
		backgroundColor: "#1EA4CE",
		padding: "1rem 0",
		textAlign: "center",
	},
});

export const ApplicationHeader = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => (
			<div className={classes.header__container}>
				<img alt="logo" src={Logo} />
			</div>
		),
	),
);

ApplicationHeader.displayName = "applicationHeader";
