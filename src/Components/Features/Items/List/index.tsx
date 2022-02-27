import { createStyles, withStyles } from "@material-ui/core";
import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Store } from "../../../../Store";
import { ACTIONS } from "../../../../Store/actions";


const styles = () => createStyles({
	feature__container: { backgroundColor: "#FAFAFA", padding: "0 6rem" },
});

const mapStateToProps = (store: Store) => ({
	store: {
		information: {
			item: { ...store.information?.item },
		},
	},
});

export const ItemsList = connect(mapStateToProps)(
	withStyles(styles)(
		memo(
			({ dispatch }: { dispatch: Dispatch }) => {

				useEffect(
					() => {
						dispatch({ type: ACTIONS.FETCH_REQUESTED });
					},
					[dispatch],
				);

				return (
					<>
						<h1>foo</h1>
					</>
				);
			},
		),
	),
);

ItemsList.displayName = "itemsList";
