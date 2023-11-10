
import React, { useEffect, useState } from 'react';
import { storage } from '../config/firebase';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

function Gallary() {

 
  const [imageUrl, setImageUrl] = useState([]);


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
    <Col md={6}>
    {imageUrl.length > 0 && (
      <div>
        <h1 className="gallery-heading">Image Gallery</h1>
       <br></br>
        <div className="image-list">
          {imageUrl.map((url, index) => (
            <div key={index} className="image-container">
              <img src={url} alt={`Uploaded ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    )}
  </Col>
  )
}

export default Gallary