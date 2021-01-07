import styled from "styled-components"

export const DivShadowedStyled = styled.div `   
    padding: 20px;
    background-color: ${props => props.theme.backgroundColor.primary};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
`