import { ButtonWideStyled, ButtonRoundStyled } from "../../../styles/buttons"
import { SplashContainerStyled, SplashMainStyled, SplashFooterStyled } from "./styles"
import motionLogo from "../../../assets/logos/motion.png"
import googleLogo from "../../../assets/logos/google.png"
import appleLogo from "../../../assets/logos/apple.png"
import twitterLogo from "../../../assets/logos/twitter.png"
import facebookLogo from "../../../assets/logos/facebook.png"
import instagramLogo from "../../../assets/logos/instagram.png"

const Splash = () => {
    return (
        <SplashContainerStyled>
            <SplashMainStyled>
                <img src={motionLogo} alt="Motion logo" />
                <h1>Motion</h1>
                <p>Connect with friends and the world around you with Motion.</p>
                <div id="store-links-container">
                    <a href="itms-apps://apple.com/" target="__blank" rel="noopener noreferer"><ButtonWideStyled className="store-btn"><img src={appleLogo} alt="Apple icon" />App Store</ButtonWideStyled></a>
                    <a href="https://play.google.com/store/apps" target="__blank" rel="noopener noreferer"><ButtonWideStyled className="store-btn"><img src={googleLogo} alt="Google icon" />Google play</ButtonWideStyled></a>
                </div>
            </SplashMainStyled>
            <SplashFooterStyled>
                <div id="social-links-container">
                    <a href="https://twitter.com/_Propulsion" target="__blank" rel="noopener noreferer"><ButtonRoundStyled><img src={twitterLogo} alt="Twitter icon" /></ButtonRoundStyled></a>
                    <a href="https://facebook.com/propulsioncodingacademy" target="__blank" rel="noopener noreferer"><ButtonRoundStyled><img src={facebookLogo} alt="Facebook icon" /></ButtonRoundStyled></a>
                    <a href="https:/instagram.com/propulsionacademy/" target="__blank" rel="noopener noreferer"><ButtonRoundStyled><img src={instagramLogo} alt="Instagram icon" /></ButtonRoundStyled></a>
                </div>
                <p>© Motion 2020. All rights reserved.</p>
            </SplashFooterStyled>
        </SplashContainerStyled>
    )
}

export default Splash