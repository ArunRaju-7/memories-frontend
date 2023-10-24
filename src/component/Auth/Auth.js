import React, {useState} from "react";

import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./input";
import useStyles from './styles';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
// import {GoogleLogin} from 'react-google-login';
import { useDispatch, useSelector} from "react-redux";
import {Link, useNavigate } from 'react-router-dom';
import Icon from './icon';
import jwt_decode from 'jwt-decode';
import {signin, signup, googlesignin} from '../../actions/auth';
const initialState = { 
    firstName : '', lastName : '', email :'', password :'', confirmPassword :''
}

const Auth = () =>{
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    let msg = useSelector((state)=> state.auth?.authData?.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("auth message", msg);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }   
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }
    const handleShowPassword = ()=>{
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const switchMode = ()=>{
        
        setSignUp((prevShowPassword) => !prevShowPassword)
        setShowPassword(false);
        msg = null;
        
    }
    const googleSuccess = async (res) =>{
        const response = jwt_decode(res.credential);
        try{
            // dispatch({type: 'AUTH', data: {result:response, undefined}})
            dispatch(googlesignin(response, navigate))
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    const googleFailure = (error) =>{
        console.log(error);
        console.log("Google sign in was unsuccesssfull");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            ) 

                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input  name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                        
                        {isSignup &&
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                        }
                    </Grid>
                    <Link to="/forgetpassword" >
                        {isSignup? '' : 'Forgot Password'}
                    </Link>
                    {msg && <div className={classes.success_msg}>{msg}</div>}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleOAuthProvider clientId="186266309382-b2st45gmujajhspt1fcjnqg7sf6djkrs.apps.googleusercontent.com">
                    <GoogleLogin 
                        render={(renderProps)=>(
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained">
                            Google Sign In</Button>)}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    </GoogleOAuthProvider>
                
                    {/* <GoogleLogin 
                        clientId="186266309382-b2st45gmujajhspt1fcjnqg7sf6djkrs.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained">
                            Google Sign In</Button>)}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    
                    <Grid container justofy="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}

export default Auth;