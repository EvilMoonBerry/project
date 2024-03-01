import { useState } from "react"
import Nav from './Nav'
import Matches from "./Matches"
import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import {useNavigate} from 'react-router-dom'




const Chat = ({profileSummary}) => {
    //preparations for variables
    const [clicked, setclickedUser] = useState(null)
    let navigate = useNavigate()

    // user can go back to infopage and change their info
    const goInfopage = () =>{
        navigate ('/infopage')
    }
    
    //How to make and display chat https://github.com/kubowania/tinder-clone/blob/main/client/src/components/ChatContainer.js
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