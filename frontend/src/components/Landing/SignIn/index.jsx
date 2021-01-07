import { Link } from "react-router-dom"
import { ButtonWideStyled } from "../../../styles/buttons"
import { LandingContainerStyled } from "../styles"
import Splash from "../Splash/index"
import { SignInContainerStyled, SignInHeaderStyled, SignInMainStyled, SignInFooterStyled } from "./styles"
import emailIcon from "../../../assets/icons/email.png"
import passwordIcon from "../../../assets/icons/password.png"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userSignIn } from "../../../store/actions/signIn"

const SignIn = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [userFeedback, setUserFeedback] = useState("")

    const signInHandler = (e) => {
        e.preventDefault()
        setUserFeedback("")
        dispatch(userSignIn({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }))
        .then(result => {
            if (result.access) {
                history.push("/posts")
            } else if (result.detail) {
                setUserFeedback(result.detail)
            }
        })
    }

    return (
        <LandingContainerStyled>
            <Splash />
            <SignInContainerStyled>
                <SignInHeaderStyled>
                    <Link id="no-account-link" to="/signup">Don't have an account?</Link>
                    <Link id="sign-up-btn" to="/signup"><ButtonWideStyled>Sign Up</ButtonWideStyled></Link>
                </SignInHeaderStyled>
                <SignInMainStyled>
                    <form id="sign-in-form" onSubmit={signInHandler}>
                        <h1>Sign In</h1>
                        <label className="input-label">
                            <img src={emailIcon} alt="E-Mail icon" />
                            <input name="email" type="email" placeholder="E-Mail" required />
                        </label>
                        <label className="input-label">
                            <img src={passwordIcon} alt="Password icon" />
                            <input name="password" type="password" placeholder="Password" required />
                        </label>
                    </form>
                    <p id="user-feedback">{userFeedback}</p>
                </SignInMainStyled>
                <SignInFooterStyled>
                    <ButtonWideStyled id="sign-in-btn" colored={true} type="submit" form="sign-in-form">SIGN IN</ButtonWideStyled>
                </SignInFooterStyled>
            </SignInContainerStyled>
        </LandingContainerStyled>
    )
}

export default SignIn