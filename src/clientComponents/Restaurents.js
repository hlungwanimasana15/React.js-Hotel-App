import React from 'react'
import Card from 'react-bootstrap/Card';
import  rest1 from '../assets/rest1.jpg';
import  rest2 from '../assets/rest2.jpg'
import  casino from '../assets/casino.jpg'

function Restaurents() {
  return (
  <>  
    <div>
    <Card className="bg-dark text-white">
    <Card.Img src={rest1} alt="Card image" />
    <Card.ImgOverlay>
      <Card.Title>THE ART HOTEL</Card.Title>
      <Card.Text>
       our very own Restaurents with professional chefs
      </Card.Text>
      <Card.Text>Last updated 3 mins ago</Card.Text>
    </Card.ImgOverlay>
  </Card>
  </div>
  
  <div>
<Card className="bg-dark text-white">
<Card.Img src={rest2} alt="Card image" />
<Card.ImgOverlay>
  <Card.Title>THE ART HOTEL</Card.Title>
  <Card.Text>
   our very own Restaurents with professional chefs
  </Card.Text>
  <Card.Text>Last updated 3 mins ago</Card.Text>
</Card.ImgOverlay>
</Card>
</div>
<div>
<Card className="bg-dark text-white">
<Card.Img src={casino} alt="Card image" />
<Card.ImgOverlay>
  <Card.Title>THE ART HOTEL</Card.Title>
  <Card.Text>
   our very own Restaurents with professional chefs
  </Card.Text>
  <Card.Text>Last updated 3 mins ago</Card.Text>
</Card.ImgOverlay>
</Card>
</div>


</>
  )
}

export default Restaurents