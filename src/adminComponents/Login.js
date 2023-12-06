import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginAd() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userUid = auth.currentUser.uid;
      let userRole = "empty";
      const userRef = query(
        collection(db, "userRole"),
        where("userID", "==", userUid)
      );
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        userRole = doc.data().userID;
      });

      if (userUid === userRole) {
        navigate("/homeAd");
        userRole = "";
      } else {
        navigate("/ClientHom");
      }
      alert("Signed In");
    } catch (error) {
      console.log(error);
    }
  };

  // const divStyle = {
  //   background: `url(${backgroundImage})`,
  //   // backgroundSize: "cover", // You can adjust this to fit your layout
  //   // backgroundRepeat: "no-repeat",
  //   // backgroundPosition: "center",
  //   width: "100%",
  //   height:"100%"
  // };

  return (
    <>
      <div className="row justify-content-center">
        <h1 className="display-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',paddingTop:'10%' }}>Welcome to Grand Solace Suites</h1>
        <p className="lead" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Please enter your details</p>
        <form className="form-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:'70%' }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control custom-input"
                id="email"
               style={{width:'350%'}}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control custom-input"
                id="password"
                style={{width:'350%',height:'100%'}}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container" style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary btn-lg"
              style={{ fontSize: "20px", width: "20%" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <label htmlFor="password" className="form-label">
              Don't have an account? Register
            </label>
            <br />
            <Link to="/signup">
              <button
                className="btn btn-secondary btn-lg"
                style={{ fontSize: "20px", width: "20%" }}
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginAd;
