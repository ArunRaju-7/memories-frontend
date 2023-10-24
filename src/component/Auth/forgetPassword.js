import React, { useState } from "react"
import Input from "./input";
import { Button } from "@material-ui/core";
import {forget_password} from '../../actions/auth';
import {useDispatch} from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";


const ForgetPassword = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(forget_password(email, navigate))
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Forgot Password</h4>
                <Input name="email" label="Email Address"  type="email" handleChange={handleChange}/>
                <Button type="submit" variant="contained" color="primary" >
                        Reset Password
                </Button>
            </form>
        </div>
    )
}

export default ForgetPassword