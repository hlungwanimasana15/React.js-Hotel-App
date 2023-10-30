import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { collection, getDocs, doc } from 'firebase/firestore'
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';


function Details({selectedItem}) {


  return (
    <>
    {selectedItem ? (
      <div>
        <img src={selectedItem.image} alt={selectedItem.title} />
        <h1>{selectedItem.title}</h1>
        <h3>{selectedItem.price}</h3>
        <h3>{selectedItem.location}</h3>
        <h3>{selectedItem.NumberOfPeople}</h3>
        <h3>{selectedItem.perks}</h3>
        <h3>{selectedItem.numberOfbeds}</h3>
        <h3>{selectedItem.reviews}</h3>
      </div>
    ) : (
      <div>No item selected</div>
    )}

    <Link to={{
        pathname: '/booking',
        search: `?selectedItem=${encodeURIComponent(JSON.stringify(selectedItem))}`
      }} >
      Book
    </Link>
  </>
  
    
  );
}

export default Details