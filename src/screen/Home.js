import React, { useEffect, useState } from 'react';

import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

function App({getPictures, loadDatabase, getPrevDate, getNextDate, findOrCreate, likePicture, disPicture, pictureReducer}) {

	const { picture, likes } = pictureReducer
	const [selected_date, set_selected_date] =  useState(moment("2020-08-12").format("YYYY-MM-DD"))
	
	useEffect(() => {
		async function fetchData(){
			await loadDatabase()
		}
		fetchData()
	}, [true])

	const fetchRemotePicture = async (date) => {
		// await getRemotePicture(date)
	}
	
	const handleLike = (picture) => {
		likePicture(picture)
	}
	
	const handleUnlike = (picture) => {
		disPicture(picture)
	}

	if(picture){
		return (
			<div className="App">
				<header className="App-header">
					{picture.date} 
					{picture.favorite && <span> liked</span>}
				</header>

				<h1 onClick={() => getPrevDate(picture.date)}>back</h1>
				<h1 onClick={() => getNextDate(picture.date)}>forward</h1>
	
				<h1 onClick={() => handleLike(picture)}>Like Picture</h1>
				<h1 onClick={() => handleUnlike(picture)}>Unlike Picture</h1>
				
				likes
				<header className="App-header">
					{JSON.stringify(likes)}
				</header>
			</div>
		)
	}
	else {
		return (
			<h1>loanding</h1>
		)
	}

}

const mapStateToProps = ({pictureReducer}) => ({
	pictureReducer
});

export default connect(mapStateToProps, actions)(App);