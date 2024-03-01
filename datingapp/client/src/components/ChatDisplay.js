import { useEffect, useState } from "react"
import ChatInput from "./ChatInput"
import ChatProfile from "./ChatProfile"


const ChatDisplay = ({profileSummary, clickedUser}) => {
    //preparations for variables
    const [userMess, setUserMess]= useState(null)
    const [clickedUserMesg, setclickedUsermesg] = useState(null)
    
    //Get messages that are from current user to matched user
    const getUsersMessages=()=>{
        const ids = JSON.stringify({
            userId : profileSummary?.user_id,
            coresId : clickedUser?.user_id
        })
        try{
            fetch("http://localhost:8000/messages/"+ ids, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => {
                    setUserMess(data)
                })
    }catch(error){
        console.log(error)
    }
    }
//Get messages that are from matched user to current user
    const getClickedUsersMessages=()=>{
        const ids = JSON.stringify({
            userId : clickedUser?.user_id ,
            coresId : profileSummary?.user_id
        })
        try{
            fetch("http://localhost:8000/messages/"+ ids, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => {
                    setclickedUsermesg(data)
                })
    }catch(error){
        console.log(error)
    }
    }

// useEffect to get messages
    useEffect(()=>{
            getUsersMessages()
            getClickedUsersMessages()
    },[])

    const messages = []
    //formatting current user messages for display
    userMess?.forEach(message =>{
        const formattedMessage = {}
        formattedMessage['name']=profileSummary?.first_name
        formattedMessage['img']=profileSummary?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })
//formatting mathced user messages for display
    clickedUserMesg?.forEach(message =>{
        const formattedMessage = {}
        formattedMessage['name']=clickedUser?.first_name
        formattedMessage['img']=clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })
//put messages in time sent order
    const decendingOrd = messages?.sort((a,b) =>{
        a.timestamp.localeCompare(b.timestamp)
    })
    return (
        <>
        <ChatProfile decendingOrd={decendingOrd} />
        <ChatInput
        profileSummary={profileSummary} clickedUser={clickedUser} getUsersMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages}
        />
        </>
    )
}

export default ChatDisplay