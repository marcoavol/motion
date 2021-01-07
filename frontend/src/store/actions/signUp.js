import { USER_REGISTRATION, USER_VALIDATION, SIGNUP_STEP } from "../actionTypes"
import { baseURL } from "../constants"

export const signUpStepAction = (step) => {
    return {
        type: SIGNUP_STEP,
        step: step,
    }
}

export const userRegistrationAction = (registrationData) => {
    return {
        type: USER_REGISTRATION,
        email: registrationData.email,
    }
}

export const userRegistration = (data) => async (dispatch, getState) => {
    const headers = new Headers({
        "Content-type": "application/json"
    })
    const body = JSON.stringify(data)
    const config = {
        method: "POST",
        headers: headers,
        body: body,
    }

    const response = await fetch(`${baseURL}/auth/registration/`, config)
    if (!response.ok) {
        const json = await response.json()
        return json
    } 
    //TODO: Also save data in localStorage to allow user to continue with registration at step where left?
    dispatch(userRegistrationAction(data))

    return null
}

export const userValidationAction = (validationData) => {
    return {
        type: USER_VALIDATION, 
        ...validationData
    }
}

export const userValidation = (data) => async (dispatch, getState) => {
    const headers = new Headers({
        "Content-type": "application/json"
    })
    const body = JSON.stringify(data)
    const config = {
        method: "PATCH",
        headers: headers,
        body: body,
    }

    const response = await fetch(`${baseURL}/auth/registration/validation/`, config) 
    
    if (!response.ok) {
        const json = await response.json()
        return json
    }
    //TODO: Also save data in localStorage to allow user to continue with registration at step where left?
    dispatch(userValidationAction(data))

    return null
}
