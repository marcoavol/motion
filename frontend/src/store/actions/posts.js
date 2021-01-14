import { POSTS_FILTER, POSTS_FETCH } from "../actionTypes"
import { baseURL } from "../constants"

export const postsFilterAction = (filter) => {
    return {
        type: POSTS_FILTER,
        filter: filter,
    }
}

const postsFetchAction = (posts) => {
    return {
        type: POSTS_FETCH,
        posts: posts,
    }
}

export const postsFetch = (filter) => async (dispatch, getState) => {
    const accessToken = getState().sessionReducer.accessToken
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const config = {
        method: "GET",
        headers: headers,
    }

    const response = await fetch(`${baseURL}/social/posts/${filter ? filter + "/" : ""}`, config)
    const json = await response.json()

    if (response.ok) {
        dispatch(postsFetchAction(json))
    }

    return json
}

export const postLikeToggle = (id) => async (dispatch, getState) => {
    const accessToken = getState().sessionReducer.accessToken
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }
    const config = {
        method: "POST",
        headers: headers,
    }

    const response = await fetch(`${baseURL}/social/posts/toggle-like/${id}/`, config)
    if (response.ok) {
        const json = await response.json()
        return json
    }
    
    return null
}