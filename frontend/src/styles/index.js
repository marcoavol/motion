import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle `
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Roboto", sans-serif;
        color: ${props => props.theme.textColor.primary};
        line-height: 24px;
    }

    button {
        cursor: pointer;
        outline: 0;
        background: none;
        border: none;
    }

    input, input::placeholder {
        outline: none;
        border: none;
        font-size: inherit;
        color: inherit;
        background-color: inherit;
    }

    a, a:active {
        color: inherit;
        text-decoration: none;
    }
`

export const Theme = {
    gradient: "linear-gradient(to right bottom, #C468FF 0%, #6E91F6 80%)",
    backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#F2F2F2",
    },
    textColor: {
        primary: "black",
        secondary: "rgba(0, 0, 0, 0.6)",
        tertiary: "#FFFFFF",
        quaternary: "rgba(255, 255, 255, 0.6)",
    },
    borderColor: {
        primary: "rgba(0, 0, 0, 0.2)",
        secondary: "rgba(255, 255, 255, 0.2)",
    },
    accentColor: {
        primary: "#AD73FD",
    },
    autofillRemove: { 
        //-webkit-box-shadow: 
        primary: "0 0 0px 1000px #FFFFFF inset", 
        secondary: "0 0 0px 1000px #F2F2F2 inset",
    }
}