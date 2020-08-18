import React, { useEffect, useState } from 'react';

import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

import Carousel from 'react-bootstrap/Carousel'

function App({getPictures, loadDatabase, getPrevDate, getNextDate, findOrCreate, likePicture, disPicture, pictureReducer}) {

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

	return (
		<Carousel>
			<Carousel.Item>
				<img
				className="d-block w-100"
				src="holder.js/800x400?text=First slide&bg=373940"
				alt="First slide"
				/>
				<Carousel.Caption>
				<h3>First slide label</h3>
				<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
				className="d-block w-100"
				src="holder.js/800x400?text=Second slide&bg=282c34"
				alt="Third slide"
				/>

				<Carousel.Caption>
				<h3>Second slide label</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
				className="d-block w-100"
				src="holder.js/800x400?text=Third slide&bg=20232a"
				alt="Third slide"
				/>

				<Carousel.Caption>
				<h3>Third slide label</h3>
				<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption>
			</Carousel.Item>
			</Carousel>
	)

}

const mapStateToProps = ({pictureReducer}) => ({
	pictureReducer
});

export default connect(mapStateToProps, actions)(App);