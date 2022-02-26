
import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../res/translations/en.json';

const App = () => {

	return (
		<h1>Hello world</h1>
	)
};


i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
	lng: 'en',
	resources: {
		en: enTranslations,
	},
}).then(() => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});
