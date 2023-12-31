import React , {useState, useEffect} from "react";
import useStyles from './styles'
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';

const Form = ({currentId, setCurrentId}) =>{
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const [postData, setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''

    });
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post])
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        }else{
            dispatch(createPost({...postData, name: user?.result?.name}))
        }
        clear();
    }
    const clear = ()=>{
        setCurrentId(null);
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }
    if(!user?.result?.name){
        return (<Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please Sign In to create your own memories and like other's memories.
            </Typography>
        </Paper>)
    }
    return ( 
       <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h6"> {currentId ? 'Editing' :'Creating'} a memory</Typography>
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}></TextField>
            <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}></TextField>
            <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(",")})}></TextField>
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile:base64})} />
            </div>
            <Button className={classes.buttonSubmit} varirant="contained" color="primary" size="large" type="submit" fullWidth value onClick={handleSubmit}>Submit</Button>
            <Button varirant="contained" color="secondary" size="small" onClick={clear} fullWidth value>Clear</Button>
        </form>
       </Paper>

    )
}

export default Form;