import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import * as actions from '../redux/actions' 

import Header from "../components/Header"
import Layout from "../components/Layout"


import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'


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
                <Container>
                <Row>
                {pictures.map((picture, index) => 
                    <Col xs={6} md={4} style={{marginTop: 20}}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={picture.url} />
                        <Card.Body>
                            <Card.Title>{picture.title}</Card.Title>
                            <Card.Text>{picture.explanation}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                )}
                </Row>
              </Container>
		</Layout>
	)

}

const mapStateToProps = ({pictureReducer}) => ({
	pictureReducer
});

export default connect(mapStateToProps, actions)(App);