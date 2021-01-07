import { Link } from "react-router-dom"
import { ButtonWideStyled } from "../../../styles/buttons"
import { LandingContainerStyled } from "../styles"
import Splash from "../Splash/index"
import { SignUpContainerStyled, SignUpHeaderStyled, SignUpMainStyled, SignUpFormStepOneStyled, SignUpFormStepTwoStyled, SignUpFormStepThreeStyled, SignUpFooterStyled } from "./styles"
import stepIndicator from "../../../assets/icons/stepIndicator.png"
import emailIcon from "../../../assets/icons/email.png"
import checkIcon from "../../../assets/icons/check.png"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { signUpStepAction, userRegistration, userValidation } from "../../../store/actions/signUp"

const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const step = useSelector(state => state.signUpReducer.step)
    const email = useSelector(state => state.signUpReducer.email)
    const [username, setUsername] = useState("") //TODO: Realtime check if username is already taken?
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [userFeedback, setUserFeedback] = useState("")

    const signUpHandler = (e) => {
        e.preventDefault()
        setUserFeedback("")
        if (step === 1) {
            dispatch(userRegistration({email: e.target.elements.email.value}))
            .then(result => result ? setUserFeedback(result.email) : dispatch(signUpStepAction(step + 1)))
        } else if (step === 2) {
            dispatch(signUpStepAction(step + 1))
        } else {
            if (password !== passwordRepeat) {
                setUserFeedback("Password repeat not matching")
            } else {
                dispatch(userValidation({
                    email: email,
                    username: username,
                    code: e.target.elements.code.value,
                    password: password,
                    password_repeat: passwordRepeat,
                    first_name: e.target.elements.firstname.value,
                    last_name: e.target.elements.lastname.value,
                }))
                .then(result => {
                    if (!result) {
                        dispatch(signUpStepAction(1))
                        history.push("/")
                    } else {
                        let feedback = Object.keys(result).map(key => result.hasOwnProperty(key) ? result[key] : "").join(" & ")
                        setUserFeedback(feedback)
                    }
                })
            }
        }
    }

    const usernameInputHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordInputHandler = (e) => {
        setPassword(e.target.value)
    }

    const passwordRepeatInputHandler = (e) => {
        setPasswordRepeat(e.target.value)
    }

    return (
        <LandingContainerStyled>
            <Splash />
            <SignUpContainerStyled>
                <SignUpHeaderStyled hidden={step > 1 ? true : false}>
                    <Link id="already-account-link" to="/">Already have an account?</Link>
                    <Link id="sign-in-btn" to="/"><ButtonWideStyled>Sign In</ButtonWideStyled></Link>
                </SignUpHeaderStyled>
                <SignUpMainStyled>
                    {
                        step === 1 ?
                            <SignUpFormStepOneStyled id="sign-up-form" onSubmit={signUpHandler}>
                                <h1>Sign Up</h1>
                                <label className="input-label">
                                    <img src={emailIcon} alt="E-Mail icon" />
                                    <input name="email" type="email" placeholder="E-Mail" required />
                                </label>
                            </SignUpFormStepOneStyled>
                        : null
                    }
                    {
                        step === 2 ? 
                            <SignUpFormStepTwoStyled id="sign-up-form" onSubmit={signUpHandler}>
                                <h1>Congratulations!</h1>
                                <img src={checkIcon} alt="Check mark" width="80px" />
                                <p className="user-feedback">{`We've sent a confirmation code to your email\n${email}`}</p>
                            </SignUpFormStepTwoStyled>
                        : null
                    }
                    {
                        step === 3 ? 
                            <SignUpFormStepThreeStyled id="sign-up-form" onSubmit={signUpHandler}>
                                <h1>Verification</h1>
                                <input id="code-input" name="code" type="number" placeholder="Validation code" required />
                                <div className="input-div">
                                    <label className="input-label" htmlFor="email">Email</label>
                                    <input id="email" name="email" type="email" value={email} readOnly />
                                </div>
                                <div className="input-div">
                                    <label className="input-label" htmlFor="username">Username</label>
                                    <input id="username" name="username" type="text" onChange={usernameInputHandler} required />
                                </div>
                                <input name="firstname" type="text" placeholder="First name" required />
                                <input name="lastname" type="text" placeholder="Last name" required />
                                <input name="password" type="password" placeholder="Password" onChange={passwordInputHandler} required />
                                <input name="passwordrepeat" type="password" placeholder="Password repeat" onChange={passwordRepeatInputHandler} required />
                            </SignUpFormStepThreeStyled>
                        : null
                    }
                    <p className="user-feedback">{userFeedback}</p>
                </SignUpMainStyled>
                <SignUpFooterStyled>
                    <ButtonWideStyled id="continue-btn" colored={true} type="submit" form="sign-up-form">CONTINUE</ButtonWideStyled>
                    <div id="step-indicator">
                        <img src={stepIndicator} className={step === 1 ? "active" : ""} alt="Step indicator" />
                        <img src={stepIndicator} className={step === 2 ? "active" : ""} alt="Step indicator" />
                        <img src={stepIndicator} className={step === 3 ? "active" : ""} alt="Step indicator" />
                    </div>
                </SignUpFooterStyled>
            </SignUpContainerStyled>
        </LandingContainerStyled>
    )
}

export default SignUp