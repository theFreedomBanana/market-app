import { Accordion, AccordionDetails, AccordionSummary, createStyles, Grid, Paper, Typography, useMediaQuery, withStyles, WithStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { CircularProgress } from "@mui/material";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import ArrowDownIcon from "../../../../../../res/icons/arrowDown.svg";
import { Item } from "../../../../../Classes/Item";
import { Pagination, PaginationProps } from "../../../Utilities/Pagination";
import { FilterButton, FilterButtonProps } from "../../../Utilities/FilterButton";
import { FilterCheckbox, FilterCheckboxProps } from "../../../Utilities/FilterCheckbox";
import { SortRadio, SortRadioProps } from "../../../Utilities/SortRadio";
import { ItemCard } from "../Card";

// #region TYPES
interface ItemsListViewProps {
	/**
	 * The current page for the Pagination component
	 */
	readonly currentPage: number;
	/**
	 * A callback triggered whenever a new manufacturer is selected in the company FilterCheckbox component
	 */
	readonly filterItemsByManufacturer: FilterCheckboxProps["checkboxOnChangeEventHandler"];
	/**
	 * A callback triggered whenever a new manufacturer is selected in the tag FilterCheckbox component
	 */
	readonly filterItemsByTag: FilterCheckboxProps["checkboxOnChangeEventHandler"];
	/**
	 * A callback triggered whenever a type is selected on the FilterButton component
	 */
	readonly filterItemsByType: FilterButtonProps["onSelectCallback"];
	/**
	 * True if an item request is pending, false otherwise
	 */
	readonly isLoading?: boolean
	/**
	 * A list of items to display
	 */
	readonly items?: Item[];
	/**
	 * A list of manufacturers for the company FilterCheckbox component
	 * Shaped as FilterOption (e.g { text, value })
	 */
	readonly manufacturerFilterOptions: FilterCheckboxProps["options"];
	/**
	 * A callback triggered whenever a page is selected on the Pagination component.
	 */
	readonly navigateToPage: PaginationProps["navigateToPage"];
	/**
	 * The total number of pages to display in the Pagination component.
	 */
	readonly pageCount: number;
	/**
	 * A callback triggered whenever an input is selected on the SortRadio component
	 */
	readonly sortItemsBy: SortRadioProps["onChangeEventHandler"];
	/**
	 * A list of options for the SortRadio component
	 */
	readonly sortOptions: SortRadioProps["options"];
	/**
	 * A list of manufacturers for the company FilterCheckbox component
	 * Shaped as FilterOption (e.g { text, value })
	 */
	readonly tagFilterOptions: FilterCheckboxProps["options"];
	/**
	 * A list of options for the FilterButton component
	 */
	readonly typeFilterOptions: FilterButtonProps["options"];
	/**
	 * The selected value for the type FilterButton component
	 */
	readonly typeFilterSelectedValue?: string;
	/**
	 * A callback triggered whenever a text is typed in the company FilterCheckbox text input
	 */
	readonly updateManufacturersFilterList: FilterCheckboxProps["textInputOnChangeEventHandler"];
	/**
	 * A callback triggered whenever a text is typed in the tag FilterCheckbox text input
	 */
	readonly updateTagsFilterList: FilterCheckboxProps["textInputOnChangeEventHandler"];
}
// #endregion

// #endregion CONSTANTS
const styles = () => createStyles({
	list__cartContainer: { border: "8px solid #1EA4CE", borderRadius: "2px", display: "flex", maxHeight: "500px" },
	list__container: { marginBottom: "2rem", padding: "1rem" },
	list__filterAccordionDetails: { padding: 0 },
	list__filterAccordionIcon: { color: "#697488" },
	list__filterAccordionSummary: { color: "#697488", fontWeight: 600 },
	list__filterContainer: { marginBottom: "1rem" },
	list__filterItem: {
		"&:hover": { boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .25)" },
		borderRadius: "2px",
		cursor: "pointer",
		display: "inline-block",
		fontSize: ".8rem",
		fontWeight: 600,
		marginRight: "1rem",
		padding: "0.5rem 1rem",
		textTransform: "lowercase",
	},
	"list__filterItem--disabled": { backgroundColor: "#F2F0FD", color: "#1EA4CE" },
	"list__filterItem--enabled": { backgroundColor: "#1EA4CE", color: "#FFFFFF" },
	"list__loaderContainer": {
		bottom: 0,
		left: 0,
		margin: "auto",
		position: "absolute",
		right: 0,
		top: 0,
	},
	list__loaderSvg: { color: "#1EA4CE" },
	list__noItemFound: { color: "#525252", fontStyle: "italic" },
	list__productsContainer: { position: "relative" },
	list__sideContainer: {
		"& > :not(:last-child)": { marginBottom: "2rem" },
	},
	list__title: {
		backgroundColor: "#FAFAFA",
		color: "#6F6F6F",
		lineHeigh: "26px",
		marginBottom: "1rem",
		size: "20px",
	},
});
// #endregion

// #region COMPONENT
/**
 * A view for the ItemsList component
 */
export const View = withStyles(styles)(
	memo(
		({
			classes, currentPage,
			filterItemsByManufacturer, filterItemsByTag, filterItemsByType,
			isLoading, items,
			manufacturerFilterOptions,
			navigateToPage,
			pageCount,
			sortItemsBy, sortOptions,
			tagFilterOptions, typeFilterOptions, typeFilterSelectedValue,
			updateManufacturersFilterList, updateTagsFilterList,
		}: ItemsListViewProps & WithStyles<typeof styles>) => {
			const { t } = useTranslation();
			const smBreakpoint = useMediaQuery(useTheme().breakpoints.down("sm"));

			// #region RENDERING
			return (
				<Grid container spacing={2}>
					<Grid item md={4} xs={12}>
						{smBreakpoint
							? (
								<>
									<Accordion>
										<AccordionSummary
											className={classes.list__filterAccordionSummary}
											expandIcon={<ArrowDownIcon className={classes.list__filterAccordionIcon} />}
										>
											<Typography>{t("Feature:Items:List:sorting")}</Typography>
										</AccordionSummary>
										<AccordionDetails classes={{ root: classes.list__filterAccordionDetails }}>
											<SortRadio
												defaultOption={sortOptions[0]}
												onChangeEventHandler={sortItemsBy}
												options={sortOptions}
											/>
										</AccordionDetails>
									</Accordion>
									<Accordion>
										<AccordionSummary
											className={classes.list__filterAccordionSummary}
											expandIcon={<ArrowDownIcon className={classes.list__filterAccordionIcon} />}
										>
											<Typography>{t("Feature:Items:List:brands")}</Typography>
										</AccordionSummary>
										<AccordionDetails classes={{ root: classes.list__filterAccordionDetails }}>
											<FilterCheckbox
												checkboxOnChangeEventHandler={filterItemsByManufacturer}
												options={manufacturerFilterOptions}
												placeholder={t("Feature:Items:List:searchBrand")}
												textInputOnChangeEventHandler={updateManufacturersFilterList}
											/>
										</AccordionDetails>
									</Accordion>
									<Accordion>
										<AccordionSummary
											className={classes.list__filterAccordionSummary}
											expandIcon={<ArrowDownIcon className={classes.list__filterAccordionIcon} />}
										>
											<Typography>{t("Feature:Items:List:tags")}</Typography>
										</AccordionSummary>
										<AccordionDetails classes={{ root: classes.list__filterAccordionDetails }}>
											<FilterCheckbox
												checkboxOnChangeEventHandler={filterItemsByTag}
												options={tagFilterOptions}
												placeholder={t("Feature:Items:List:searchTag")}
												textInputOnChangeEventHandler={updateTagsFilterList}
											/>
										</AccordionDetails>
									</Accordion>
								</>
							) : (
								<div className={classes.list__sideContainer}>
									<SortRadio
										defaultOption={sortOptions[0]}
										label={t("Feature:Items:List:sorting")}
										onChangeEventHandler={sortItemsBy}
										options={sortOptions}
									/>
									<FilterCheckbox
										checkboxOnChangeEventHandler={filterItemsByManufacturer}
										label={t("Feature:Items:List:brands")}
										options={manufacturerFilterOptions}
										placeholder={t("Feature:Items:List:searchBrand")}
										textInputOnChangeEventHandler={updateManufacturersFilterList}
									/>
									<FilterCheckbox
										checkboxOnChangeEventHandler={filterItemsByTag}
										label={t("Feature:Items:List:tags")}
										options={tagFilterOptions}
										placeholder={t("Feature:Items:List:searchTag")}
										textInputOnChangeEventHandler={updateTagsFilterList}
									/>
								</div>
							)
						}
					</Grid>
					<Grid className={classes.list__productsContainer} item md={8} xs={12}>
						<Typography className={classes.list__title} variant="h4">{t("Feature:Items:List:products")}</Typography>
						{typeFilterOptions && (
							<div className={classes.list__filterContainer}>
								<FilterButton
									onSelectCallback={filterItemsByType}
									options={typeFilterOptions}
									selectedValue={typeFilterSelectedValue}
								/>
							</div>
						)}
						{isLoading
							? (
								<CircularProgress classes={{
									root: classes.list__loaderContainer,
									svg: classes.list__loaderSvg,
								}} />
							) : (
								<>
									{!(items) || items.length === 0
										? (
											<Typography className={classes.list__noItemFound}>{t("Feature:Items:List:noItemFound")}</Typography>
										) : (
											<>
												<Paper className={classes.list__container} elevation={2}>
													<Grid container spacing={2}>
														{items.map((item) => (
															<Grid item key={item.slug} xs={12} lg={3}>
																<ItemCard item={item} label="cart" />
															</Grid>
														))}
													</Grid>
												</Paper>
												<Pagination
													currentPage={currentPage}
													navigateToPage={navigateToPage}
													pageCount={pageCount}
												/>
											</>
										)
									}
								</>
							)
						}
					</Grid>
				</Grid>
			);
			// #endregion
		},
	),
);
// #endregion
