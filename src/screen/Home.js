import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

import Header from "../components/Header"
import Layout from "../components/Layout"
import Record from "../components/Record"

function App(props) {

	const {
		getPicture, 
		loadDatabase, 
		getPrevDate, 
		getNextDate, 
		likePicture, 
		disPicture, 
		pictureReducer
	} = props

	const { picture, loading } = pictureReducer

	console.log(pictureReducer)
	
	useEffect(() => {
		async function fetchData(){
			await loadDatabase()
		}
		fetchData()
	}, [true])


	const handleInputOnChange = (e) => {
		getPicture(e.target.value)
	}

	const handleControl = (type) => {
		if(type == "left"){
			getPrevDate(picture.date)
		}

		if(type == "right"){
			getNextDate(picture.date)
		}
	}

	return (
		<Layout loading={loading}>
			<Header />
			{(picture) && <Record 
				picture={picture} 
				disPicture={disPicture}
				handleControl={handleControl}
				likePicture={likePicture} 
				handleInputOnChange={handleInputOnChange}
			/>}
		</Layout>
	)

}

const mapStateToProps = ({pictureReducer}) => ({
	pictureReducer
});

export default connect(mapStateToProps, actions)(App);