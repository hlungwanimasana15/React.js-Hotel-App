import React, { useEffect, useState } from 'react'
import NavB from './Nav';
import { auth, db } from '../config/firebase'
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import 'react-calendar/dist/Calendar.css';
import Card from 'react-bootstrap/Card';
import Footer from '../clientComponents/Footer';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

 
function HomeAd() {
    const [date, setDate] = useState(new Date());

    const [roomList, setRoomList] = useState([]);

    const [fileUpload, setFileUpload] = useState(null);

    const [updatedTitle, setUpdatedTitle] = useState("");

    const roomsCollectionRef = collection(db, 'rooms')

    const navigate = useNavigate()
    const logOut = async () =>{

        try {
             await signOut(auth)
             navigate('/')
        } catch (error) {
            console.log(error)
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

    // const handleDateChange = (newDate) => {
    //     setDate(newDate);
    //   };

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
               

            } catch (error) {
                console.error(error)
            }

        }
        getRooms();
    }, [roomList]);


    return (
        <>
            <div>
                <NavB />

            </div>
            <div>
                {roomList.map((room) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                        <img src={room.image}/>
                        <h1>{room.title}</h1>
                        <p>{room.location}</p>                  
                        <p>{room.numberOfBeds}</p>
                        <p>{room.numberOfPeople}</p>
                        <p>{room.perks}</p>
                        <p>{room.price}</p>
                        <p>{room.reviews}</p>
                        <button variant="danger" type='submit' onClick={() => { deleteRooms(room.id) }}>delete</button>
                        <input
                            placeholder="new title..."
                            onChange={(e) => setUpdatedTitle(e.target.value)} />
                        <button variant="primary" type='Edit' onClick={() => updateRoom(room.id)} >Edit</button>
                        </Card>
                    </div>

                ))}
                <div><button onClick={logOut}>Sign out</button></div>
               
            </div>

         <Footer />   
        </>
    )
}

export default HomeAd