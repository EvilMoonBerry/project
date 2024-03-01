import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'




const AuthModel = ({setShowModel,isSignUp, setUser}) => {

    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [confirmPassword,setConfirmPassword] = useState(null)
    const [error,setError] = useState(null)
    const [userData, setUserData] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(null)
    const [stat , setStat] = useState(null)
    

    let navigate = useNavigate()


    console.log(email,password,error)


    const handleClick= () =>{
        setShowModel(false)
    }
    

    const handleSubmit =  (e)=>{
        e.preventDefault()
        console.log(e)
        
        console.log(userData +'this is user data')
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError('Passwords do not match')
                return
            } else if (isSignUp && (password === confirmPassword)){
            console.log('fetching')
            fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userData)
            })  .then(response => response.json(
                
            ))
                .then(data => {
                        console.log(data)
                        console.log('success')
                        setCookie('userId',data.userId)
                        setCookie('AuthToken',data.token)
                        window.location.reload()
                        
                }).then(navigate ('/infopage'))
        }else if(!isSignUp){
            console.log(userData)
            fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('got data',data)
                console.log('success jeejee')
                setCookie('userId',data.userId)
                setCookie('AuthToken',data.token)
                window.location.reload() 
            }).then(navigate ('/profile'))
        }

        }catch(error){
            console.log(error)
        }

        
        
    }


    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }


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