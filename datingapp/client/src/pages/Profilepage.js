import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useEffect } from 'react';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useCookies } from "react-cookie"
import {useNavigate} from 'react-router-dom'




import Chat from '../components/Chat'
import { formControlLabelClasses } from '@mui/material';



const Profilepage = () => {

    
    
    const [profileSummary,setProfileSummary] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(null)
    const [genderMatch, setGenderMatch, ] = useState(null)
    const [selected, setSelected] = useState(0);
    const userId = cookie.UserId


    const getProfileSummary= ()=>{
        try{
            console.log(cookie.userId)
             fetch("http://localhost:8000/profilecard/"+cookie.userId, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => { 
                    //console.log(data)
                    setProfileSummary(data)  
                    console.log(profileSummary)
                })

    }catch(error){
        console.log(error)
    }}


    useEffect(()=>{
        getProfileSummary()
        return () => console.log('cleaning things up')
    
   },[])

   useEffect(()=>{
    if(profileSummary){
        getGenderMatch()
        console.log()
    }
    else{
        console.log(profileSummary)

    }
    console.log('gender',genderMatch)
    return () => console.log('cleaning things up')
   },[profileSummary])
   console.log('gender',genderMatch)

    const getGenderMatch= () =>{        
        console.log('fetching gender')
        console.log(profileSummary.gender_intrest)
        
        try{
            fetch("http://localhost:8000/usergender/"+ profileSummary?.gender_intrest, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })  .then(response => response.json())
                .then(data => {
                    console.log(data)

                    setGenderMatch(data)
                    
                    console.log('gender',genderMatch)
                })
    }catch(error){
        console.log(error)
    }
}


   const updatematch = (mUserId)=>{

    console.log('täällä')
    console.log('pipi',mUserId)
    console.log('pupu',profileSummary.user_id)
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

   useEffect(()=>{
    console.log('test')
    if(genderMatch)
    console.log(profileSummary.matches)
   },[updatematch])





    const handleClick = () => {
        //console.log(genderMatch[selected].user_id)
        updatematch(genderMatch[selected].user_id)
        setSelected(prev => {
            console.log('prev',prev)
                if (prev === genderMatch.length - 1) {
                return 0;
                } else {
                return prev + 1;
                }});
                console.log("like");

      };
    
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

    return(
        <>
        {profileSummary &&

        <div className="profile_page">
            <Chat profileSummary = {profileSummary}/>
            <div className="candidates-container">
                <div className="profiles-container" style={{ display:'flex', justifyContent:'center', marginTop: 50 } }>
                    {genderMatch && < Card sx={{ maxWidth: 345 }} >
                    <h3>{genderMatch[selected].first_name}</h3>
                        <CardHeader
                            title={genderMatch[selected].first_name}
                            subheader='age'
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={genderMatch[selected].url}
                            alt="Paella dish"
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



 /*{genderMatch.map((profile)=>
                    <Card>
                        className = 'cardholder'
                        key ={profile.name}
                        <div style={{
                            backgroundImage: 'url('+ profile.url+')'
                        }}>
                        <h3>{profile.name}</h3>
                        </div>
                    </Card>)
                    <Card sx={{ maxWidth: 345 }} >
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                                
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={profile.name}
                            subheader='age'
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={characters[selected].url}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Something that I like about tihngs tahat i dont know but im trying and happy with ojojojojojojojoojojojojojojojojojojojoj
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites"  className='cardProfile'onClick={handleClick} >
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="skip" className='skip' onClick={handleClickDel}>
                            <PersonRemoveAlt1Icon />
                            </IconButton>
                        </CardActions>
                        </Card>





                         <Card sx={{ maxWidth: 345 }} >
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                                
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={profile.name}
                            subheader='age'
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={characters[selected].url}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Something that I like about tihngs tahat i dont know but im trying and happy with ojojojojojojojoojojojojojojojojojojojoj
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites"  className='cardProfile'onClick={handleClick} >
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="skip" className='skip' onClick={handleClickDel}>
                            <PersonRemoveAlt1Icon />
                            </IconButton>
                        </CardActions>
                        </Card>
                        }*/