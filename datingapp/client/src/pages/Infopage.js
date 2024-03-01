import { useState } from "react"
import Nav from '../components/Nav'
import {useNavigate} from 'react-router-dom'
import { useCookies } from "react-cookie"


const Infopage = () => {
    //preparations for variables
    const [userData, setUserData] = useState()
    const [cookie, setCookie, removeCookie] = useCookies(null)
    let navigate = useNavigate()


    //preparations for user data
    const[formData, setFormData] = useState({ 
        user_id: cookie.userId,
        first_name: '',
        d_bday:'',
        m_bday:'',
        y_bday:'',
        show_identity:false,
        gender_identity:'man',
        gender_intrest:'woman',
        email:'',
        url:'',
        about:'',
        matches:[]
    })

//When user submits data save it to database
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            fetch("http://localhost:8000/update", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(data => {
                        window.location.reload() //reload window that cookies are set
                        
                }).then(
                    navigate ('/profile') // after submittind info the user is redirected to another page
                )
        }catch(error){
            console.log(error)
        }
    }

//Setting the dates so that user can see them
    const handleChange = (e) => {
        const value =e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name
        console.log('value' +value, 'name' +name)
        setFormData((prevState) =>({
            ...prevState,
            [name] : value
        }))

    }
//When the for mis submitted set data
    const handChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    console.log(formData)
    return (
        <>
            
            <Nav
                minimal={true}
                setShowModel={() => { }}
                showModel={false}
            />
            <div className="info-page">
                <h2>Create account</h2>
            
                <form onSubmit={handleSubmit} onChange={handChange}>
                
                    <section>
                    
                        <label htmlFor="first-name">First Name</label>
                        <input
                            id='first_name'
                            type='text'
                            name='first_name'
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Date of birth</label>
                        <div className="person-input-container">
                            <input
                                id='d-bday'
                                type='number'
                                name='d_bday'
                                placeholder="Day"
                                value={formData.d_bday}
                                onChange={handleChange}
                            />
                            <input
                                id='m-bday'
                                type='number'
                                name='m_bday'
                                placeholder="Month"
                                value={formData.m_bday}
                                onChange={handleChange}
                            />
                            <input
                                id='y-bday'
                                type='number'
                                name='y_bday'
                                placeholder="Year"
                                value={formData.y_bday}
                                onChange={handleChange}
                            />

                        </div>
                        
                        <label>Gender</label>
                        <div className="person-input-container">
                            <input
                                id='identity-man'
                                type='radio'
                                name='gender_identity'
                                value='man'
                                checked={formData.gender_identity ==='man'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-man">Man</label>
                            <input
                                id='identity-woman'
                                type='radio'
                                name='gender_identity'
                                required={true}
                                value='woman'
                                checked={formData.gender_identity ==='woman'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-woman">Woman</label>
                            <input
                                id='identity-more'
                                type='radio'
                                name='gender_identity'
                                value='more'
                                checked={formData.gender_identity ==='more'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-more">Other</label>
                        </div>


                        <label htmlFor="show-identity">Show gender in profile</label>
                        <input
                            id='show-identity'
                            type='checkbox'
                            name='show_identity'
                            checked={formData.show_identity}
                            onChange={handleChange}
                        />


                        <label >Show to me</label>
                        <div className="person-input-container">
                            <input
                                id='identity-man-intrest'
                                type='radio'
                                name='gender_intrest'
                                value='man'
                                checked={formData.gender_intrest ==='man'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-man-intrest">Man</label>
                            <input
                                id='identity-woman-intrest'
                                type='radio'
                                name='gender_intrest'
                                required={true}
                                value='woman'
                                checked={formData.gender_intrest ==='woman'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-woman-intrest">Woman</label>
                            <input
                                id='identity-everyone-intrest'
                                type='radio'
                                name='gender_intrest'
                                value='everyone'
                                checked={formData.gender_intrest ==='everyone'}
                                onChange={handleChange}
                            />
                            <label htmlFor="identity-everyone-intrest">Everyone</label>
                        </div>

                        <label htmlFor='about'>About Me</label>
                        <input
                            id='about'
                            type='text'
                            name='about'
                            required={true}
                            placeholder="Like about"
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type='submit' />
                    
                    <label htmlFor='about'>Profile picture</label>
                    <input
                        type='url'
                        name='url'
                        id='url'
                        onChange={handleChange}
                        required={true}
                    />
                    <div className="photo-container">
                        {formData.url && <img src ={formData.url} alt='Profile pic'/>}
                    </div>

                    </section>
                </form>
                
            </div>
            
        </>
        
    )
}

export default Infopage