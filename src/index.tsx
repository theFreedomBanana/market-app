
import { CssBaseline } from "@material-ui/core";
import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";

import enTranslations from "../res/translations/en.json";
import { ApplicationHeader } from "./Components/Application/Header/index";

const App = () => (
	<>
		<CssBaseline />
		<ApplicationHeader />
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
		<App />,
		document.getElementById("root"),
	);
});
