import React, { useState } from 'react'
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase'
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/backgroundpic.jpg';
import { Link } from 'react-router-dom'


function LoginAd() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      await signInWithEmailAndPassword(auth, email, password)
      const userUid = auth.currentUser.uid
      let userRole = "empty";
      const userRef = query(collection(db, "userRole"), where("userID", "==", userUid));
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        userRole = (doc.data().userID)
      })


      if (userUid === userRole) {
        navigate("/homeAd")
        userRole = ''
      } else {
        navigate("/ClientHom")
      }
      alert("Signed In");
    } catch (error) {
      console.log(error)
    }
  }



  const divStyle = {
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover', // You can adjust this to fit your layout
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  const divButton ={
    display: 'flex',
    justifyContent: 'colomn', 
    alignItems: 'center', 
    height: '50%', 
    padding:10
  }
   const buttonStyle = {
    width: '100px', 
    height: '40px', 
    fontSize: '15px', 
  };

  return (
    <div className="container mt-5" style={divStyle}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-3">Welcome to Art Hotel</h1>
          <p className="lead">Plese enter your details</p>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={divButton}  className="row">
              <button  style={buttonStyle} className="btn btn-primary" onClick={handleLogin}>Login</button>
              <label htmlFor="password" className="form-label">Dont have an account Register</label>
              <Link to='/signup'>
              <button style={buttonStyle} className="btn btn-secondary" >
                Register
              </button>
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginAd