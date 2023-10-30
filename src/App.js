import React from 'react';
import LoginAd from './adminComponents/LoginAd';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Create from './adminComponents/Create';
import Details from './clientComponents/Details';
import NotFound from './adminComponents/NotFound';
import HomeAd from './adminComponents/HomeAd';
import ClientHom from './clientComponents/ClientHom';
import Footer from './clientComponents/Footer';
import Gallary from './clientComponents/Gallary';
import Restaurents from './clientComponents/Restaurents';
import Reviews from './clientComponents/Reviews';
import HotelPolicy from './clientComponents/HotelPolicy';
import Booking from './clientComponents/Booking';
import SignUp from './clientComponents/SignUp';



const  App = ()  => {
  
  return (
    <Router>
      <Routes>
     
       <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<LoginAd />}></Route>
        <Route path='/newRoom' element={<Create />} />
        <Route path='/homeAd' element={<HomeAd/>} />
        <Route path='/ClientHom' element={<ClientHom />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/gallary' element={< Gallary />} />
        <Route path='/rest' element={< Restaurents />} />
        <Route path='/review' element={< Reviews/>} />
        <Route path='/hotelpolicy' element={< HotelPolicy/>} />
        <Route path='/Details' element={< Details />} />
        <Route path='/booking' element={< Booking />} />
        <Route path='*' element={<NotFound />} />
       
      </Routes> 
      </Router>
  );
}

export default App;
