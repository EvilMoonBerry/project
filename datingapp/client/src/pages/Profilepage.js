import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useEffect } from 'react';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useCookies } from "react-cookie"
import Chat from '../components/Chat'


const Profilepage = () => {

    //preparations for variables
    const [profileSummary,setProfileSummary] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(null)
    const [genderMatch, setGenderMatch, ] = useState(null)
    const [selected, setSelected] = useState(0);
    const userId = cookie.UserId

    //Get current user's profile data
    const getProfileSummary= ()=>{
        if(userId=== null){
            HTMLFormControlsCollection
        }
        try{
             fetch("http://localhost:8000/profilecard/"+cookie.userId, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => { 
                    setProfileSummary(data)
                })
    }catch(error){
        console.log(error)
    }}

    const getGenderMatch= () =>{        
        try{
            fetch("http://localhost:8000/usergender/"+ profileSummary?.gender_intrest, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => {
                    setGenderMatch(data)
                })
    }catch(error){
        console.log(error)
    }
}

    // useEffect for getting user data
    useEffect(()=>{
        getProfileSummary()
        return () => console.log('cleaning things up')
    
   },[])

   // UseEffect for geting users that match current users gender interest if current users data exists
   useEffect(()=>{
    if(profileSummary){
        getGenderMatch()
        console.log()
    }
    else{
    }
    return () => console.log('cleaning things up')
   },[profileSummary])
   
//update current users matches if they like a profile
   const updatematch = (mUserId)=>{
    const info= {
        userids:profileSummary.user_id,
        mUserids:mUserId
    }
   try{
        fetch("http://localhost:8000/matches", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(info)

    }).then(
        getProfileSummary()
                )
        }catch(error){
            console.log(error)
        }
        getProfileSummary()
   }

   //useEffect for testing
   useEffect(()=>{
    if(genderMatch)
    console.log(profileSummary.matches)
   },[updatematch])




// if user likes a profile show next potenttial match and update current users matches
//https://stackoverflow.com/questions/60747450/react-on-onclick-display-next-element-in-array
    const handleClick = () => {
        updatematch(genderMatch[selected].user_id)
        setSelected(prev => {
                if (prev === genderMatch.length - 1) {
                return 0;
                } else {
                return prev + 1;
                }});
                console.log("like");

      };
// Skip shown match and show next user
      const handleClickDel = () => {
        setSelected(prev => {
            if (prev === genderMatch.length - 1) {
              return 0;
            } else {
              return prev + 1;
            }
          });
          console.log("Skip");
        };
//Making a card component https://mui.com/material-ui/react-card/
    return(
        <>
        {profileSummary &&
        <div className="profile_page">
            <Chat profileSummary = {profileSummary}/>
            <div className="candidates-container">
                <div className="profiles-container" style={{ display:'flex', justifyContent:'center', marginTop: 50 } }>
                    {genderMatch && genderMatch[selected] && < Card sx={{ maxWidth: 345 }} >
                    <h3>{genderMatch[selected].first_name}</h3>
                        <CardHeader
                            title={genderMatch[selected].first_name}
                            subheader='age'
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={genderMatch[selected].url}
                            alt="profile foto"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {genderMatch[selected].about}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites"  className='cardProfile'onClick={handleClick} >
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="skip" className='skip' onClick={handleClickDel} >
                            <PersonRemoveAlt1Icon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    }
                </div>
            </div>
        </div>}
</>)
}

export default Profilepage


