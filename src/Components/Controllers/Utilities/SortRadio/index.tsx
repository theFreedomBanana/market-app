import { createStyles, FormControl, FormControlLabel, FormControlLabelProps, FormControlProps, FormLabel, FormLabelProps, Paper, PaperProps, Radio, RadioGroup, RadioGroupProps, RadioProps, withStyles, WithStyles } from "@material-ui/core";
import React, { BaseSyntheticEvent, memo } from "react";
import CheckmarkIcon from "../../../../../res/icons/checkmark.svg";
import RadioIcon from "../../../../../res/icons/radio.svg";

// #region TYPES
export interface RadioOption {
	/**
	 * The value that will be passed when selected
	 */
	readonly id: string;
	/**
	 * The text to display
	 */
	readonly text: string;
}

export interface SortRadioProps {
	/**
	 * The selected option when rendering the first time
	 */
	readonly defaultOption: RadioOption;
	/**
	 * An object used to passed down MUI properties
	 * Enable to customize component from the outside
	 */
	readonly custom?: {
		/**
		 * The MUI FormControlLabel properties
		 */
		readonly formControlLabelProps?: FormControlLabelProps;
		/**
		 * The MUI FormControl properties
		 */
		readonly formControlProps?: FormControlProps;
		/**
		 * The MUI FormLabel properties
		 */
		readonly formLabelProps?: FormLabelProps;
		/**
		 * The MUI Paper properties
		 */
		readonly paperProps?: PaperProps;
		/**
		 * The MUI RadioGroup properties
		 */
		readonly radioGroupProps?: RadioGroupProps;
		/**
		 * The MUI Radio properties
		 */
		readonly radioProps?: RadioProps;
	}
	/**
	 * The filter label
	 */
	readonly label?: string;
	/**
	 * Callback trigered when user change selected value
	 */
	readonly onChangeEventHandler: (event: BaseSyntheticEvent) => void;
	/**
	 * A list of options to display as radio
	 */
	readonly options: RadioOption[];
}
// #endregion

// #region CONSTANTS
const styles = () => createStyles({
	sort__checkmarkIcon: { position: "absolute" },
	sort__container: { width: "100%" },
	sort__label: { color: "#697488", fontWeight: 600, marginBottom: "1rem" },
	sort__radioButton: {
		"&:hover": { backgroundColor: "transparent" },
		color: "#DFDEE2",
	},
	"sort__radioButton--checked": {
		"&:hover": { backgroundColor: "transparent !important" },
		color: "#1EA4CE !important",
	},
	sort__radioLabel: { color: "#525252" },
	sort__subContainer: { padding: "1rem" },
});
// #endregion

// #region COMPONENT
/**
 * A component thats displays a radio filter
 */
export const SortRadio = withStyles(styles)(
	memo(
		({
			classes, custom,
			defaultOption,
			label,
			onChangeEventHandler, options,
		}: WithStyles<typeof styles> & SortRadioProps) => (
			<FormControl className={classes.sort__container} {...custom?.formControlProps}>
				<FormLabel className={classes.sort__label} id={label} {...custom?.formLabelProps}>{label}</FormLabel>
				<Paper className={classes.sort__subContainer} {...custom?.paperProps}>
					<RadioGroup
						aria-labelledby={label}
						defaultValue={defaultOption.id}
						name="sort-radio-buttons-group"
						onChange={onChangeEventHandler}
						{...custom?.radioGroupProps}
					>
						{options.map(({ id, text }) => (
							<FormControlLabel
								className={classes.sort__radioLabel}
								control={<Radio
									checkedIcon={
										<>
											<RadioIcon />
											<CheckmarkIcon className={classes.sort__checkmarkIcon} />
										</>
									}
									classes={{ checked: classes["sort__radioButton--checked"], root: classes.sort__radioButton }}
									disableRipple
									icon={<RadioIcon />}
									{...custom?.radioProps}
								/>}
								key={id}
								label={text}
								value={id}
								{...custom?.formControlLabelProps}
							/>
						))}
					</RadioGroup>
				</Paper>
			</FormControl>
		),
	),
);
// #endregion

SortRadio.displayName = "sortRadio";
