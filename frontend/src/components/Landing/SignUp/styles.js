import styled from "styled-components"

export const SignUpContainerStyled = styled.div `
    width: 58%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.textColor.primary};

    @media only screen and (max-width: 675px) {
        width: 100%; 
    }
`

export const SignUpHeaderStyled = styled.header `
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    display: ${props => props.hidden ? "none" : "flex"};

    #already-account-link {
        height: 40px;
        margin: 0 8px 0 40px;
        font-size: 14px;
        color: inherit;
        display: flex;
        align-items: center;
    }

    #sign-in-btn {
        margin: 0 40px 0 8px;
        font-size: 10px;
    }
`

export const SignUpMainStyled = styled.main `
    width: 100%;
    flex: 1;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .user-feedback {
        height: 30px;
        margin: 5% auto;
        color: ${props => props.theme.textColor.secondary};
        font-size: 16px;
    }
`

export const SignUpFormStepOneStyled = styled.form `
    width: 35%;
    min-width: 340px;
    height: 70%;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 10%;
    }

    .input-label {
        width: 100%;
        height: 50px;
        margin: 10px 0;
        border-bottom: solid 2px ${props => props.theme.borderColor.primary};
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        img {
            width: 20px;
            height: 20px;
        }

        input {
            width: 85%;
            height: 100%;
            -webkit-box-shadow: ${props => props.theme.autofillRemove.primary};
        }
    }
`

export const SignUpFormStepTwoStyled = styled.form `
    width: 35%;
    min-width: 340px;
    height: 70%;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 40px;
        font-weight: 400;
        margin-bottom: 10%;
    }
`

export const SignUpFormStepThreeStyled = styled.form `
    width: 70%;
    min-width: 340px;
    height: 70%;
    max-height: 400px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    h1 {
        font-size: 40px;
        font-weight: 400;
        margin-bottom: 5%;
        width: 100%;
    }

    #code-input {
        width: 95%;
    }

    .input-div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 45%;
        height: 50px;
        margin: auto;

        .input-label {
            font-size: 12px;
            color: ${props => props.theme.textColor.secondary};
        }  

        input {
            width: 100%;
        }
    }

    input {
        width: 45%;
        height: 50px;
        margin: auto;
        border-bottom: solid 2px ${props => props.theme.borderColor.primary};
        -webkit-box-shadow: ${props => props.theme.autofillRemove.primary};
    }
`

export const SignUpFooterStyled = styled.footer `
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    #continue-btn {
        width: 280px;
        height: 60px;
    }

    #step-indicator {
        margin: auto 0;

        img {
            width: 8px;
            margin: 0 5px;
            border-radius: 50%;
        }

        .active {
            background-color: ${props => props.theme.textColor.primary}
        }
    }
`