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

    const logOut = async () =>{

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
            <div >
            {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">ART Hotel</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
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
                <Carousel >
                    <Carousel.Item>
                        <img src={cover} style={{ width: '100%',height: '700px' }} />
                        <Carousel.Caption>
                            <h1>The Art Hotel</h1>
                            <p> We offer Experience</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={cover} style={{ width: '100%',height: '700px' }} />
                        <Carousel.Caption>
                            <h3>The Art Hotel</h3>
                            <p>We offer Class</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={cover} style={{ width: '100%',height: '700px' }} />
                        <Carousel.Caption>
                            <h1>The Art Hotel</h1>
                            <p>
                                We have it all
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br></br>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            /> <br></br>
                            <Form.Control
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />

                        </Col>
                        <Col>
                            <Button variant="primary" onClick={SearchData} >Search</Button>{' '}
                        </Col>
                    </Row>
                </Form>
            </div>
            <br></br>

            < Clientroom  roomList={roomList}  filteredResults={filteredResults} />
            {/* <Avail roomList={roomList}  filteredResults={filteredResults} Date={Date}   /> */}

            <br></br>

            < Footer />
        

        </>
    );
}
export default ClientHom