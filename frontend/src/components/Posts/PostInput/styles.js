import styled from "styled-components"
import { DivShadowedStyled } from "../../../styles/divs"

export const PostInputContainerStyled = styled(DivShadowedStyled) `    
    min-width: 400px;
    
    form {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        #avatar {
            width: 50px;
            height: 50px;
        }

        #post-input {
            flex: 1;
            height: 50px;
            margin: 0 20px;
            color: ${props => props.theme.textColor.secondary};
            -webkit-box-shadow: ${props => props.theme.autofillRemove.primary};
        }

        #submit-btn {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            img {
                width: 20px;
            }
        }
    }
`