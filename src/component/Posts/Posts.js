import React from "react";
import useStyles from './styles'
import Post from './Post/Post';
import {Grid, CircularProgress} from '@material-ui/core';
import { useSelector } from "react-redux";
const Posts = ({setCurrentId}) =>{
    const classes = useStyles();
    // const {posts, isLoading} = useSelector((state)=> state.posts);
    const {posts} = useSelector((state)=> state.posts);
    // if(!posts.length && !isLoading) return 'No posts';
    if(posts === undefined) return 'No posts';

    return ( 
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid  key={post._id} item xs={12} sm={6} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }

            </Grid>
        )

    )
}

export default Posts;