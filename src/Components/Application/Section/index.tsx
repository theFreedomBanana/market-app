import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";

import { ItemsList } from "../../Controllers/Features/Items/List";

const styles = () => createStyles({
	section__container: { backgroundColor: "#FAFAFA", padding: "3rem 6rem" },
});

export const ApplicationSection = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => (
			<div className={classes.section__container}>
				<ItemsList label="item.list" />
			</div>
		)
	),
);

ApplicationSection.displayName = "applicationSection";
