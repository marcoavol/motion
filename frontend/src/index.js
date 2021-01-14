import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store/index"
import Routing from "./routes/index"
import { ThemeProvider } from "styled-components"
import { GlobalStyle, Theme } from "./styles/index"
import { userSignInAction } from "./store/actions/signIn"

//TODO: Check if user already started sign up process before and if so continue at given step?
//TODO: Also check if accessToken is still valid?
let authorized = false
const currentUserString = localStorage.getItem("currentUser")
if (currentUserString) {
    authorized = true
    const currentUser = JSON.parse(currentUserString)
    store.dispatch(userSignInAction(currentUser.user, currentUser.access, true))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Routing authorized={authorized} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
