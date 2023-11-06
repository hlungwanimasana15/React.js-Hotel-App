
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap components

function Details({ selectedItem }) {
  return (
    <div className="details-container">
      {selectedItem ? (
        <Card>
          <Card.Img variant="top" src={selectedItem.image} alt={selectedItem.title} />
          <Card.Body>
            <Card.Title>{selectedItem.title}</Card.Title>
            <Card.Text>
              <p>Price: {selectedItem.price}</p>
              <p>Location: {selectedItem.location}</p>
              <p>Number of People: {selectedItem.NumberOfPeople}</p>
              <p>Perks: {selectedItem.perks}</p>
              <p>Number of Beds: {selectedItem.numberOfbeds}</p>
              <p>Reviews: {selectedItem.reviews}</p>
            </Card.Text>
            <Link
              to={{
                pathname: '/booking',
                search: `?selectedItem=${encodeURIComponent(JSON.stringify(selectedItem))}`,
              }}
            >
              <Button variant="primary">Book</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <div>No item selected</div>
      )}
    </div>
  );
}

export default Details;
