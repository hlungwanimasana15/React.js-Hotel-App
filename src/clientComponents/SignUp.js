import React,{ useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'


function SignUp() {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [ConfirmPass,setConfirmPass]=useState("")
    const [error, setError] = useState('');

   
   const signUp = async () => {
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
            <h3 className="card-title text-center mb-4">Sign Up</h3>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPass" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPass"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={signUp}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp