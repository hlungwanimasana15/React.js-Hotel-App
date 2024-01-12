import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Carousel,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { db } from "../config/firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom/dist";

function Booking(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedItemParam = searchParams.get("selectedItem");
  const selectedItem = selectedItemParam
    ? JSON.parse(decodeURIComponent(selectedItemParam))
    : null;

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
    );
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    // This function will be called when the user selects a date range
    setSelectionRange(ranges.selection);
    console.log("dfS", ranges.selection);
  };

  const bookAroom = async (e) => {
    e.preventDefault();
    console.log("user", user);

    if (user) {
      if (!selectedItem) {
        console.error("No selected item to book.");
        return;
      }
      const roomId = selectedItem.userId;
      try {
        const bookingData = {
          selectedRoom: selectedItem,
          dateRange: selectionRange,
          formData,
        };
        const bookingRef = doc(db, "booking", roomId);

        // Set the document data
        await setDoc(bookingRef, bookingData);
        alert("Booking has been successful");

        navigate("/Confirmation", { state: { bookingData } });
      } catch (error) {
        console.error("Error booking the room:", error);
        alert("An error occurred while booking the room.");
      }
    } else {
      alert("please login");
      navigate("/login");
    }
  };

  const checkAvalability = async (e) => {
    e.preventDefault();

    if (!selectedItem) {
      console.error("No selected item for availability check.");
      return;
    }
    const bookingRef = collection(db, "booking");
    try {
      const docSnapshot = await getDocs(bookingRef);
      var bookings = docSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log("bookings", bookings.id);

      bookings.forEach((book) => {
        const roomId = selectedItem.id;

        if (book.selectedRoom.id === roomId) {
          const firestoreData = book;
          if (firestoreData && firestoreData.dateRange) {
            const firestoreDateRange = firestoreData.dateRange;
            const firestoreStartDate = new Date(
              convertDate(firestoreDateRange.startDate.seconds)
            );
            const firestoreEndDate = new Date(
              convertDate(firestoreDateRange.endDate.seconds)
            );
            const selectedStartDate = new Date(selectionRange.startDate);
            const selectedEndDate = new Date(selectionRange.endDate);
            if (
              selectedStartDate <= firestoreEndDate &&
              firestoreStartDate <= selectedEndDate
            ) {
              console.log("room not available");
              setButtonDisabled(true);
              alert("Button has been disabled!");
            } else {
              console.log("room  available");
              setButtonDisabled(false);
              alert("Button has been enabled!");
            }
          } else {
            alert("The date range is invalid.");
          }
        } else {
          console.log("room  not found");
        }
      });
    } catch (error) {
      console.error("Error getting document:", error);
      alert("An error occurred while checking availability.");
    }
  };

  function convertDate(timeS) {
    const timestamp = timeS; // The given timestamp

    // Convert the timestamp to a Date object
    const date = new Date(timestamp * 1000);

    // Format the Date object to the desired format
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
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
    <div className="booking-container" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
    <Container>
      <Card>
        <Row>
          
          <Col xs={12} md={6}>
            <Carousel id="imageCarousel">
              {selectedItem &&
                selectedItem.image &&
                selectedItem.image.length > 0 &&
                selectedItem.image.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={image}
                      alt={`Room Image ${index + 1}`}
                      className="d-block w-100"
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
          <Col xs={12} md={6}>
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
        <div className="booking-section">
          <div className="date-picker-section">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              style={{ background: '#fff', fontSize: '15px', borderRadius: '8px',zIndex: 1 }}
            />
          </div>
          <Button
            variant="primary"
            onClick={checkAvalability}
            style={{ marginTop: '10px', width: '100%' }}
          >
            Check Availability
          </Button>
        </div>

        <Form onSubmit={handleSubmit} className="user-preferences-form">
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label>Your preferences:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your preferences"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{ marginTop: '20px', width: '100%' }}
            onClick={bookAroom}
            disabled={isButtonDisabled}
          >
            Book Now
          </Button>
        </Form>
      </Card>
    </Container>
  </div>
  );
}

export default Booking;
