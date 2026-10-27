import React, { use } from 'react'
import '../css/summary.css'
import Header from './Header'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

function QueueNo() {

  const navigate = useNavigate()
  const queue = localStorage.getItem('queue')
  const logout = async () => {
    try {
      await api.post('/user/logout')
      localStorage.clear()
      navigate('/login', { replace: true })
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='box-section'>
      <Header />

      <div className='queue'>
        <h1>Your Queue Number: <br />{queue}</h1>
        <button className='logout' onClick={logout}>Logout</button>

        <p>Be on time for your appointment.</p>
      </div>

    </div>
  )
}

export default QueueNo