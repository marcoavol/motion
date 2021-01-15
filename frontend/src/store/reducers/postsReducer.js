import { POSTS_FILTER, POSTS_FETCH } from "../actionTypes"

const initialState = {
    postsFilter: "",
    postsList: [],
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
            newState.postsList = action.posts
            return newState
        }
        default:
            return state
    }
}

export default postsReducer