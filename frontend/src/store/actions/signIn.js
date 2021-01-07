import { USER_SIGNIN } from "../actionTypes"
import { baseURL } from "../constants"

export const userSignInAction = (user, accessToken, authenticated) => {
    return {
        type: USER_SIGNIN,
        user: user,
        accessToken: accessToken,
        authenticated: authenticated,
    }
}

export const userSignIn = (data) => async (dispatch, getState) => {
    const headers = new Headers({
        "Content-type": "application/json"
    })
    const body = JSON.stringify(data)
    const config = {
        method: "POST",
        headers: headers,
        body: body,
    }

    const response = await fetch(`${baseURL}/auth/token/`, config)
    const json = await response.json()
    
    if (json.access) {
        localStorage.setItem("currentUser", JSON.stringify(json))
        dispatch(userSignInAction(json.user, json.access, true))
    } else {
        dispatch(userSignInAction("", "", false))
    }

    return json
}