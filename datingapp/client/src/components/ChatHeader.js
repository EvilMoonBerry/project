import { useCookies } from "react-cookie"
import {useNavigate} from 'react-router-dom'

const ChatHeader = ({profileSummary}) => {
    //preparations for variables
    const [cookie, setCookie, removeCookie] = useCookies(null)
    let navigate = useNavigate()

    //on click log out and empty cookies
    const logout = () =>{
        removeCookie('userId', cookie.userId)
        removeCookie('AuthToken', cookie.AuthToken)
        navigate ('/')

    }
//display chat header
    return (
        <div className="chat-header">
            <div className="chat-profile">
                <div className="chat-img">
                    <img src ={profileSummary.url} alt={'profile picture of '+ profileSummary.first_name }/>
                </div>
                <h3>{profileSummary.first_name}</h3>
            </div>
            <i className='log-out' onClick={logout}>Log out</i>
        </div>


    )
}

export default ChatHeader