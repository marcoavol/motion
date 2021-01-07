import styled from "styled-components"

export const LandingContainerStyled = styled.div `
    width: 100%;
    height: 100vh;
    min-height: 485px;
    display: flex;
    background-color: ${props => props.theme.backgroundColor.primary};
    text-align: center;
`