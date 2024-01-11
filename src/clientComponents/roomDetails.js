import React from 'react';
import { Link } from 'react-router-dom';
import { PiBedLight } from 'react-icons/pi';
import { ImLocation2 } from 'react-icons/im';
import { CiStar } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';

function Details({ selectedItem }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      {selectedItem ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '1200px',
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
          <div style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
              {selectedItem.title}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 100%', marginBottom: '10px' }}>
                <h3>Price: R{selectedItem.price} per night</h3>
              </div>
              <hr style={{ flex: '1 1 100%', border: '1px solid #ddd' }} />
              <div style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <ImLocation2 style={{ marginRight: '10px', fontSize: '20px' }} />
                <h3>Location: {selectedItem.location}</h3>
              </div>
              <hr style={{ flex: '1 1 100%', border: '1px solid #ddd' }} />
              <div style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <BsPeople style={{ marginRight: '10px', fontSize: '20px' }} />
                <h3>Accommodates: {selectedItem.numberOfPeople} guests</h3>
              </div>
              {/* ... Other property info sections ... */}
            </div>
            <Link
              to={{
                pathname: '/booking',
                search: `?selectedItem=${encodeURIComponent(
                  JSON.stringify(selectedItem)
                )}`,
              }}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4285f4',
                color: '#fff',
                fontSize: '16px',
                textDecoration: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              className="book-button"
            >
              Reserve the Suite
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontSize: '18px', color: '#555', marginTop: '20px' }}>
          No item selected
        </div>
      )}
    </div>
  );
}

export default Details;
