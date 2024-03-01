import { useState } from "react"


const ChatInput = ({profileSummary, clickedUser, getUsersMessages, getClickedUsersMessages}) => {
    //preparations for variables
    const [textArea, setTextarea] = useState(null)
    const userId = profileSummary?.user_id
    const clickedId = clickedUser?.user_id

    //Add a new sent message to Messages database
    const addmessages = () =>{
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId:clickedId,
            message:textArea
        }

        try{
            fetch("http://localhost:8000/newmessage/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(message),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data) {
                    getClickedUsersMessages()//call thses to update
                    getUsersMessages()
                    setTextarea("")
                }
            })
        }catch(error){
            console.log(error)
        }

    }

//display a textarea for chating
    return (
        <div className="chat-input" >
            
           <textarea value={textArea} onChange={(e) => setTextarea(e.target.value)}  />
           <button className="secondary-button" onClick={addmessages}>Subimt</button>

        </div>


    )
}

export default ChatInput