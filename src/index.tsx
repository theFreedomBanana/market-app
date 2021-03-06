import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { ConnectedRouter, connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as Store } from "react-redux";
import { initReactI18next } from "react-i18next";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import enTranslations from "../res/translations/en.json";
import { ApplicationFooter } from "./Components/Application/Footer";
import { ApplicationHeader } from "./Components/Application/Header";
import { ApplicationNav } from "./Components/Application/Nav";
import { application as applicationReducer } from "./Store/Application/reducers";
import { controllers as controllersReducer } from "./Store/Controllers/reducers";
import { information as informationReducer } from "./Store/Information/reducers";
import { sagasForServerRequests } from "./Store/sagas";
import { theme } from "./Theme";

const EMPTY_STATE = { item: {} };

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const middlewares = [sagaMiddleware, routerMiddleware(history)];
if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}

const store = createStore(
	combineReducers({
		applicaton: applicationReducer(),
		controllers: controllersReducer(),
		information: informationReducer(EMPTY_STATE),
		router: connectRouter(history),
	}),
	applyMiddleware(...middlewares),
);

sagaMiddleware.run(sagasForServerRequests);

const App = () => (
	<Store store={store}>
		<ConnectedRouter history={history}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<ApplicationHeader label="header" />
				<ApplicationNav />
				<ApplicationFooter />
			</ThemeProvider>
		</ConnectedRouter>
	</Store>
);

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	lng: "en",
	resources: {
		en: enTranslations,
	},
}).then(() => {
	ReactDOM.render(
		<App />,
		document.getElementById("root"),
	);
});
