import { hot } from 'react-hot-loader'
import React from 'react'
// import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { AppProvider } from '@utils'
import { AppRouters } from '@pages'

// const GlobalStyle = createGlobalStyle`
//  body {
//    background-color: ${props => (props.theme.mode === 'dark' ? '#111' : '#EEE')};
//    color: ${props => (props.theme.mode === 'dark' ? '#EEE' : '#111')};
//  }
// `

const App = () => (
  <AppProvider>
    {/* <ThemeProvider theme={{ mode: 'dark' }}> */}
    {/* <> */}
    {/* <GlobalStyle /> */}
    <AppRouters />
    {/* </> */}
    {/* // </ThemeProvider> */}
  </AppProvider>

)

export default hot(module)(App)
