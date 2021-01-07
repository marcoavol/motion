import styled from "styled-components"
import { DivShadowedStyled } from "../../../styles/divs"

export const PostContainerStyled = styled(DivShadowedStyled) ` 
    min-width: 400px;
    
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        #info-div {
            height: 40px;
            margin: 0 auto 0 10px;
            font-size: 14px;
            line-height: 16px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            #timestamp {
                color: ${props => props.theme.textColor.secondary}
            }
        }

        #menu-btn {

            img {
                height: 20px;
                opacity: 30%;
            }
        }
    }

    #text {
        margin: 20px 0;
        text-align: justify;
    }

    #image-container {
        width: 100%;
        margin-bottom: 20px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;

        button {
            position: relative;
            background-size: cover;
            border-radius: 4px;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 30%;
            }

            p {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 40px;
                color: ${props => props.theme.textColor.tertiary};
                opacity: 100%;
            }
        }
        
        button:after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }
        
    }

    footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .reaction-btn {
            margin-right: 15%;

            img {
                width: 20px;
                margin-right: 20px;
                opacity: 30%;
            }
        }
     
        .liked {
            img {
                opacity: 100%;
            }   
        }

        p {
            margin-left: auto;
            font-size: 14px;
            color: ${props => props.theme.textColor.secondary};
        }
    }
`