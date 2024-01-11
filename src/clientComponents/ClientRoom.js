import React, { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { BsFillPeopleFill } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import Details from './roomDetails';



function Clientroom(props) {

    const {roomList } = props;
    console.log(props);
    


    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }


    return (
        <>
            <Container Container style={{ backgroundColor: '#6d8792', padding: '20px' }}>
                <div className="text-center">
                    <Row xs={1}  md={2} lg={3} >
                         {
                        roomList.map((room) => (
                            <div className='roomCont mb-3'

                            >
                                <Card key={room.id}
                                    // style={{ width: '25rem' }} 
                                    style={{
                                        height:630,
                                        display:'flex',
                                        width: '100%',
                                        margin: '10px',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        fontFamily:'sans-serif',
                                        fontSize:'16px',
                                        position:'relative'
                                    }}
                                    onClick={() => handleSelect(room)} >
                                    <img style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }} src={room.image} />
                                    <h1>{room.title} < BsFillPeopleFill /> </h1>
                                    <p>{room.location}</p>
                                    <p>{room.numberOfpeople}</p>
                                    <p>{room.numberOfBeds}</p>
                                    <p>{room.perks}</p>
                                    <p>{room.price}</p>
                                    <p>{room.reviews}</p>
                                    {values.map((v, idx) => (
                                        <Button key={idx} className="me-2 mb-2" style={{position:'absolute',bottom:0,width:'95%'}} onClick={() => handleShow(v)}>
                                            View more
                                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                        </Button>
                                    ))}
                                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Room information</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <Details selectedItem={selectedItem} />
                                        </Modal.Body>

                                    </Modal>
                                </Card>

                            </div>

                        ))}

                    </Row>
                </div>

                <br></br>

            </Container>
        </>
    )
}

export default Clientroom