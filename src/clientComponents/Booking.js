import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Carousel, Button, Form, Card } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { db } from '../config/firebase'
import { collection, getDoc, setDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useLocation } from 'react-router-dom';





function Booking(props) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedItemParam = searchParams.get('selectedItem');
  const selectedItem = selectedItemParam ? JSON.parse(decodeURIComponent(selectedItemParam)) : null;

  console.log('selecteditem', selectedItem);

  const [booking, setBooking] = useState("")

  const [formData,setFormData] =useState({
    firstName: '',
    lastName: '',
    username: '',
    numberOfGuests: 0,
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    // This function will be called when the user selects a date range
    setSelectionRange(ranges.selection);
  };

  const bookAroom = async (e) => {
    e.preventDefault()
    if (!selectedItem) {
      console.error('No selected item to book.');
      return;
    }

    const roomId = selectedItem.userId;

    try {
      const bookingData = {
        selectedRoom: selectedItem,
        dateRange: selectionRange,
        ...formData,
      };
      const bookingRef = doc(db, 'booking', roomId);

      // Set the document data
      await setDoc(bookingRef, bookingData);

      alert('Booking has been successfully recorded in Firebase.');
    } catch (error) {
      console.error('Error booking the room:', error);
      alert('An error occurred while booking the room.');
    }
  }



  const checkAvalability = async (e, selectionRange) => {
    e.preventDefault()

    if (!selectedItem) {
      console.error('No selected item for availability check.');
      return;
    }
  
    const roomId = selectedItem.userId;
    const bookingRef = doc(db, 'bookings', roomId);
  
    try {
      const docSnapshot = await getDoc(bookingRef);
  
      if (docSnapshot.exists()) {
        const firestoreData = docSnapshot.data();
        
        if (firestoreData && firestoreData.dateRange) {
          const firestoreDateRange = firestoreData.dateRange;
          const selectedStartDate = selectionRange.startDate.toISOString();
          const selectedEndDate = selectionRange.endDate.toISOString();
  
          if (
            firestoreDateRange.startDate &&
            firestoreDateRange.endDate &&
            (selectedStartDate >= firestoreDateRange.startDate && selectedEndDate <= firestoreDateRange.endDate)
          ) {
            alert('The room is available for the selected date range.');
          } else {
            alert('The room is not available for the selected date range.');
          }
        } else {
          alert('The date range in the Firestore document is missing or invalid.');
        }
      } else {
        alert('The room is not booked.');
      }
    } catch (error) {
      console.error('Error getting document:', error);
      alert('An error occurred while checking availability.');
    }
  }


  useEffect(() => {

  }, []);


  return (

    <div className="booking-container" style={{ backgroundColor: '#8298a2', padding: '20px' }}>
      <Container className="mt-5" style={{ backgroundColor: '#b6c3c8', padding: '20px' }}>
        <Card>
          <Row>
            <Col lg={6}>
              <Carousel id="imageCarousel">
                <Carousel.Item>
                  <Image src={selectedItem.image} alt="Image 1" className="d-block w-100" />
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={selectedItem.image} alt="Image 2" className="d-block w-100" />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col>
              <div className="room-details">
                <h1>{selectedItem.title}</h1>
                <h3>Price: {selectedItem.price}</h3>
                <h3>Location: {selectedItem.location}</h3>
                <h3>Number of People: {selectedItem.NumberOfPeople}</h3>
                <h3>Perks: {selectedItem.perks}</h3>
                <h3>Number of Beds: {selectedItem.numberOfbeds}</h3>
                <h3>Reviews: {selectedItem.reviews}</h3>
              </div>
            </Col>
          </Row>

          <Col>

            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              
            />

            <Button variant="outline-secondary"
              onClick={checkAvalability}
              style={{ marginTop: '10px' }}
            >Check Availability</Button>{' '}
          </Col>
          <Form noValidate  >
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleFormChange}

                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={formData.username}
                  onChange={handleFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Form.Group controlId="bookingForm">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control type="number" value={formData.numberOfGuests}
                  onChange={handleFormChange}  required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
             

            <Button type="submit" variant="primary"   style={{ marginTop: '10px' }} block onClick={bookAroom}>Book Now</Button>
          </Form>
        </Card>
        </Container>
    </div>
  )
}

export default Booking