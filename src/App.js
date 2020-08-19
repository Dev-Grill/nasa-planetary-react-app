import React from "react";
import Router from './router'

import store from './redux/store'
import { Provider } from 'react-redux'

export default function App() {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}