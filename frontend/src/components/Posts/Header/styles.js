import styled from "styled-components"

export const HeaderContainerStyled = styled.header `  
    width: 100%;
    height: 70px;
    padding: 0 12%;
    border-bottom: solid 1px ${props => props.theme.borderColor.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;

    #search-form {
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;

        label {
            height: 100%;
            min-width: 60%;
            display: flex;
            flex-direction: row;
            display: flex;
            align-items: center;

            img {
                width: 20px;
                height: 20px;
                margin-right: 20px;
            }

            input {
                height: 100%;
                width: 100%;
                -webkit-box-shadow: ${props => props.theme.autofillRemove.secondary};
            }
        }
    }

    #nav-bar {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: ${props => props.theme.textColor.secondary};

        .nav-link {
            display: flex;
            align-items: center;
            height: 100%;
            margin-left: 8%;
        }

        .active {
            border-bottom: solid 2px ${props => props.theme.textColor.primary};
            color: ${props => props.theme.textColor.primary};
        }
    }
`