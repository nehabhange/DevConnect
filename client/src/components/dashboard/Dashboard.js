import React, { useEffect } from 'react';
import {PropTypes} from "prop-types";
import { connect } from 'react-redux';
import { getCurrentProfile,deleteAccount  } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from "react-router-dom"
import ProfileActions from './ProfileActions';
const Dashboard = (props) => {

   useEffect(()=>{
    props.getCurrentProfile()
   },[])
 
  const{user}=props.auth
  const{profile,loading}=props.profile;
  let dashboardContent;
  const onDelete=(e)=>{
    props.deleteAccount()
   }
  if(profile===null ||loading){
    dashboardContent=<Spinner/>
  }
  else{
    //check if logged in user has profile data
    console.log(Object.keys(profile).length>0)
    console.log("profile",profile)
         if(Object.keys(profile).length>0)  
          {
          dashboardContent=(
            <div>
            <p className='lead text-muted'>Welcome <Link to={`api/profile/${profile.handle}`} >{user.name}</Link> </p>
            <ProfileActions/>
            <div style={{marginBottom:"60px"}}><button onClick={onDelete} className='btn btn-danger'>Delete Account</button></div>
            
            
            </div>
          )
         }  
         else{
          //user is logged in but has no profile
          dashboardContent=(

            <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p>You have not yet setup a profile,please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
            </Link>
            
            
            </div>
          )
         }                                  
  }

  return (
    <div className='dashboard'>
    <div className="container">
    <div className="row">
    <div className='col-md-12'>
    <h1 className='display-4'>Dashboard</h1>
    {dashboardContent }
    </div>
    </div>
    </div>
    
    </div>
  )
}


Dashboard.propTypes={
  getCurrentProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile:state.profile,
  auth: state.auth
});
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);