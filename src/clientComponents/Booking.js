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
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom/dist';






function Booking(props) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedItemParam = searchParams.get('selectedItem');
  const selectedItem = selectedItemParam ? JSON.parse(decodeURIComponent(selectedItemParam)) : null;


  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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
    console.log('dfS', ranges.selection);
  };

  const bookAroom = async (e) => {
    e.preventDefault()
    console.log('user', user);

    if (user) {
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
        alert('Booking has been successful');
      } catch (error) {
        console.error('Error booking the room:', error);
        alert('An error occurred while booking the room.');
      }
    } else {
      alert('please login')
      navigate('/login')
    }

  }

  const checkAvalability = async (e) => {
    e.preventDefault()

    console.log(' selecteditem', selectedItem.id);


    if (!selectedItem) {
      console.error('No selected item for availability check.');
      return;
    }
   
    const roomId = selectedItem.userId;
    console.log(roomId)

    const bookingRef = collection(db, 'booking');
    // const roomsRef = collection(db, 'rooms')


    try {
      const docSnapshot = await getDocs(bookingRef);
      var bookings = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      console.log('bookings', bookings.id);

      bookings.forEach((book) => {

        const firestoreData = book;
        if (firestoreData && firestoreData.dateRange) {
          const firestoreDateRange = firestoreData.dateRange;
          const firestoreStartDate = new Date(convertDate(firestoreDateRange.startDate.seconds));
          const firestoreEndDate = new Date(convertDate(firestoreDateRange.endDate.seconds));
          const selectedStartDate = new Date(selectionRange.startDate)
          const selectedEndDate = new Date(selectionRange.endDate)

          // console.log('firestoreStartDate', firestoreStartDate,
          //   'firestoreEndDate', firestoreEndDate,
          //   'selectedStartDate', selectedStartDate, 'selectedEndDate', selectedEndDate);


          if (
            
            (selectedStartDate >= firestoreStartDate && selectedEndDate <= firestoreEndDate)
          ) {
            console.log('room not available')
            
          } else {
            console.log('room  available');
    
          }
        } else {
          alert('The date range is invalid.');
        }
      })
    } catch (error) {
      console.error('Error getting document:', error);
      alert('An error occurred while checking availability.');
    }
  }

  function convertDate(timeS) {
    const timestamp = timeS; // The given timestamp

    // Convert the timestamp to a Date object
    const date = new Date(timestamp * 1000);

    // Format the Date object to the desired format
    const formattedDate = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    // console.log(formattedDate);

    return formattedDate;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (

    <div className="booking-container" style={{ backgroundColor: '#8298a2', padding: '20px' }}>
      <Container className="mt-5" style={{ backgroundColor: '#b6c3c8', padding: '20px' }}>
        <Card>
          <Row>
            <Col lg={6}>
              <Carousel id="imageCarousel">
                <Carousel.Item>
                  <Image
                    src={selectedItem.image}
                    alt="Image 1" className="d-block w-100" />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={selectedItem.image}
                    alt="Image 2" className="d-block w-100" />
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
              onClick={(e) => checkAvalability(e)}
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
                onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>


            <Button type="submit" variant="primary" style={{ marginTop: '10px' }} block onClick={bookAroom}>Book Now</Button>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

export default Booking