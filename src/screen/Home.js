import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

function App({getPictures}) {


	const [pictures, set_pictures] =  useState([])

	useEffect(() => {

		async function fetchData(){
			await getPictures()
			.then(response => {
				console.log(response.data)
			})
		}

		fetchData()

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