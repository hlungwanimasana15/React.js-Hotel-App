import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { collection, getDocs, doc, query, where } from 'firebase/firestore'
import { auth, db, storage } from '../config/firebase'
import cover from '../assets/view333.jpg'
import Footer from './Footer';
import Clientroom from './ClientRoom';
import { signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';





function ClientHom() {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const roomsCollectionRef = collection(db, 'rooms')

  const [roomList, setRoomList] = useState([]);

  console.log('roomlist', roomList);

  const navigate = useNavigate();

  const logOut = async () => {

    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }



  /// search function
  const SearchData = async () => {

    const collectRoom = roomsCollectionRef

    const q = query(
      collectRoom,
      where('price', '>=', parseInt(minPrice)),
      where('price', '<=', parseInt(maxPrice))
    );

    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc) => doc.data());

    console.log("filtered", filteredData);

    setFilteredResults(filteredData)
  }



  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  useEffect(() => {

  },)


  return (
    <>
      <div style={{ backgroundColor: '#c7cbc9', paddingLeft: '0', paddingBottom: '0' }} >
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand href="#" style={{ fontFamily: "sans-serif", fontSize: "36px" }} >Grand Solace Suites</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Grand Solace Suites
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/gallary">Gallary</Nav.Link>
                    <Nav.Link href="/rest">Restuarent</Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3" onClick={logOut}>LogOut</NavDropdown.Item>
                      <NavDropdown.Item href="/review">
                        Reviews
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/hotelpolicy">
                        HotelPolicy
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="dlex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

        ))}
        <Container style={{
          marginBottom: '20px', display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '15vh',
          //  backgroundColor: '#c7cbc9', 
          fontFamily: "sans-serif"
        }}>
          <Row >
            <h3 style={{ paddingLeft: "-100" }}>offers</h3>
            <h1>A SUITE RETREAT</h1>
          </Row>
        </Container>
        <Carousel >
          <Carousel.Item>
            <img src={cover} style={{ width: '100%', height: '700px', padding: '10 40px', }} />
            <Carousel.Caption>

              <p> We offer Experience</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={cover} style={{ width: '100%', height: '700px' }} />
            <Carousel.Caption>
              <p>We offer Class</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={cover} style={{ width: '100%', height: '700px' }} />
            <Carousel.Caption>
              <h1>The Art Hotel</h1>
              <p>
                We have it all
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br></br>
        <Container>
          <Row className="my-4">
            <Col xs={12} md={6}>
              <Form>
                <Form.Group>
                  <Form.Label>Minimum Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter minimum price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <Form>
                <Form.Group>
                  <Form.Label>Maximum Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter maximum price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={SearchData}>
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ backgroundColor: '#c7cbc9' }} >
        < Clientroom roomList={roomList} filteredResults={filteredResults} />
        <br></br>
      </div>
      < Footer />


    </>
  );
}
export default ClientHom