import React, {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Header from '../Header'
import api from '../../utils/api'

function AdLogin() {
      const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
      const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch'))
  
      const [appointment, setAppointment] = useState([])
      localStorage.setItem('appointment', appointment)
     
    async function handleSubmit(e){
      e.preventDefault()

      if(!email || !password){
        setMessage('All Fields Are Required')
        return
      }
      try {
        const response = await api.post('/admin/login', {
        email:email,
        password: password
      },
    {withCredentials:true})
      if(response.data.role === 'main'){
        localStorage.setItem('mainAdminLoggedIn', 'true')
        navigate('/mainadmin')
        return
      }
      localStorage.setItem('adminsBranch', JSON.stringify(response.data.branch))
      const userAppData = JSON.parse(localStorage.getItem('userAppData'))
      localStorage.setItem('userAppointment', JSON.stringify(userAppData))
      localStorage.setItem('adminLoggedIn', 'true')
    const adminBranch = JSON.parse(localStorage.getItem('adminsBranch'))
      
       async function filterAppontments(adminBranch){
        
          const filteredApp = appointment.filter(app => app.branch === adminBranch)
          
          setAppointment(filteredApp)
      }
      
      navigate('/appointments')

      } catch (error) {
        console.log(error.message);
        setMessage(error.response.data.msg)
        
      }
      
    }
  return (

        <div className='box-section'>
            <Header/>
     <div className='login ad  box'>
        <h5>Login to your Account </h5>    
        <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} className='password' onChange={e=> setPassword(e.target.value)}/>
        {message === null ? '' : <p className='message'>{message}</p>}
        <br /><button>Sign in</button>
           
        
        </form>
    </div>
 </div>

    
  )
}

export default AdLogin