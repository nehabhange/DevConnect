import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from "./types";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from './types';

//register user
export const registeruser=(userData)=> dispatch=>{
       axios.post('/api/user/register',userData)
        .then(res=>window.location.href="/login")
        .catch(err=>{
              dispatch({
              type:GET_ERRORS,
              payload:err.response.data
        })})
};

//login user
export const loginUser=(userData)=>dispatch=>{
      axios.post('/api/user/login',userData)
      .then(res=>{
            //save to localstorage
            const {token}=res.data
            //set to ls
            localStorage.setItem('jwtToken',token)
            //set token to auth header
            setAuthToken(token)
            //decode token to get user data
            const decoded=jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded))
      }
            )
      .catch(err=>{
            dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
            })
      })
}

//set logged in user
export const setCurrentUser =(decoded)=>{
      return{
            type:SET_CURRENT_USER,
            payload:decoded
      }
}

//log out user
export const logoutUser=()=>dispatch=>{
      //remove token from localstorage
      localStorage.removeItem('jwtToken');
      //remove auth header for future requets
      setAuthToken(false);
      //set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}))
}