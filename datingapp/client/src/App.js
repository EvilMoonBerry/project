import Homepage from './pages/Homepage';
import Infopage from './pages/Infopage';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Profilepage from './pages/Profilepage';
import {useCookies} from 'react-cookie'



const App = () => {
  //setting variables
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken //gives access rights to user after login in or signning up

  //used paths
  return (
    <BrowserRouter>
      <Routes>
        {authToken && <Route path={"/profile"} element ={<Profilepage/>}/>}
        <Route path={"/"} element ={<Homepage/>}/>
        {authToken && <Route path={"/infopage"} element ={<Infopage/>} />}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
