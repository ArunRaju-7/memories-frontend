import {AUTH, LOGOUT, VERIFY_AUTH} from '../constants/actionTypes';

const authReducer = (state={authData: null}, action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action.data};
        
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null};
        
        case VERIFY_AUTH:
            return {...state, authData: action.data};
        default:
            return state;
    }
}

export default authReducer;