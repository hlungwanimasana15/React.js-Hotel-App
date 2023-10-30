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



function Footer() {
  return (
    <Card className="text-center">
      <Card.Header><h1>The Art Hotel</h1></Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=pretoria hatfield&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe><a href="https://embed-googlemap.com"></a></div>
              </div>
          <Container>
            < AiOutlineTwitter />
            < AiOutlineInstagram />
            < AiOutlineWhatsApp />
          </Container>
        </Card.Text>
       
      </Card.Body>
      <Card.Footer className="text-muted">
      < BsFillHouseCheckFill />Check-in  || From 14:00 to 22:00
      <br></br>
      <BsFillHouseExclamationFill/>Check-out || From 06:00 to 10:00
      </Card.Footer>
    </Card>

  )
}

export default Footer