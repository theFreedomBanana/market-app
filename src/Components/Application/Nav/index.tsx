import { RouterLocation } from "connected-react-router";
import { LocationState } from "history";
import React, { memo } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { createSelector } from "reselect";
import { Store } from "../../../Store";
import { ItemsSection } from "../../Controllers/Sections/Items";

// #region TYPES
interface ApplicationNavProps {
	/**
	 * The location object from the redux store
	 */
	location: RouterLocation<LocationState>;
}
// #endregion

// #region CONSTANTS
const selectRoute = createSelector(
	[(store) => store.router],
	(router) => router.location,
);

const mapStateToProps = (store: Store) => ({
	location: selectRoute(store),
});
// #endregion

// #region COMPONENT
/**
 * A component in charge of rendering the different sections according to navigation
 */
export const ApplicationNav = connect(mapStateToProps)(
	memo(
		({ location }: ApplicationNavProps) => (
			<Switch location={location}>
				<Route
					path={"/items"}
					render={() => (
						<ItemsSection label="items" />
					)}
				/>
				<Redirect from='*' to="/items" />
			</Switch>
		),
	),
);
// #endregion

ApplicationNav.displayName = "applicationNav";
