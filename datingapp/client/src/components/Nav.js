import * as React from 'react';
/*import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';*/

import heart from '../images/heartLogo.png'
import textHeart from '../images/text_logo.png'



const Nav = ({minimal, setShowModel, showModel, setIsSignUp}) => {


    const handleClick= ()=>{
        setShowModel(true)
        setIsSignUp(false)
    }

    const authToken =false
    return(
        <nav>
           < div className="logo-container">
                <img className="logo" src={minimal ? heart : textHeart} alt = 'logo' />
           </div>

           {!authToken && !minimal && <button 
                className='nav-button'
                onClick = {handleClick}
                disabled ={showModel}>
                Log in
           </button>}
        </nav>
    )
}

export default Nav