import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { PiBedLight } from 'react-icons/pi'
import { ImLocation2 } from 'react-icons/im'
import { CiStar } from 'react-icons/ci'
import { BsPeople } from 'react-icons/bs'



function Details({ selectedItem }) {

  const [user, setUser] = useState(null);

  return (
    <div className="details-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}  >
      {selectedItem ? (
        <div className="details-content">
          <div className="image-container">
            <img src={selectedItem.image} alt={selectedItem.title} />
          </div>
          <div className="info-container">
            <h1 className="title">{selectedItem.title}</h1>
            <div className="property-info">
              <div className="property-info-section">
                <h3>Price: R{selectedItem.price} per night</h3>
              </div>
              <hr className="divider" />
              <div className="property-info-section">
                <div className="icon-container">
                  <ImLocation2 />
                </div>
                <h3>Location: {selectedItem.location}</h3>
              </div>
              <hr className="divider" />
              <div className="property-info-section">
                <div className="icon-container">
                  <BsPeople />
                </div>
                <h3>Accommodates: {selectedItem.NumberOfPeople} guests</h3>
              </div>
              <hr className="divider" />
              <div className="property-info-section">
                <h3>Perks: {selectedItem.perks}</h3>
              </div>
              <hr className="divider" />
              <div className="property-info-section">
                <div className="icon-container">
                  <PiBedLight />
                </div>
                <h3>Number of Beds: {selectedItem.numberOfbeds}</h3>
              </div>
              <hr className="divider" />
              <div className="property-info-section">
                <div className="icon-container">
                  <CiStar />
                </div>
                <h3>Reviews: {selectedItem.reviews}</h3>
              </div>
            </div>
            <Link
              to={{
                pathname: '/booking',
                search: `?selectedItem=${encodeURIComponent(JSON.stringify(selectedItem))}`,
              }}
              className="book-button"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: 'grey',
                color: 'white',
                fontSize: '16px',
                textDecoration: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              
            >
              Reserve the Suite
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-item-selected">No item selected</div>
      )}
    </div>
  );
}

export default Details
