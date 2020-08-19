import React, { useEffect, useState } from 'react';

import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

import Header from "../components/Header"
import Layout from "../components/Layout"
import Record from "../components/Record"

import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

function App(props) {

	const {
		loading, 
		getPicture, 
		loadDatabase, 
		getPrevDate, 
		getNextDate, 
		findOrCreate, 
		likePicture, 
		disPicture, 
		pictureReducer
	} = props

	const { picture, likes } = pictureReducer
	const [selected_date, set_selected_date] =  useState(moment("2020-08-12").format("YYYY-MM-DD"))
	
	useEffect(() => {
		async function fetchData(){
			await loadDatabase()
		}
		fetchData()
	}, [true])
	
	const handleLike = (picture) => {
		likePicture(picture)
	}
	
	const handleUnlike = (picture) => {
		disPicture(picture)
	}

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
		<Layout loanding={loading}>
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