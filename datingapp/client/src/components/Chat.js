import { useState } from "react"
import Nav from './Nav'
import Matches from "./Matches"
import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import {useNavigate} from 'react-router-dom'




const Chat = ({profileSummary}) => {
    console.log('puppipi',profileSummary.matches)
    const [clicked, setclickedUser] = useState(null)
    console.log('cliked user',clicked)
    let navigate = useNavigate()
    

    const goInfopage = () =>{
        navigate ('/infopage')
    }

    return (
        <div className="chat-container">
            <ChatHeader profileSummary = {profileSummary}/>
            <div>
                <button className="option" onClick={()=> setclickedUser(null)}>Matches</button>
                <button className="option" disabled={!clicked}>Chats</button>
                <button className="option" onClick={goInfopage}>profile</button>
            </div>
            {!clicked && <Matches matches={profileSummary.matches} setclickedUser={setclickedUser}/>}
            {clicked &&<ChatDisplay profileSummary={profileSummary} clickedUser={clicked} />}


        </div>


    )
}

export default Chat