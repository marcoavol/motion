import styled from "styled-components"

export const PostsContainerStyled = styled.div `    
    width: 100%;
    height: 100vh;
    padding-top: 70px;
    overflow-y: auto;
    background-color: ${props => props.theme.backgroundColor.secondary};
`