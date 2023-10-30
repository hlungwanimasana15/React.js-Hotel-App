import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  { BrowserRouter as Router,  Switch,Route,Link} from 'react-router-dom'





function NavB() {

  return (
    <div>
    
    <Navbar expand="lg" bg='gray' variant={'outline-secondary'} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={'/homeAd'}>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/homeAd'>Home</Nav.Link>
            <Nav.Link as={Link} to={"details"}>all rooms</Nav.Link>
            <Nav.Link as={Link} to={"Create"}>Add new rooms</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">settings</NavDropdown.Item>
              <NavDropdown.Item  as={Link} to={"Login"}>Log out</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    
  
    
   
   
   </div>
  )
};

export default NavB;