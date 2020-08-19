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

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import Container from 'react-bootstrap/Container'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

function App(props) {

	const {
        loading, 
        getPictures,
		pictureReducer
	} = props

	const { pictures, likes } = pictureReducer
	
	useEffect(() => {
		async function fetchData(){
			await getPictures()
		}
		fetchData()
	}, [true])

	return (
		<Layout loanding={loading}>
			<Header />
            <CardDeck style={{marginTop: 50, margin: 10}}>
                {pictures.map((picture, index) => 
                    <Card style={{ width: '48rem' }}>
                        <Card.Img variant="top" src={picture.url} />
                        <Card.Body>
                            <Card.Title>{picture.title}</Card.Title>
                            <Card.Text>{picture.explanation}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                )}
            </CardDeck>
		</Layout>
	)

}

const mapStateToProps = ({pictureReducer}) => ({
	pictureReducer
});

export default connect(mapStateToProps, actions)(App);