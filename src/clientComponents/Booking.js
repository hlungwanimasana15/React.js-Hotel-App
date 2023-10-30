import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Carousel, Button, Form, Card } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { db } from '../config/firebase'
import { collection, getDoc, setDoc, doc, getDocs,serverTimestamp } from 'firebase/firestore'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useLocation } from 'react-router-dom';





function Booking(props) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedItemParam = searchParams.get('selectedItem');
  const selectedItem = selectedItemParam ? JSON.parse(decodeURIComponent(selectedItemParam)) : null;

  console.log('selecteditem',selectedItem);

  const [booking, setBooking] = useState("")



  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    // This function will be called when the user selects a date range
    setSelectionRange(ranges.selection);
  };
  
  const bookAroom = async (e) =>{
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
        
      };

      // Create a reference to the booking document
      const bookingRef = doc(db, 'booking', roomId);

      // Set the document data
      await setDoc(bookingRef, bookingData);

      alert('Booking has been successfully recorded in Firebase.');
    } catch (error) {
      console.error('Error booking the room:', error);
      alert('An error occurred while booking the room.');
    }
  }



  const checkAvalability = async (e,selectionRange) => {
    e.preventDefault()
    
    const roomId = selectedItem.userId
    const bookingRef = doc(db, 'booking',roomId);
    
    try {
      const docSnapshot = await getDoc(bookingRef);
  
      if (docSnapshot.exists()) {
        const firestoreDate = docSnapshot.data().dateRange.toDate(); 
  
        if (
          selectionRange.startDate >= firestoreDate &&
          selectionRange.endDate <= firestoreDate
        ) {
          alert('The room is available for the selected date range.');
        } else {
          alert('The room is not available for the selected date range.');
        }
      } else {
        // Handle the case when the document does not exist
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
   
    <div className="booking-container">
    <Container className="mt-5">
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
          >Check Availability</Button>{ ' '}
        </Col>
            <Form noValidate >
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"

                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
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
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Province</Form.Label>
                  <Form.Control type="text" placeholder="State" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Province.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control type="text" placeholder="Zip" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group controlId="bookingForm">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>


              <Button type="submit" variant="primary" block onClick={bookAroom}>Book Now</Button>

            </Form>
        </Card>
      </Container >
    </div>
  )
}

export default Booking