
import React, { useEffect, useState } from 'react';
import { db, storage } from '../config/firebase';
import { collection, doc, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import NavB from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Footer from '../clientComponents/Footer';

function Create() {
  // New room states
  const [roomList, setRoomList] = useState([]);
  const imagesListRef = ref(storage, 'hotelpictures/');
  const [imageUpload, setImageUpload] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [NewTitle, SetNewTitle] = useState('');
  const [NewLocation, SetNewLocation] = useState('');
  const [NewNumberOfPeople, SetNewNumberOfPeople] = useState('');
  const [NewNumberOfBed, SetNewNumberOfBed] = useState('');
  const [NewPerks, SetNewPerks] = useState('');
  const [NewPrice, SetNewPrice] = useState('');
  const [NewReviews, SetNewReviews] = useState('');

  const resizeImage = (imageFile, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const width = img.width;
        const height = img.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(imageFile);
        } else {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          canvas.width = width * ratio;
          canvas.height = height * ratio;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            resolve(new File([blob], imageFile.name, { type: imageFile.type }));
          }, imageFile.type);
        }
      };
    });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (imageUpload === null) return;

      const resizedImage = await resizeImage(imageUpload, 800, 600);

      const imageRef = ref(storage, `hotelpictures/${resizedImage.name + v4()}`);
      await uploadBytes(imageRef,resizedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl((prev) => [...prev, url]);
        });
      });

      const docRef = await addDoc(collection(db, 'rooms'), {
        title: NewTitle,
        location: NewLocation,
        NumberOfPeople: NewNumberOfPeople,
        numberOfBeds: NewNumberOfBed,
        perks: NewPerks,
        price: NewPrice,
        reviews: NewReviews,
        image: imageUrl,
        userId: auth?.currentUser.uid,
      });

      alert('Added');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const imagesListRef = ref(storage, 'hotelpictures/');
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrl((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <NavB />
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => SetNewTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => SetNewLocation(e.target.value)}
                  placeholder="Location"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridNumberOfPeople">
                <Form.Label>Max room occupants</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => SetNewNumberOfPeople(e.target.value)}
                  placeholder="Enter number of people"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridNumberOfBeds">
                <Form.Label>Number Of Beds</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => SetNewNumberOfBed(e.target.value)}
                  placeholder="Number of Beds"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridPerks">
                <Form.Label>Perks</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => SetNewPerks(e.target.value)}
                  placeholder="Perks"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => SetNewPrice(Number(e.target.value))}
                  placeholder="Price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridReviews">
                <Form.Label>Reviews</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => SetNewReviews(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridFile">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                  multiple
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            {imageUrl.length > 0 && (
              <div>
                <h4>Uploaded Images</h4>
                <div className="image-list">
                  {imageUrl.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Create;

