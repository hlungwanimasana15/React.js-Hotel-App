
import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import NavB from './Nav';
import Footer from '../clientComponents/Footer';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const CardWrapper = styled.div`
  max-width: 300px;
  margin: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const CardTitle = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

function HomeAd() {

  const [date, setDate] = useState(new Date());
  const [roomList, setRoomList] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const roomsCollectionRef = collection(db, 'rooms');
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRooms = async (id) => {
    const roomDoc = doc(db, 'rooms', id);
    await deleteDoc(roomDoc);
  };

  const updateRoom = async (id) => {
    const roomDoc = doc(db, 'rooms', id);
    await updateDoc(roomDoc, { title: updatedTitle });
  };

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await getDocs(roomsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRoomList(filteredData);
      } catch (error) {
        console.error(error);
      }
    }
    getRooms();
  }, [roomList]);

  return (
    <>
      <div>
        <NavB />
      </div>
      <CardContainer>
        {roomList.map((room) => (
          <CardWrapper key={room.id}>
            <Card>
              <CardImage src={room.image} />
              <Card.Body>
                <CardTitle>{room.title}</CardTitle>
                <CardTitle>{room.NumberOfPeople}</CardTitle>
                <CardTitle>{room.location}</CardTitle>
                <CardTitle>R{room.price}</CardTitle>
                <Button variant="danger" onClick={() => deleteRooms(room.id)}>Delete</Button>
                <input
                  type="text"
                  placeholder="New title..."
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Button variant="primary" onClick={() => updateRoom(room.id)}>Edit</Button>
              </Card.Body>
            </Card>
          </CardWrapper>
        ))}
      </CardContainer>
      <div><Button onClick={logOut}>Sign out</Button></div>
      <Footer />
    </>
  );
}

export default HomeAd;
