import React from 'react';
import LoginAd from './adminComponents/Login';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Create from './adminComponents/CreateRooms';
import Details from './clientComponents/roomDetails';
import NotFound from './adminComponents/NotFound';
import HomeAd from './adminComponents/HomeAdmin';
import ClientHom from './clientComponents/ClientHome';
import Footer from './clientComponents/Footer';
import Gallary from './clientComponents/Gallary';
import Restaurents from './clientComponents/Restaurents';
import Reviews from './clientComponents/Reviews';
import HotelPolicy from './clientComponents/HotelPolicy';
import Booking from './clientComponents/Booking';
import SignUp from './clientComponents/SignUp';
import Confirmation from './clientComponents/Confirmation';



const  App = ()  => {
  
  return (
    <Router>
      <Routes>
     
       <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<Navigate to="/ClientHom" />}></Route>
        <Route path='/login' element={<LoginAd />} />
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
        <Route path='/confirmation' element={<  Confirmation />} />
        <Route path='*' element={<NotFound />} />
       
      </Routes> 
      </Router>
  );
}

export default App;
