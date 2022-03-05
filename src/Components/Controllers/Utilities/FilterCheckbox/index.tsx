import { Checkbox, CheckboxProps, createStyles, FormControl, FormControlLabel, FormControlLabelProps, FormControlProps, FormGroup, FormGroupProps, FormLabel, FormLabelProps, Paper, PaperProps, TextField, TextFieldProps, Typography, TypographyProps, withStyles, WithStyles } from "@material-ui/core";
import React, { BaseSyntheticEvent, memo } from "react";
import CheckboxIcon from "../../../../../res/icons/checkbox.svg";
import CheckmarkIcon from "../../../../../res/icons/checkmark.svg";

// #region TYPES
export interface CheckboxOption {
	/**
	 * True if the value is selected, false otherwise
	 */
	readonly checked: boolean;
	/**
	 * The value that will be passed when selected
	 */
	readonly id: string;
	/**
	 * The text to display
	 */
	readonly textPrimary: string;
	/**
	 * An additional text to display
	 */
	readonly textSecondary?: string;
}

export interface FilterCheckboxProps {
	/**
	 * Callback trigered when user check/uncheck a checkbox
	 */
	readonly checkboxOnChangeEventHandler: (event: BaseSyntheticEvent) => void;
	/**
	 * An object used to passed down MUI properties
	 * Enable to customize component from the outside
	 */
	readonly custom?: {
		/**
		 * The MUI Checkbox properties
		 */
		readonly checkboxProps?: CheckboxProps;
		/**
		 * The MUI FormControlLabel properties
		 */
		readonly formControlLabelProps?: FormControlLabelProps;
		/**
		 * The MUI FormControl properties
		 */
		readonly formControlProps?: FormControlProps;
		/**
		 * The MUI FormGroup properties
		 */
		readonly formGroupProps?: FormGroupProps;
		/**
		 * The MUI FormLabel properties
		 */
		readonly formLabelProps?: FormLabelProps;
		/**
		 * The MUI Paper properties
		 */
		readonly paperProps?: PaperProps;
		/**
		 * The MUI TextField properties
		 */
		readonly textFieldProps?: TextFieldProps;
		/**
		 * The MUI Typography properties for textPrimary
		 */
		readonly TypographyPrimaryProps?: TypographyProps;
		/**
		 * The MUI Typography properties for textSecondary
		 */
		readonly TypographySecondaryProps?: TypographyProps;
	}
	/**
	 * The filter label
	 */
	readonly label?: string;
	/**
	 * A list of options to display
	 */
	readonly options: CheckboxOption[];
	/**
	 * A placeholder for the search input
	 */
	readonly placeholder?: string;
	/**
	 * Callback trigered when user types in the text input
	 */
	readonly textInputOnChangeEventHandler: (event: BaseSyntheticEvent) => void;
}
// #endregion

// #region CONSTANTS
const styles = () => createStyles({
	filter__checkbox: {
		"&:hover": { backgroundColor: "transparent" },
	},
	"filter__checkbox--checked": {
		"&:hover": { backgroundColor: "transparent !important" },
	},
	"filter__checkboxIcon--checked": { color: "#1EA4CE" },
	"filter__checkboxIcon--unchecked": { color: "#FFFFFF" },
	filter__checkboxLabelPrimary: { color: "#525252", display: "inline" },
	filter__checkboxLabelSecondary: { color: "#A8A8A8", display: "inline" },
	filter__checkboxListContainer: {
		"&::-webkit-scrollbar": { width: "4px" },
		"&::-webkit-scrollbar-thumb": { backgroundColor: "#E0E0E0", borderRadius: "4px" },
		"&::-webkit-scrollbar-track": { backgroundColor: "#FFFFFF" },
		flexWrap: "nowrap",
		maxHeight: "200px",
		overflowY: "auto",
	},
	filter__checkmarkIcon: { color: "#FFFFFF", position: "absolute" },
	filter__container: { width: "100%" },
	filter__label: { color: "#697488", fontWeight: 600, marginBottom: "1rem" },
	filter__searchInput: {
		"& .MuiOutlinedInput-root": { color: "#A8A8A8" },
		"& input:valid + fieldset": { borderColor: "#E0E0E0", borderWidth: 2 },
		"& input:valid:focus + fieldset": { borderColor: "#C4C4C4", opacity: 0.9 },
		"& input:valid:hover + fieldset": { borderColor: "#C4C4C4", opacity: 0.9 },
		marginBottom: "1rem",
	},
	filter__subContainer: { padding: "1rem" },
});
// #endregion

// #region COMPONENT
/**
 * A component thats displays a radio filter
 */
export const FilterCheckbox = withStyles(styles)(
	memo(
		({
			checkboxOnChangeEventHandler, classes, custom,
			label,
			options,
			placeholder,
			textInputOnChangeEventHandler,
		}: WithStyles<typeof styles> & FilterCheckboxProps) => (
			<FormControl className={classes.filter__container} {...custom?.formControlProps}>
				<FormLabel className={classes.filter__label} {...custom?.formLabelProps}>{label}</FormLabel>
				<Paper className={classes.filter__subContainer} {...custom?.paperProps}>
					<TextField
						classes={{ root: classes.filter__searchInput }}
						fullWidth
						onChange={textInputOnChangeEventHandler}
						placeholder={placeholder}
						variant="outlined"
						{...custom?.textFieldProps}
					/>
					<FormGroup className={classes.filter__checkboxListContainer} {...custom?.formGroupProps}>
						{options.map(({ checked, id, textPrimary, textSecondary }) =>(
							<FormControlLabel
								checked={checked}
								control={
									<Checkbox
										checkedIcon={
											<>
												<CheckboxIcon className={classes["filter__checkboxIcon--checked"]} />
												<CheckmarkIcon className={classes.filter__checkmarkIcon} viewBox="0 1 9 6" />
											</>
										}
										classes={{ checked: classes["filter__checkbox--checked"], root: classes.filter__checkbox }}
										disableRipple
										disableTouchRipple
										icon={<CheckboxIcon className={classes["filter__checkboxIcon--unchecked"]} />}
										onChange={checkboxOnChangeEventHandler}
										value={id}
										{...custom?.checkboxProps}
									/>
								}
								key={id}
								label={
									<>
										<Typography
											className={classes.filter__checkboxLabelPrimary}
											{...custom?.TypographyPrimaryProps}
										>
											{textPrimary}
										</Typography>
										{textSecondary && (
											<Typography
												className={classes.filter__checkboxLabelSecondary}
												{...custom?.TypographySecondaryProps}
											>
												&nbsp;{textSecondary}
											</Typography>
										)}
									</>
								}
								{...custom?.formControlLabelProps}
							/>
						))}
					</FormGroup>
				</Paper>
			</FormControl>
		),
	),
);
// #endregion

FilterCheckbox.displayName = "filterCheckbox";
