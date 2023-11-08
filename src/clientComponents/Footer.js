import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { BsFillHouseCheckFill } from 'react-icons/bs'
import {BsFillHouseExclamationFill } from 'react-icons/bs'
import ListGroup from 'react-bootstrap/ListGroup';


function Footer() {

  const cardStyle = {
    height: '400px',
  };

  return (
    <Card className="bg-dark text-white" style={cardStyle}>
    <Card.ImgOverlay>
      <Container>
        <Row>
          <Col>
            <h4>Contact Us</h4>
            <p>123 hatfield Street</p>
            <p>Pretoria, South Africa</p>
            <p>Phone: +123 456 789</p>
          </Col>
          <Col>
            <h4>Connect with Us</h4>
            <Button variant="outline-light">
              <AiOutlineTwitter /> Twitter
            </Button>
            <Button variant="outline-light">
              <AiOutlineInstagram /> Instagram
            </Button>
            <Button variant="outline-light">
              <AiOutlineWhatsApp /> WhatsApp
            </Button>
          </Col>
          <Col>
            <h4>Quick Links</h4>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <BsFillHouseCheckFill href='/ClientHom' /> Home
              </ListGroup.Item>
              <ListGroup.Item>
                <BsFillHouseExclamationFill href='/HotelPolicy' /> About Us
              </ListGroup.Item>
             
            </ListGroup>
          </Col>
          </Row>
          <Col>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0"
               marginwidth="0" src="https://maps.google.com/maps?width=406&amp;height=273&amp;hl=en&amp;q=pretoria&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
               <a href="https://embed-googlemap.com"></a>
                </div>
                </div>
          </Col>
       
      </Container>
    </Card.ImgOverlay>
  </Card>

         
  )
}

export default Footer