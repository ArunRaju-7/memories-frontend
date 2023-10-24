import * as api from '../api';
import { AUTH, VERIFY_AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) =>{

    try{
        const {data} = await api.signin(formData);
        if(data?.message){
            dispatch({type: VERIFY_AUTH, data})
            navigate('/auth')
        }else{
            dispatch({type: AUTH, data})
            navigate('/')
        }
    }catch(error){
        console.log(error);
    }
}

export const googlesignin = (formData, navigate) => async (dispatch) =>{

    try{
        console.log(formData);
        const {data} = await api.googlesignin(formData);
        dispatch({type: AUTH, data})
        navigate('/')
    }catch(error){
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) =>{

    try{
        const {data} = await api.signup(formData);
        console.log("sign up data", data);
        dispatch({type: VERIFY_AUTH, data});
        navigate('/')
    }catch(error){
        console.log(error);
    }
}

export const forget_password = (email, navigate) => async (dispatch) =>{
    try{
        const data = await api.forget_password(email);
        dispatch({type: VERIFY_AUTH, data});
        navigate('/')
    }catch(error){
        console.log(error);
    }
}

export const reset_password = (reset_form_data, navigate) => async (dispatch) =>{
    try{
        console.log("reset password", reset_form_data);
        const {data} = await api.reset_password(reset_form_data);
        // dispatch({type: VERIFY_AUTH, data});
        // navigate('/')
    }catch(error){
        console.log(error);
    }
}