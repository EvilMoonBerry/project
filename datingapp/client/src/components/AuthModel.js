import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'




const AuthModel = ({setShowModel,isSignUp, setUser}) => {
    ////preparations for variables
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [confirmPassword,setConfirmPassword] = useState(null)
    const [error,setError] = useState(null)
    const [userData, setUserData] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(null)
    const [stat , setStat] = useState(null)
    

    let navigate = useNavigate()

    const handleClick= () =>{
        setShowModel(false)
    }
    
    //when the user wants to log in or make a new user
    const handleSubmit =  (e)=>{
        e.preventDefault()
        
        // check if the user wants to log in or create a new user.
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError('Passwords do not match')
                return
            } else if (isSignUp && (password === confirmPassword)){
            fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userData)
            })  .then(response => response.json(
                
            ))
                .then(data => { //When creating a new user or logging in, permission is created for the user to access other pages
                        setCookie('userId',data.userId)
                        setCookie('AuthToken',data.token)
                        window.location.reload() // set cookies with reload
                        
                }).then(navigate ('/infopage')) //go to info page to fill in user data
        }else if(!isSignUp){
            fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                setCookie('userId',data.userId)
                setCookie('AuthToken',data.token)
                window.location.reload() 

            }).then(navigate ('/profile')) // log in go to profile and start matching
        }

        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

// display login and sign up forms
    return(
        <div className='auth-model'>
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'create account' : 'Sing In'}</h2>
            <p>By creating account you accept the terms of service</p>
            <form onSubmit ={handleSubmit} onChange={handleChange}>

                <input 
                    type="email"
                    id="email"
                    name="Email"
                    placeholder="Email"
                    required = {true}
                    onChange ={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    id="password"
                    name="Password"
                    placeholder="Password"
                    required = {true}
                    onChange ={(e) => setPassword(e.target.value)}
                />

                {isSignUp&& <input 
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required = {true}
                    onChange ={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="secondary-button" type="submit"/>

                <p>{error}</p>
            </form>
        </div>
    )
}

export default AuthModel