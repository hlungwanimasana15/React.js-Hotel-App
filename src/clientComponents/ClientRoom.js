import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { collection, getDocs, doc } from 'firebase/firestore'
import 'react-calendar/dist/Calendar.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';

import Container from 'react-bootstrap/esm/Container';
import { BsFillPeopleFill } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import Details from './Details';



function Clientroom(filteredResults) {
 const filter = filteredResults;

   
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



    const [roomList, setRoomList] = useState([]);
    const [filteredRoomList, setFilteredRoomList] = useState([]);

    const roomsCollectionRef = collection(db, 'rooms')

   
    useEffect(() => {
        const getRooms = async () => {
            //READ THE DATA
            //SET THE ROOM LIST
            try {
                const data = await getDocs(roomsCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id,
                }));

                setRoomList(filteredData)
                console.log("rl", roomList);

            } catch (error) {
                console.error(error)
            }

        }
        getRooms();
        setFilteredRoomList(roomList);
    }, []);

    console.log(roomList);

    return (
        <>
            <Container Container style={{ backgroundColor: '#6d8792', padding: '20px' }}>
                <div className="text-center">
                    <Row md={3}  >
                        { filter && ("")}:
                        {roomList.map((room) => (
                            <div className='roomCont mb-3'
                                
                            > 
                                <Card key={room.id} 
                                // style={{ width: '25rem' }} 
                                style={{
                                    width: '25rem',
                                    // Add additional styles here as needed
                                    margin: '10px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',}}
                                     onClick={() => handleSelect(room)} >
                                    <img  style={{
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
                                        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
                                            View more
                                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                        </Button>
                                    ))}  
                                   <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Room information</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        
                                           <Details  selectedItem={selectedItem} />
                                        </Modal.Body>

                                    </Modal>
                                </Card> 

                             </div>

                        )) }

                    </Row>
                </div>

                <br></br>

            </Container>
        </>
    )
}

export default Clientroom