import React from 'react';
import {Route,Navigate, Outlet} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const PrivateRoute = ({auth}) => (
 auth.isAuthenticated === true ? (
        <Outlet/>
      ) : (
        <Navigate to="/login" />
      )
  );
  
  



PrivateRoute.propTypes={
    auth:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
