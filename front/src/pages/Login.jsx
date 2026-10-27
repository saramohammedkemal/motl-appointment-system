import React, { useState } from 'react'
import '../css/register.css'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'

function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!phone || !password) {
      return setMessage('All Fields Are Required')

    }
    try {
      const response = await api.post('/user/login', {
        phone: phone, password: password
      }, { withCredentials: true })

      localStorage.setItem('user', JSON.stringify(response.data.user))
      const user = JSON.parse(localStorage.getItem('user'))
      const token = response.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('user', user.firstName + ' ' + user.lastName)

      localStorage.setItem('isLoggedIn', 'true')
      navigate('/services')
    } catch (error) {
      setMessage(error.response?.data?.msg)
    }
  }
  return (
    <div className='box-section'>
      <Header />
      <div className='login  box'>

        <h5>Log in with your phone number </h5>

        <form onSubmit={handleSubmit}>

          <div className='phone'>
            <select name="" id="">
              <option value="+251">+251</option>
            </select>
            <input type="phone" placeholder='9 X X X X X X X X' value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <input type="password" placeholder='Password' value={password} className='password' onChange={e => setPassword(e.target.value)} />
          {message === null ? '' : <p className='message'>{message}</p>}
          <p><button>Sign in</button>
            You don't have an account <Link to={'/verify'} className='registration-link'>Register Here</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Login