import Nav from '../components/Nav'
import { useState } from 'react'
import AuthModel from '../components/AuthModel'


const Homepage = () => {
    //preparations for variables
    const [showModel, setShowModel] = useState(false)
    const [isSignUp,setIsSignUp] =useState(true)
    const authToken = false
    // on click change view for user from creating account form to sing in form
    const handClik = () => {
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