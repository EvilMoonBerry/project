
const ChatProfile = ({decendingOrd}) => {
//display in chat matched perosn and user, messages and time stamps
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