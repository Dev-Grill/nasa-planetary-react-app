import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import Home from "./screen/Home"
import Favorite from "./screen/Favorite"

export default function RouterComponent() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/favorite" component={Favorite} />
			</Switch>
		</Router>
	);
}