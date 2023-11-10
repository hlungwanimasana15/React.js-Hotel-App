import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';

function Confirmation() {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const { selectedRoom, dateRange, formData } = bookingData;
  console.log(bookingData);

  return (
    
    <Card style={{ maxWidth: '600px', margin: 'auto', marginTop: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Card.Header style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6',fontFamily: "sans-serif", fontSize: "16px"  }}>
        <h3>Your Booking Receipt</h3>
      </Card.Header>
      <Card.Body>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Grand Solace Suites</h2>
          <p>Thank you for booking with us!</p>
        </div>
        <div>
          <h4>Contact Information</h4>
          <p>
            <strong>Name:</strong> {selectedRoom ? formData.name : 'N/A'}
            <br />
            <strong>Email:</strong> {selectedRoom ? formData.email : 'N/A'}
          </p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Booking Details</h4>
          <p>
            <strong>Room Title:</strong> {selectedRoom ? selectedRoom.title : 'N/A'}
            <br />
            <strong>Price:</strong> {selectedRoom ? `$${selectedRoom.price}` : 'N/A'}
            <br />
            <strong>Preferences:</strong> {selectedRoom ? formData.message : 'N/A'}
            <br />
            <strong>Start Date:</strong> {dateRange ? dateRange.startDate.toDateString() : 'N/A'}
            <br />
            <strong>End Date:</strong> {dateRange ? dateRange.endDate.toDateString() : 'N/A'}
          </p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h4>Total Price</h4>
          <p>
            <strong>Total:</strong> {selectedRoom ? `R${selectedRoom.price}` : 'N/A'}
          </p>
          <div>
          <Button href='/ClientHom' style={{alignItems:'flex-end',}} >See more</Button>
          </div>
        </div>
        <div style={{ marginTop: '20px', borderTop: '1px solid #dee2e6', paddingTop: '10px' }}>
          <footer style={{ textAlign: 'right', fontSize: '14px', color: '#6c757d' }}>
            Booked on {new Date().toLocaleDateString()}
          </footer>
        </div>
       
      </Card.Body>
    </Card>
  )
}

export default Confirmation
