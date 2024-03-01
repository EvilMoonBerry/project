## Dating app clone using React, ExpressJS and MongoDB

This is a dating site clone made were the user can register and log in. The user can create a profile and chat with other registered users. 

### Video demo

https://github.com/EvilMoonBerry/project/assets/78617530/bc7dbc4c-9273-4483-a4ba-a6b0b873fdce


pictures used in the video are from: https://www.pexels.com/

## Getting started

1. Clone the repository or dowload and unzip code 
2. Go to client folder and run command to install dependencies
```bash
npm install
```
3. Go to server folder and run command to install dependencies
```bash
npm install
```
4. Check if needed all dependencies are installed from package.json in both server and client folder
5. This project uses MongoDB as database. Make sure you are able to use it.
6. To start server run command in server folder
```bash
npm run start:backend
```
7. To start client run command npm run start:frontend in client folder
```bash
npm run start:frontend
```
8. Go to http://localhost:3000/ to start


## User quide

### New user
- New user can register by clicking "Create account" and filling in "create account" form. Click submit Query
- Pressing x allows the user to cancel the action
- After user has registered with email and password they can fill in their profile.
    - Profile picture takes a link to chosen image
- After submitting profile user is taken to matching site where the profiles displayed are filtered by the user's gender preference
    - User can like other users
        - The name and picture of the liked user is shown to the userseparately
        - Clicking on liked profiles allows the user to chat with the person they like
- Users can edit their profile by clicking on Profile
- User can log out by pressing log out

### Already registered user
- Click to log in and fill in the fields with your username and password. Click 'submit query'
- pressing x allows the user to cancel the action
- After after logging in user is taken to matching site where the profiles displayed are filtered by the user's gender preference
    - User can like other users
        - The name and picture of the liked user is shown to the userseparately
        - Clicking on liked profiles allows the user to chat with the person they like
- Users can edit their profile by clicking on Profile
- User can log out by pressing log out


## React, ExpressJS and MongoDB

I chose MongoDB as the database for this project because I feel that it is easy to install and deploy. I feel that my software is easier to deploy and I am already very familiar with it.

I didn't have much experience with React before this project, so I wanted to challenge myself. React is used a lot and I feel I have improved a lot with this project. I hope that what I have learned will be useful in the future. 

The ExpressJS has become very familiar during this course and in place as what I can't yet thed directly with React. 

## Project points
Mandatory requirements
- Implementation of backend with Node.js
    - You can of course use Express, Meteor or any other additional framework.
	    - Express ✅
- Utilization of database
	- MongoDB, MariaDB or any other you see fit.
        - MongoDB ✅
- Authentication
    - Users have to have an option to register and login. 
        - Both register and login ✅
    - You can use JWT or session based authorization 
        - JWT was used ✅
    - Only authenticated users can post, comment (or vote)
        - User needs to register or log in first to do anything✅
- Features
    - Authenticated users can:
        - See other users and like / dislike them ✅
        - Update their profile (images are not mandatory) ✅
        - Chat with users that have liked both ways ✅ ❌
            - If user has liked some one they can chat with them and does not need to wait for other to match.
        - Non-authenticated users can register ✅
- Responsive design
    - The app needs to be usable with mobile devices and desktop browsers ✅ ❌
        - Use of Materialize was partly implemented but the client is not so responsive that it looks good in smaller devices.
        - Has not been prepared to handle all errors and some can break the code.
- Documentation
  - There needs to be documentation describing the technology choices, installation guidelines and user manual ✅
      - Documentation describing the technology choices, installation guidelines and user manual
      - Code is commented

![image](https://github.com/EvilMoonBerry/project/assets/78617530/8b03041f-8623-48fe-8d25-89d73b4259ec)

Score for my project what I think it deserves: 29 point -10% for late return = ~26 point
