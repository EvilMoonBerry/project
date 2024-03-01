import { useState } from "react"
import Nav from './Nav'

const ChatProfile = ({decendingOrd}) => {

    const [newTimestamp, setNewTimestamp]= useState(null)

    //console.log('decorder',decendingOrd[1].timestamp)
    //console.log('timestamp test', decendingOrd?.timestamp.toUTCString())
    //
    return (
        <>
        <div className="chat-display">
            
           {decendingOrd.map((message, _index)=>(
            <div key ={_index}>
            <div className="chat-message-header">
                <div className='chat-img'>
                    <img src={message.img} alt = {message.first_name+ ' profile'}/>
                </div>
                <p >{message.name}</p>
            </div>
            <p >{message.message} {message.timestamp}</p>
            </div>
           ))}
        </div>
        </>

    )
}

export default ChatProfile