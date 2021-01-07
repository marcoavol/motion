import styled from "styled-components"
import backgroundImage from "../../../assets/backgroundImage.png"

export const SplashContainerStyled = styled.div `
    width: 42%;
    min-width: 275px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: ${props => props.theme.gradient}, url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: multiply;

    @media only screen and (max-width: 675px) {
        display: none; 
    }
`

export const SplashMainStyled = styled.main `
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    img {
        width: 80px;
        height: 80px;
    }

    h1 {
        font-size: 30px;
        font-weight: 500;
        color: ${props => props.theme.textColor.tertiary};
        margin: 15px 0 25px 0;
    }

    p {
        max-width: 275px;
        color: ${props => props.theme.textColor.quaternary};
    }

    #store-links-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 0 0 0;

        .store-btn {
            margin: 0 8px; 
            border-color: ${props => props.theme.borderColor.secondary};
            color: ${props => props.theme.textColor.tertiary};

            img {
                width: auto;
                height: 15px;
                margin-right: 5px;
            }
        }
    }
`

export const SplashFooterStyled = styled.footer `
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    #social-links-container {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 50%;

        a {
            margin: 0 8px;
        }
    }

    p {
        margin: 40px 0 40px 0;
        font-size: 12px;
        color: ${props => props.theme.textColor.quaternary};
    }
`
  

