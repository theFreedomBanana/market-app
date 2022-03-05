import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { memo, MouseEvent } from "react";

// #region CONSTANTS
interface FilterOption {
	/**
	 * The text to display
	 */
	text: string;
	/**
	 * The value of the option
	 */
	value: string;
}

export interface FilterButtonProps {
	/**
	 * Callback triggered when an option is selected
	 */
	onSelectCallback: (event: MouseEvent<HTMLInputElement>) => void;
	/**
	 * A list of options to display
	 */
	options: FilterOption[];
	/**
	 * The selected option
	 */
	selectedValue?: string;
}

const styles = () => createStyles({
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
	"list__filterItem--selected": { backgroundColor: "#1EA4CE", color: "#FFFFFF" },
	"list__filterItem--unselected": { backgroundColor: "#F2F0FD", color: "#1EA4CE" },
});
// #endregion

// #region COMPONENT
/**
 * A component that acts as radio inputs but with a button like design
 */
export const FilterButton = withStyles(styles)(
	memo(
		({ classes, onSelectCallback, options, selectedValue }: WithStyles<typeof styles> & FilterButtonProps) => (
			<div>
				{options.map(({ text, value }) => (
					<div
						className={clsx(
							classes.list__filterItem,
							value === selectedValue
								? classes["list__filterItem--selected"]
								: classes["list__filterItem--unselected"],
						)}
						data-value={value}
						key={value}
						onClick={onSelectCallback}
					>
						{text}
					</div>
				))}
			</div>
		),
	),
);
// #endregion
