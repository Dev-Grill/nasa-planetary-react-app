import React from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

function Record(props) {

    const {
        picture, 
        disPicture, 
        handleControl,
        likePicture, 
        handleInputOnChange
    } = props

	return (
        <Container>
            <Row style={{marginTop: 70}}>
                <Col className="" md={{ span: 6 }}>
                    <h4>{picture.title}</h4>
                </Col>
                <Col style={{textAlign: 'right'}} md={{ }}>
                    Select Day {' '}
                    <input onChange={handleInputOnChange} type="date" />
                </Col>
            </Row>
            
            <Row style={{height: 600}}>
                <Col style={{marginBottom: 10}} md={{span: 12}}>
                    <img src={picture.url} style={{height: 600, width: '100%'}} className="img-fluid" alt="Responsive image" />
                    <p onClick={() => handleControl('left')} className="left-control">{'<'}</p>
                    <p onClick={() => handleControl('right')} className="right-control">{'>'}</p>
                    <p style={{marginTop: 10}}>{picture.explanation}</p>
                </Col>
                {(!picture.dummy) && <Col md={{ span: 6}}>
                    {(!picture.favorite) && <Button onClick={() => likePicture(picture)} variant="success">Like</Button>}
                    {(picture.favorite) && <Button  onClick={() => disPicture(picture)} variant="danger">Unlike</Button>}
                </Col>}
            </Row>
        </Container>
	)
}

export default Record;