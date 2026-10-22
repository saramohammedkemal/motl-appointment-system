import React, {useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import '../css/register.css'
import Header from './Header'
import api from '../utils/api'

function Register() {
  const location = useLocation()
    const userPhone = location.state?.phone

   const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState(userPhone)
    // const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()

      if(!firstName || !lastName || !password || !phone){
        setMessage('All Fields Are Required')
        return
      }

      await api.post('/user/register', {
      firstName: firstName,
      lastName: lastName,
      phone: phone, 
      password: password
      }, {withCredentials:true})
      navigate('/login')
    }

  return (
    
   <div className='box-section'>
    <Header/>
     <div className='register box'>
       <h5>Create Account</h5>
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder='First Name' value={firstName} onChange={e=>setFirstName(e.target.value)} /><br />
        <input type="text" placeholder='Last Name' value={lastName} onChange={e=> setLastName(e.target.value)} /><br />
        <select name="" id="">
          <option value="+251">+251</option>
        </select>
        <input type="phone" placeholder='9 X X X X X X X X' className='phone' value={phone} onChange={e=>setPhone(userPhone)}/><br />
        <input type="password" placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)}/>
       {message === null ? '' : <p className='message'>{ message}</p>}
        <p><button className='create'>Create</button></p>
       </form>
    </div>
   </div>

  )
}

export default Register