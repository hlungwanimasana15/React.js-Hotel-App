import React, { useEffect, useState } from "react";
import LoginAd from "./adminComponents/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Create from "./adminComponents/CreateRooms";
import Details from "./clientComponents/roomDetails";
import NotFound from "./adminComponents/NotFound";
import HomeAd from "./adminComponents/HomeAdmin";
import ClientHom from "./clientComponents/ClientHome";
import Footer from "./clientComponents/Footer";
import Gallary from "./clientComponents/Gallary";
import Restaurents from "./clientComponents/Restaurents";
import Reviews from "./clientComponents/Reviews";
import HotelPolicy from "./clientComponents/HotelPolicy";
import Booking from "./clientComponents/Booking";
import SignUp from "./clientComponents/SignUp";
import Confirmation from "./clientComponents/Confirmation";
import { auth, db } from "./config/firebase";
import { AiOutlineGateway } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(currentUser) => {
      let userRole = "";
      if (currentUser) {
        const userUid = currentUser.uid;
        console.log(userUid);
      const userRef = query(
        collection(db, "userRole"),
        where("userID", "==", userUid)
      );
      const querySnapshot = await getDocs(userRef);
      console.log('qq', querySnapshot);
      querySnapshot.forEach((doc) => {
        userRole = doc.data().role;
        console.log('qq',  userRole);
      });
if(userRole !== "") {

  setUser({...currentUser, role:userRole});
} else {
  setUser({...currentUser});

}
      } else {
        setUser(null);
      }
     
    });


    return () => unsubscribe();
  }, [auth]);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/" element={<Navigate to="/ClientHom" />}></Route>
        <Route path="/login" element={<LoginAd />} />
        <Route path="/newRoom" element={<Create />} />
        <Route path="/homeAd" element= { user && user.role ? <HomeAd /> : <ClientHom />} />
        <Route path="/ClientHom" element={<ClientHom />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/rest" element={<Restaurents />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/hotelpolicy" element={<HotelPolicy />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/booking" element={ <Booking />  } />
        <Route path="/confirmation" element={user ? <Confirmation /> : <ClientHom /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
