import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

const url = "http://localhost:5000/posts";

API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization =  `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})


// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPosts = () => API.get('/posts');

export const fetchPostbySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, post_data) => API.patch(`/posts/${id}`, post_data);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signin = (formData) => API.post('/users/signin', formData);

export const signup = (formData) => API.post('/users/signup', formData);

export const googlesignin = (formData) => API.post('/users/googlesigin', formData);

export const forget_password = (email) => API.get(`/users/forget_password/${email}`)

export const reset_password = (reset_form_data) => API.post('/users/reset_password', reset_form_data)