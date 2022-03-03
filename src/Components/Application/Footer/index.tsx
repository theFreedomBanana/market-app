import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// #region CONSTANTS
const styles = () => createStyles({
	footer__bullet: { padding: "0 1rem" },
	footer__container: {
		bottom: 0,
		color: "#1EA4CE",
		display: "flex",
		justifyContent: "center",
		paddingBottom: "3rem",
		position: "absolute",
		width: "100%",
	},
	footer__policy: { textTransform: "capitalize" },
});

const CURRENT_YEAR = new Date().getFullYear();
// #endregion

// #region COMPONENT
/**
 * The footer component
 */
export const ApplicationFooter = withStyles(styles)(
	memo(
		({ classes }: WithStyles<typeof styles>) => {
			const { t } = useTranslation();

			return (
				<div className={classes.footer__container}>
					<Typography>&#169;{CURRENT_YEAR} {t("Application:Footer:name")}</Typography>
					<Typography className={classes.footer__bullet}>&bull;</Typography>
					<Typography className={classes.footer__policy}>{t("Application:Footer:policy")}</Typography>
				</div>
			);
		},
	),
);
// #endregion

ApplicationFooter.displayName = "applicationFooter";
