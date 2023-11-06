import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
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
                <BsFillHouseCheckFill /> Home
              </ListGroup.Item>
              <ListGroup.Item>
                <BsFillHouseExclamationFill /> About Us
              </ListGroup.Item>
              {/* Add more links as needed */}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Card.ImgOverlay>
  </Card>

         
  )
}

export default Footer