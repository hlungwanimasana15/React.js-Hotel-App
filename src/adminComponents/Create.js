import React, { useEffect, useState } from 'react'
import { db, storage, } from '../config/firebase'
import { collection, doc, addDoc } from 'firebase/firestore'
import { auth } from '../config/firebase';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import NavB from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Footer from '../clientComponents/Footer';







function Create() {
    //New movie states

    const [roomList, setRoomList] = useState([]);

    const imagesListRef = ref(storage, "hotelpictures/");

    const [imageUpload, setImageUpload] = useState('');
    const [imageUrl, setImageUrl] = useState([]);

    const [NewTitle, SetNewTitle] = useState("");
    const [NewLocation, SetNewLocation] = useState("");
    const [NewNumberOfPeople,SetNewNumberOfPeople] = useState("");
    const [NewNumberOfBed, SetNewNumberOfBed] = useState("");
    const [NewPerks, SetNewPerks] = useState("");
    const [NewPrice, SetNewPrice] = useState("");
    const [NewReviews, SetNewReviews] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            if (imageUpload === null) return;


            const imageRef = ref(storage, `hotelpictures/${imageUpload.name + v4()}`)
             await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl((prev) => [...prev, url]);
                });
            });
            
            const docRef = await addDoc(collection(db, 'rooms'), {
                title: NewTitle,
                location: NewLocation,
                NumberOfPeople:NewNumberOfPeople,
                numberOfBeds:NewNumberOfBed,
                perks: NewPerks,
                price: NewPrice,
                reviews: NewReviews,
                image: imageUrl,
                userId: auth?.currentUser.uid,
               
            });
            

            alert("Added")
        } catch (error) {
            console.error(error);
        }



    }

    // console.log(imagesListRef);

    useEffect(() => {
        const imagesListRef = ref(storage, "hotelpictures/");
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrl((prev) => [...prev, url])
                });
            });
        });
    }, []);

    return (
        <>
            <div>
                < NavB />
            </div>

            <div>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="Title"
                                onChange={(e) => SetNewTitle(e.target.value)}
                                placeholder="Enter Title" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="Location"
                                onChange={(e) => SetNewLocation(e.target.value)}
                                placeholder="Location" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGrid">
                            <Form.Label>Max room occupents</Form.Label>
                            <Form.Control type=""
                                onChange={(e) =>SetNewNumberOfPeople(e.target.value)}
                                placeholder="Enter number of people" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridNumberOfBeds">
                            <Form.Label>Number Of bed</Form.Label>
                            <Form.Control type=""
                                onChange={(e) => SetNewNumberOfBed(e.target.value)}
                                placeholder="" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="formGridPerks">
                            <Form.Label>Perks</Form.Label>
                            <Form.Control
                                onChange={(e) => SetNewPerks(e.target.value)}
                                placeholder="Perks" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                onChange={(e) => SetNewPrice(Number(e.target.value))}

                                placeholder="Price" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridReviews">
                            <Form.Label>Reviews</Form.Label>
                            <Form.Control
                                onChange={(e) => SetNewReviews(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Picture</Form.Label>

                        <Form.Control type="file"
                            onChange={(e) => { setImageUpload(e.target.files[0]) }}
                            multiple 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" >Submit</Button>
                </Form >
            </div>
            <br></br>
            <div>
                <Footer />
            </div>
        </>
    )
};

export default Create;