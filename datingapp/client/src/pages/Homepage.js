import Nav from '../components/Nav'
//import Button from '@mui/material/Button';
import { useState } from 'react'
import AuthModel from '../components/AuthModel'


const Homepage = () => {

    const [showModel, setShowModel] = useState(false)
    const [isSignUp,setIsSignUp] =useState(true)

    const authToken = false

    const handClik = () => {
        console.log('cLICK')

        setShowModel(true)
        setIsSignUp(true)
    }

    return (
        <div className='overlay'>
            <Nav 
            minimal={false}  
            setShowModel={setShowModel} 
            showModel ={showModel}
            setIsSignUp={setIsSignUp}
            />
            <div className="homepage">
                <h1 className='primary-title'>Love 4 ever</h1>
                <button className="primary-button" onClick={handClik}>
                    {authToken ? 'Sing Out' : "Create Account"}
                </button>

                {showModel && (
                    <AuthModel setShowModel={setShowModel} isSignUp={isSignUp} />
                )}

            </div>
        </div>
    )
}

export default Homepage