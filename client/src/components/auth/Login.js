import React, { useEffect } from 'react';
import { useState } from 'react'
import {PropTypes} from "prop-types";
import { connect } from 'react-redux';
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";


const Login = (props) => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[errors,setErrors]=useState('');


    

    useEffect(()=>{
      if(props.auth.isAuthenticated){
           window.location.href = "/dashboard"
      }
      if (props.errors){
        setErrors(props.errors)
      }
      
    },[props.errors,props.auth.isAuthenticated])

    const handleSubmit = (e) => {
      e.preventDefault();
      const User={
        email,
        password
      }
      props.loginUser(User)
  }
  
  
  return (
    <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your ConnectDEV account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg",{"is-invalid":errors.email} )}  placeholder="Email Address" name="email" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email ? <div className='invalid-feedback'>{errors.email}</div>:null}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.password} )} placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}   />
              {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>


  )
}

Login.propTypes={
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{loginUser})(Login);