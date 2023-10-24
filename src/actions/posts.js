import {FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING} from '../constants/actionTypes';
import * as api from '../api';

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(id);
        dispatch({'type': FETCH_ALL, 'payload':data});
        dispatch({type: END_LOADING});
    }catch(err){
        console.log(err.message);
    }
}

// export const getPosts = (page) => async (dispatch) => {
//     try{
//         dispatch({type: START_LOADING});
//         const {data} = await api.fetchPosts(page);
//         dispatch({'type': FETCH_ALL, 'payload':data});
//         dispatch({type: END_LOADING});
//     }catch(err){
//         console.log(err.message);
//     }
// }

export const getPosts = () => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts();
        console.log("posts", data);
        dispatch({'type': FETCH_ALL, 'payload':data});
        dispatch({type: END_LOADING});
    }catch(err){
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPostbySearch(searchQuery);
        console.log("search result", data);
        dispatch({'type': FETCH_BY_SEARCH, 'payload':data});
        dispatch({type: END_LOADING});
    }catch(err){
        console.log(err.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload:data});
        dispatch({type: END_LOADING});
    }catch(err){
        console.log(err.message);
    }
}

export const updatePost = (post_id, post_data) => async (dispatch) => {
    try{

        const {data} = await api.updatePost(post_id, post_data);
        dispatch({type: UPDATE, payload:data});
       
    }catch(err){
        console.log(err.message);
    }
}

export const deletePost = (post_id) => async (dispatch) => {
    try{

        await api.deletePost(post_id);
        dispatch({type: DELETE, payload : post_id});
       
    }catch(err){
        console.log(err.message);
    }
}

export const likePost = (id)=> async (dispatch) =>{
    try{
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    }catch(err){
        console.log(err.message);
    }
}