import { useEffect, useState } from "react"
import Nav from './Nav'

const Matches = ({matches, setclickedUser}) => {
    //preparations for variables
    const [matchIds, setMatchIds] = useState(null)

    const searchMatches =(matcheusers)=>{
        if(matcheusers.length===0){
            console.log('empty list of matches')
        }else{

        const ids = JSON.stringify(matcheusers) //stringify so that user ids can be passed as a parameter
        try{
            fetch("http://localhost:8000/allusers/"+ids, { //fetch a data list of all users that the user have liked
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            }).then(response => response.json())
                .then(data => {
                    setMatchIds(data)
                })
    }catch(error){
        console.log(error)
    }
    }
}
//useEffect for geting matched user data 
    useEffect(()=>{
        if(matches){
            const matcheusers = matches.map((user_id)=> user_id)
            searchMatches(matcheusers)
            }
        else{
            console.log('lets wait')
        }
        return () => console.log('cleaning things up in here')
    },[matches])
    
//display matched users
    return (
        <div className="matchs-display">
            {matchIds?.map((match,_index)=>(
                <div key={{_index}} className="match-cardi" onClick={()=>setclickedUser(match)}>
                    <div className="chat-img">
                        <img src={match?.url} alt={match?.first_name+'profile'}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
            ))}
            
        </div>


    )
}

export default Matches