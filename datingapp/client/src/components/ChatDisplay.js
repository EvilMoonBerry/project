import { useEffect, useState } from "react"


import ChatInput from "./ChatInput"
import ChatProfile from "./ChatProfile"


const ChatDisplay = ({profileSummary, clickedUser}) => {

    const [userMess, setUserMess]= useState(null)
    const [clickedUserMesg, setclickedUsermesg] = useState(null)
    

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
                    console.log(data)

                    console.log('mes',data)

                    setUserMess(data)
                
                })
    }catch(error){
        console.log(error)
    }
    }

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
                    console.log(data)

                    console.log('mes',data)

                    setclickedUsermesg(data)
                
                })
    }catch(error){
        console.log(error)
    }
    }


    useEffect(()=>{
           
            getUsersMessages()
            getClickedUsersMessages()
            console.log('yyoyoyo', profileSummary)
            
            
    },[])

    const messages = []

    userMess?.forEach(message =>{
        const formattedMessage = {}
        formattedMessage['name']=profileSummary?.first_name
        formattedMessage['img']=profileSummary?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUserMesg?.forEach(message =>{
        const formattedMessage = {}
        formattedMessage['name']=clickedUser?.first_name
        formattedMessage['img']=clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    console.log('Dippidippi',userMess)
    console.log('DapaDapa', messages)



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