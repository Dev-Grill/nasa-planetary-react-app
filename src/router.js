import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import HomePage from "./components/HomePage"

export default function RouterComponent() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={HomePage} />
			</Switch>
		</Router>
	);
}