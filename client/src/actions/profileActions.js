import axios from "axios";
import { GET_PROFILE,PROFILE_LOADING,GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from "./types";

export const getCurrentProfile=()=>dispatch=>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res=>
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        }))
    .catch(err=>{
    dispatch({
        type:GET_PROFILE,
        payload:{}
    })
    
})    
}
//create profile
export const createProfile=(profileData)=>dispatch=>{
    axios.post('/api/profile',profileData)
    .then(res=>window.location.href="/dashboard")
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        )
}
//profile loading
export const setProfileLoading=()=>{
    return{
        type:PROFILE_LOADING
    }
}

//clear profile 
export const clearCurrentProfile=()=>{
    return{
        type:CLEAR_CURRENT_PROFILE
    }
}

//delete account 
export const deleteAccount=()=>dispatch=>{
    if(window.confirm("Are you sure?This cannot be undone")){
        axios.delete('/api/profile').then(res=>dispatch({
            type:SET_CURRENT_USER,
            payload:{}
        })).catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
      
    }
}