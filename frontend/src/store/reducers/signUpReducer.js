import { SIGNUP_STEP, USER_REGISTRATION, USER_VALIDATION } from "../actionTypes"

const initialState = {
    step: 1,
    email: "",
    username: "",
    code: "",
    password: "",
    passwordRepeat: "",
    firstName: "",
    lastName: "",
}

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_STEP: {
            const newState = {...state}
            newState.step = action.step
            return newState
        }
        case USER_REGISTRATION: {
            const newState = {...state}
            newState.email = action.email
            return newState
        }
        case USER_VALIDATION: {
            const newState = {...state}
            newState.email = action.email
            newState.username = action.username
            newState.code = action.code
            newState.password = action.password
            newState.passwordRepeat = action.password_repeat
            newState.firstName = action.first_name
            newState.lastName = action.last_name
            return newState
        }
        default:
            return state
    }
}

export default signUpReducer