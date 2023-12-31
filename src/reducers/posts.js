import {FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING} from '../constants/actionTypes';

export default (state={isLoading: true, posts:[]}, actions)=>{
    switch(actions.type){
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        // case FETCH_ALL:
        //     return {
        //         ...state, 
        //         posts: actions.payload.data, 
        //         currentPage: actions.payload.currentPage, 
        //         numberOfPages: actions.payload.numberOfPages
        //     };
        case FETCH_ALL:
            return {
                ...state, 
                posts: actions.payload, 
            };
        case FETCH_BY_SEARCH:
            return {...state, posts:actions.payload}
        case FETCH_POST:
            return {...state, post : actions.payload}
        case CREATE:
            return {...state, posts:[...state.posts, actions.payload]};
        case UPDATE: 
            return {...state, posts :[...state.posts.map((post)=> post._id === actions.payload._id ? actions.payload : post)]}
        case DELETE:
            return {...state, posts: [...state.posts.filter((post)=>post._id !== actions.payload)]}
        default:
            return state;
    }
}