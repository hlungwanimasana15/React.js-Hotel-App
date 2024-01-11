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
    <div
      className="booking-container"
      style={{ backgroundColor: "#8298a2", padding: "10px" }}
    >
      <Container
        className="mt-5"
        style={{
          padding: "20px",
          fontFamily: "sans-serif",
          paddingBottom: 20,
          fontSize: "20px",
        }}
      >
        <Card>
          <Row>
            <Col lg={6}>
              <Carousel id="imageCarousel">
                {selectedItem &&
                  selectedItem.image &&
                  selectedItem.image.length > 0 &&
                  selectedItem.image.map((image, index) => {
                    console.log("Processing image:", image);
                    return (
                      <Carousel.Item key={index}>
                        <Image
                          src={image}
                          alt={`Room Image ${index + 1}`}
                          className="d-block w-100"
                        />
                      </Carousel.Item>
                    );
                  })}
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                margin: "20px",
                borderRadius: "8px",
                width: "70%",
              }}
            >
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                style={{
                  backgroundColor: "#b6c3c8",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                }}
              />
            </div>
            <Button
              variant="outline-secondary"
              onClick={(e) => checkAvalability(e)}
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                width: "150px",
              }}
            >
              Check Availability
            </Button>{" "}
          </div>

          {/* theform  */}
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: "10px", padding: "20px" }}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "40%",
                padding: "8px",
                marginBottom: "16px",
                boxSizing: "border-box",
                borderRadius: "4px",
              }}
            />
            <br></br>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "40%",
                padding: "8px",
                marginBottom: "16px",
                boxSizing: "border-box",
                borderRadius: "4px",
                paddingLeft: "60px",
              }}
            />
            <br></br>
            <label htmlFor="message">Your preferences:</label>
            <br></br>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: "45%",
                padding: "8px",
                marginBottom: "16px",
                boxSizing: "border-box",
                borderRadius: "4px",
              }}
            />
          </form>

          <Button
            type="submit"
            variant="primary"
            style={{
              marginTop: "40px",
              marginBottom: 40,
              padding: "10px",
              width: "200px",
              alignItems: "center",
              margin: "auto",
              display: "block",
            }}
            block
            onClick={bookAroom}
            disabled={isButtonDisabled}
          >
            Book Now
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default Booking;
