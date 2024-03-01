import { useEffect, useState } from "react"
import Nav from './Nav'

const Matches = ({matches, setclickedUser}) => {

    const [matchIds, setMatchIds] = useState(null)
    
    
    const searchMatches =(matcheusers)=>{
        
        if(matcheusers.length===0){
            console.log('empty list of matches')
        }else{

        const ids = JSON.stringify(matcheusers)
        console.log('here we are')
        console.log('liliiiiii',ids)
        console.log('ids lenght',ids.length)
        try{
            fetch("http://localhost:8000/allusers/"+ids, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            }).then(response => response.json())
                .then(data => {
                    console.log('marches',data)
                    setMatchIds(data)
                })
    }catch(error){
        console.log(error)
    }
    console.log(matchIds)
    }
}

    useEffect(()=>{
        if(matches){
            const matcheusers = matches.map((user_id)=> user_id)
            console.log('lulu',matcheusers)
            searchMatches(matcheusers)

            console.log('gigig',matches)
            }
        else{
            console.log('lets wait')
        }
        return () => console.log('cleaning things up in here')
    },[matches])
    console.log('lenght', matches)
    console.log('dippidpiiidpidd',matchIds)

    

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