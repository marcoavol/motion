import styled from "styled-components"

export const ButtonStyled = styled.button `
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonWideStyled = styled(ButtonStyled) `
    width: 125px;
    height: 40px;
    border-radius: 30px;
    border-width: 2px;
    border-color: ${props => props.theme.borderColor.primary};
    border-style: ${props => props.colored ? "none" : "solid"};
    background: ${props => props.colored ? props.theme.gradient : "none"};
    font-size: 12px;
    color: ${props => props.colored ? props.theme.textColor.tertiary : props.theme.textColor.primary};
`

export const ButtonRoundStyled = styled(ButtonStyled) `
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.colored ? props.theme.gradient : "none"};

    img {
        max-width: 40px;
        max-height: 40px;
    }
`

