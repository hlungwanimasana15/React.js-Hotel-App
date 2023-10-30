import React,{ useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'


function SignUp() {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [ConfirmPass,setConfirmPass]=useState("")
    
   
   const signIn =async () => {
    try{
    await createUserWithEmailAndPassword(auth, email,password,ConfirmPass)
    } catch(err) {
        console.error(err)

    }
    console.log("email",auth.currentUser.email);

   };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Sign Up</h3>
              <input
                placeholder="Email"
                className="form-control mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                className="form-control mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Confirm Password"
                type="password"
                className="form-control mb-3"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button className="btn btn-primary" onClick={signIn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp