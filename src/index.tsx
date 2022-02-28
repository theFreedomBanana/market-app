import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as Store } from "react-redux";
import { initReactI18next } from "react-i18next";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import enTranslations from "../res/translations/en.json";
import { ApplicationHeader } from "./Components/Application/Header";
import { ApplicationSection } from "./Components/Application/Section";
import { application as applicationReducer } from "./Store/Application/reducers";
import { information as informationReducer } from "./Store/Information/reducers";
import { sagaForFetchRequested } from "./Store/Information/sagas";
import { theme } from "./Theme";

const EMPTY_STATE = { item: {} };

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];
middlewares.push(sagaMiddleware);
if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}

const store = createStore(
	combineReducers({
		applicaton: applicationReducer(),
		information: informationReducer(EMPTY_STATE),
	}),
	applyMiddleware(...middlewares),
);

sagaMiddleware.run(sagaForFetchRequested);

const App = () => (
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<ApplicationHeader />
			<ApplicationSection />
		</ThemeProvider>
	</>
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
		<Store store={store}>
			<App />
		</Store>,
		document.getElementById("root"),
	);
});
