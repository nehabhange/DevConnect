import React from 'react'
import { useState } from 'react'

const Register = () => {
    const [name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[password2,setPassword2]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({name,email})
    }
    


  return (
    <div>
    <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your ConnectDEV account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email"  value={email} onChange={e => setEmail(e.target.value)} />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}  />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={password2} onChange={e => setPassword2(e.target.value)}  />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default Register