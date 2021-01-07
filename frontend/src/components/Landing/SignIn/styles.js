import styled from "styled-components"

export const SignInContainerStyled = styled.div `
    width: 58%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.textColor.primary};

    @media only screen and (max-width: 675px) {
        width: 100%; 
    }
`

export const SignInHeaderStyled = styled.header `
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    #no-account-link {
        height: 40px;
        margin: 0 8px 0 40px;
        font-size: 14px;
        color: inherit;
        display: flex;
        align-items: center;
    }

    #sign-up-btn {
        margin: 0 40px 0 8px;
        font-size: 10px;
    }
`

export const SignInMainStyled = styled.main `
    width: 100%;
    flex: 1;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    #sign-in-form {
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
                -webkit-box-shadow: ${props => props.theme.autofillRemove.primary}
            }
        }
    }

    #user-feedback {
        height: 30px;
        margin: 5% auto;
        color: ${props => props.theme.textColor.secondary};
        font-size: 16px;
    }
`

export const SignInFooterStyled = styled.footer `
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    #sign-in-btn {
        width: 280px;
        height: 60px;
    }
`