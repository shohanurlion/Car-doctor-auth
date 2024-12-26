import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Providers/AuthProviders';
import { useRef } from 'react';
import { linkWithCredential, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Loging = () => {
  const {sigInuser}= useContext(AuthContext)
  const [error , seterror]= useState('');
  const navigate = useNavigate();
  const loaction = useLocation();
  const getemail = useRef()
  const singUphandelr = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    seterror('');
    // console.log(email , password);
    sigInuser(email , password)
    .then(result => {
      // console.log(result.user);
      const user = {email}
      
      axios.post('https://car-doctor-server-five-murex.vercel.app/jwt', user, {withCredentials:true})
      .then(res=>{
        // console.log(res.data);
        if (res.data.success) {
          navigate(loaction?.state ? loaction?.state : '/')
      }
      })
      e.target.reset();
  })
  .catch(error => {
    seterror('Vai email ar passwrod valo kore dekhe loging koro')
  })
  };

  const handelpassword =()=>{
    const putemail = getemail.current.value;
    if(!putemail){
      alert('plz give Gmail'); 
      return; 
  }
  else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(putemail)
  ){

      alert('plz write valide gmail');
      return;
  }
  sendPasswordResetEmail(auth , putemail)
  .then(()=>{
    alert('plz cheack you gmail')
})
.catch(error=>{
    console.log(error);
    
})
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={singUphandelr}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" name="email" ref={getemail} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover" onClick={handelpassword}>Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className='text-center py-8'>
          {error && <p className='text-red-600'>{error}</p>}
        </div>
        <div>
        <p className='my-4 text-center'>New to Car Doctors <Link className='text-orange-600 font-bold' to="/Register">Sign Up</Link> </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Loging