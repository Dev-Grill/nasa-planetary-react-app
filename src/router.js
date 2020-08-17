import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import Home from "./screen/Home"

export default function RouterComponent() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	);
}