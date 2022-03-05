import { createStyles, Grid, Theme, Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ArrowLeftIcon from "../../../../../res/icons/arrowLeft.svg";
import ArrowRightIcon from "../../../../../res/icons/arrowRight.svg";

// #region TYPES
export interface PaginationProps {
	/**
	 * The selected page.
	 */
	readonly currentPage: number;
	/**
	 * The total number of page.
	 */
	readonly pageCount: number;
	/**
	 * Callback used to navigate to another page.
	 */
	readonly navigateToPage: (page: number) => void;
}
// #endregion

// #region CONSTANTS
const styles = ({ breakpoints }: Theme) => createStyles({
	pagination__arrowIconContainer: { display: "flex" },
	pagination__arrowNavContainer: { alignItems: "center", color: "#697488", display: "flex" },
	"pagination__arrowNavContainer--disabled": { color: "#A8A8A8" },
	"pagination__arrowNavContainer--enabled": {
		"&:hover": { color: "#1EA4CE", cursor: "pointer" },
	},
	pagination__container: { alignItems: "center", justifyContent: "space-between", padding: "0 2rem" },
	pagination__nextNavContainer: { justifyContent: "right" },
	pagination__nextNavText: { marginRight: "1rem" },
	pagination__numberNavContainer: {
		display: "flex",
		[breakpoints.down("xs")]: { display: "none" },
	},
	pagination__numberNavItem: {
		color: "#798395",
		display: "inline",
		padding: "1rem 0",
		textAlign: "center",
		width: "11.111111%",
	},
	"pagination__numberNavItem--active": {
		"&:hover": {
			backgroundColor: "#1EA4CE",
			borderRadius: "2px",
			color: "white",
			cursor: "pointer",
		},
	},
	"pagination__numberNavItem--current": {
		color: "#1EA4CE",
	},
	pagination__previousNavContainer: { justifyContent: "left" },
	pagination__previousNavText: { marginLeft: "1rem" },
});
// #endregion

// #region COMPONENT
/**
 * A utility that displays a pagination component
 */
export const Pagination = withStyles(styles)(
	memo(
		({ classes, currentPage, pageCount, navigateToPage }: WithStyles<typeof styles> & PaginationProps) => {
			const { t } = useTranslation();

			// #region RENDERING
			const computePageNumber = useCallback(
				(index: number) => {
					if (pageCount <= 9){

						return index + 1;
					} else if (index === 0) {

						return 1;
					} else if (index === 8) {

						return pageCount;
					} else if (currentPage <= 4 && [0, 1, 2, 3].includes(index)) {

						return index + 1;
					} else if (currentPage <= 4 && [5, 6, 7, 8].includes(index)) {

						return pageCount - (8 - index);
					} else if ((pageCount - currentPage) < 4 && [0, 1, 2, 3].includes(index)) {

						return index + 1;
					} else if ((pageCount - currentPage) < 4 && [5, 6, 7, 8].includes(index)) {

						return pageCount - (8 - index);
					} else if (index === 4 && currentPage <= 4) {

						return undefined;
					} else if (index === 4 && (pageCount - currentPage) < 4) {

						return undefined;
					} else if ([1, 7].includes(index)) {

						return undefined;
					} else if (index === 4) {

						return currentPage;
					} else if (index < 4) {

						return currentPage - 4 + index;
					} else {

						return currentPage + index - 4;
					}
				},
				[currentPage, pageCount],
			);

			return (
				<Grid className={classes.pagination__container} container>
					<Grid
						item xs={2}
						className={clsx(
							classes.pagination__arrowNavContainer,
							classes.pagination__previousNavContainer,
							currentPage <= 1
								? classes["pagination__arrowNavContainer--disabled"]
								: classes["pagination__arrowNavContainer--enabled"],
						)}
						onClick={() => {
							if (currentPage > 1) {
								navigateToPage(currentPage - 1);
							}
						}}>
						<div className={classes.pagination__arrowIconContainer}><ArrowLeftIcon /></div>
						<Typography className={classes.pagination__previousNavText}>{t("Feature:Items:List:previous")}</Typography>
					</Grid>
					<Grid className={classes.pagination__numberNavContainer} item xs={8}>
						{new Array(pageCount <= 9 ? pageCount : 9).fill(undefined).map((_, index) => (
							<Typography
								className={clsx(
									classes.pagination__numberNavItem,
									computePageNumber(index) ? classes["pagination__numberNavItem--active"] : "",
									computePageNumber(index) === currentPage ? classes["pagination__numberNavItem--current"] : "",
								)}
								key={index}
								onClick={() => {
									const page = computePageNumber(index);
									if (page) {
										navigateToPage(page);
									}
								}}
							>
								{computePageNumber(index) || "..."}
							</Typography>
						))}
					</Grid>
					<Grid
						className={clsx(
							classes.pagination__arrowNavContainer,
							classes.pagination__nextNavContainer,
							currentPage >= pageCount
								? classes["pagination__arrowNavContainer--disabled"]
								: classes["pagination__arrowNavContainer--enabled"],
						)}
						item
						onClick={() => {
							if (currentPage < pageCount) {
								navigateToPage(currentPage + 1);
							}
						}}
						xs={2}
					>
						<Typography className={classes.pagination__nextNavText}>{t("Feature:Items:List:next")}</Typography>
						<div className={classes.pagination__arrowIconContainer}><ArrowRightIcon /></div>
					</Grid>
				</Grid>
			);
			// #endregion
		},
	),
);
// #endregion
