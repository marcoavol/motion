import { POSTS_FILTER, POSTS_FETCH, POST_LIKE_TOGGLE } from "../actionTypes"

const initialState = {
    postsFilter: "",
    postsAll: [],
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_FILTER: {
            const newState = {...state}
            newState.postsFilter = action.filter
            return newState
        }
        case POSTS_FETCH: {
            const newState = {...state}
            newState.postsAll = action.posts
            return newState
        }
        case POST_LIKE_TOGGLE: {
            const newState = {...state}
            newState.postsAll = newState.postsAll.map(post => { 
                if (post.id === action.id) {
                    post.logged_in_user_liked = !post.logged_in_user_liked
                    post.amount_of_likes = post.logged_in_user_liked ? post.amount_of_likes + 1 : post.amount_of_likes - 1
                }
                return post
            })
            return newState
        }
        default:
            return state
    }
}

export default postsReducer