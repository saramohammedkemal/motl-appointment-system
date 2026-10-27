import React, { useState } from 'react'
import others from '../images/othersimg.png'
import '../css/appointment.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'

function SEAppointment() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  localStorage.setItem('appointmentForOther', firstName + ' ' + lastName)

  const userPhone = localStorage.getItem('phone')

  const [phone, setPhone] = useState(userPhone)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!firstName || !lastName || !phone) {
      return setMessage('All Fields Are Required')
    }
    navigate('/summary')
  }


  return (
    <div className='for-someone-section box-section'>
      <Header />
      <div className='register for-someone'>
        <img src={others} alt="" className='others-logo' />
        <h5>Booking for Someone  else</h5>
        <p>Please enter the details of the person who will be attending the appointment.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} /><br />
          <input type="text" placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} /><br />
          <select name="" id="">
            <option value="+251">+251</option>
          </select>
          <input className='phone' type="phone" placeholder='9 X X X X X X X X' value={phone} onChange={e => setPhone(e.target.value)} /><br />

          {message === null ? '' : <p className='message'>{message}</p>}
          <button>Book appointment</button>
        </form>
      </div>
    </div>
  )
}

export default SEAppointment