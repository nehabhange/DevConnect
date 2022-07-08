import React from 'react'
import { useState, useEffect } from 'react'
import classnames from "classnames";
import {connect} from "react-redux";
import { registeruser } from '../../actions/authActions';
import PropTypes from "prop-types";


const Register = (props) => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[password2,setPassword2]=useState('');
    const[errors,setErrors]=useState('');
  
    // const componentWillReceiveProps=(nextProps)=>{
    //   if(nextProps.errors){
    //     setErrors({errors:nextProps.errors})
    //   }
    // }
   
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
        const newUser={
          name,
          email,
          password,
          password2
        }
        // axios.post('/api/user/register',newUser)
        // .then(res=>console.log(res.data))
        
        // .catch(err=>setErrors(err.response.data))
        props.registeruser(newUser) 
    }
   


  return (
    <div>
   
    <div className="register">
    
    <div className="container">
    
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your ConnectDEV account</p>
          <form  noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className={classnames("form-control form-control-lg",{"is-invalid":errors.name} )} placeholder="Name" name="name" value={name} onChange={e => setName(e.target.value)} />
              {errors.name ? (<div className='invalid-feedback'>{errors.name}</div>):null}
            </div>
           
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg",{"is-invalid":errors.email} )} placeholder="Email Address" name="email"  value={email} onChange={e => setEmail(e.target.value)} />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              {errors.email ? <div className='invalid-feedback'>{errors.email}</div>:null}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.password} )} placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}  />
              {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg",{"is-invalid":errors.password2} )} placeholder="Confirm Password" name="password2" value={password2} onChange={e => setPassword2(e.target.value)}  />
              {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div></div>
  )
}

Register.propTypes={
  registeruser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired 
}
 const mapStateToProps=state=>({
  auth:state.auth,
  errors:state.errors

 })
export default connect(mapStateToProps,{registeruser})(Register)