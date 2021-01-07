import styled from "styled-components"

export const MainHeaderContainerStyled = styled.header `  
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.backgroundColor.primary};
    display: flex;
    justify-content: center;
  
    #nav-bar {
        height: 100%;
        width: 100%;
        margin: 0 3%;
        display: flex;
        align-items: center;

        #home-link {
        height: 100%;
        margin: 0 5% 0 0;
        font-size: 22px;
        font-weight: 400;
        display: flex;
        align-items: center;

            img {
                width: 26px;
                height: 26px;
                margin-right: 12px;
            }
        }

        .nav-link {
            height: 100%;
            margin: 0 3%;
            display: flex;
            align-items: center;
            
            img {
                width: 18px;
                height: 18px;
                margin-right: 18px;
            }
        }

        .active {
            border-bottom: solid 2px ${props => props.theme.accentColor.primary} 
        }

        #notifications-btn {
            margin-left: auto;
            
            img {
                width: 20px;
                height: 20px;
                position: relative;
                top: 5px;
                opacity: 30%;
            }

            p {
                width: 20px;
                height: 20px;
                position: relative;
                bottom: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: ${props => props.theme.gradient};
                color: ${props => props.theme.textColor.tertiary};
                font-size: 10px;
                
            }
        }

        #profile-link {
            margin: 0 3%; 
        }

        #menu-btn {
            img {
                height: 20px;
                opacity: 30%;
            }
        }
    }
`