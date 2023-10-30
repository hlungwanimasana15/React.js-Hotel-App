import React from 'react'
import Card from 'react-bootstrap/Card';


function Reviews() {

   

  return (
    <>

    <h1>Reviews</h1>
    <Card border="primary" style={{ width: '18rem' }}>
      <Card.Header>reviews</Card.Header>
      <Card.Body>
        <Card.Title>annah mahlangu</Card.Title>
        <Card.Text>
         great place will visit again
        </Card.Text>
      </Card.Body>
    </Card>
    <br />

    <Card border="secondary" style={{ width: '18rem' }}>
      <Card.Header>reviews</Card.Header>
      <Card.Body>
        <Card.Title>simon lephoto</Card.Title>
        <Card.Text>
          mos def will visit again
        </Card.Text>
      </Card.Body>
    </Card>
    <br />

    <Card border="success" style={{ width: '18rem' }}>
      <Card.Header>reviews</Card.Header>
      <Card.Body>
        <Card.Title>kagiso malebo</Card.Title>
        <Card.Text>
          friendly stuff
        </Card.Text>
      </Card.Body>
    </Card>
    <br />

   
  </>
  )
}

export default Reviews