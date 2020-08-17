import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

function App({getPictures}) {

	useEffect(() => {
		getPictures()
	})

	return (
		<div className="App">
			<header className="App-header">
				working
			</header>
		</div>
	);
}

const mapStateToProps = (state) => ({
	pictureReducer: state.pictureReducer
});

export default connect(mapStateToProps, actions)(App);