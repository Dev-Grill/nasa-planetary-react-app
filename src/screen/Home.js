import React, { useEffect, useState } from 'react';

import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

function App({getPictures, getRemotePicture}) {

	const [picture, set_picture] =  useState(null)
	const [selected_date, set_selected_date] =  useState(moment().format("YYYY-MM-DD"))

	//   const getNextDate = (date) => {
	// 	let prevDate = new Date(date);
	  
	// 	prevDate = prevDate.setDate(prevDate.getDate() + 1);
	  
	// 	return `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}`;
	// };
	  
	useEffect(() => {
		async function fetchData(){
			await fetchRemotePicture(selected_date)
		}
		fetchData()
	}, [true])


	const fetchRemotePicture = async (date) => {
		await getRemotePicture(date)
		.then(response => {
			set_picture(response.data)
		})
	}

	const getPrevDate = async () => {
		const new_date = moment(selected_date).subtract(1, 'day').format("YYYY-MM-DD")
		await fetchRemotePicture(new_date)
		set_selected_date(new_date)
	};
	  

	const getNextDate = async () => {
		const new_date = moment(selected_date).add(1, 'day').format("YYYY-MM-DD")
		await fetchRemotePicture(new_date)
		set_selected_date(new_date)
	};
	  
	return (
		<div className="App">
			<header className="App-header">
				{JSON.stringify(picture)}
			</header>

			<h1 onClick={() => getPrevDate()}>back</h1>
			<h1 onClick={() => getNextDate()}>forward</h1>
		</div>
	);
}

const mapStateToProps = (state) => ({
	pictureReducer: state.pictureReducer
});

export default connect(mapStateToProps, actions)(App);