import * as React from 'react';
import heart from '../images/heartLogo.png'
import textHeart from '../images/text_logo.png'

const Nav = ({minimal, setShowModel, showModel, setIsSignUp}) => {

    //on click set variables 
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