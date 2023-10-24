import React, {useState} from "react";
import Input from "./input";
import { Button } from "@material-ui/core";
import { reset_password } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, token} = useParams();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(reset_password({'id':id, 'token':token, 'password': password}, navigate))
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleShowPassword = ()=>{
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Reset Password</h4>
                <Input  name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                {/* <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} /> */}
                <Button type="submit" variant="contained" color="primary" >
                        Submit Password
                </Button>
            </form>
        </div>
    )
}

export default ResetPassword