//import logo from './logo.svg';

import Homepage from './pages/Homepage';
import Infopage from './pages/Infopage';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Profilepage from './pages/Profilepage';
import {useCookies} from 'react-cookie'
//import { useState } from "react"
//import { ThemeProvider,} from "@mui/material"
//import { green, purple } from '@mui/material/colors';
//import { createTheme } from '@mui/material';

/*const theme = createTheme({

    palette: {
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500],
        },
      },

})*/


const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  return (
    //<ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        {authToken && <Route path={"/profile"} element ={<Profilepage/>}/>}
        <Route path={"/"} element ={<Homepage/>}/>
        {authToken && <Route path={"/infopage"} element ={<Infopage/>} />}
      </Routes>
    </BrowserRouter>
    //</ThemeProvider>
  )
}

export default App;
