import React, { useState } from 'react'
import '../css/appointment.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
function CheckApp() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [appoint, setappoint] = useState(null)
  
  // localStorage.setItem('appoint', appoint)
  function handleclick(app){
    if(app === 'other'){
      localStorage.setItem('appointmentFor', 'for-other-appointment')
      return navigate('/verify')
    }else if(app === 'mySelf')
    localStorage.setItem('appointmentFor','self-appointment')
    navigate('/summary')
  }
  // alert(appoint)

  return (
    <div className='box-section'>
      <Header/>
      <div className='check-box'>
       <h2>Who is the appointment for?</h2> 

       <section className='check-appointment'>
        <div className='for for-self' onClick={() => handleclick('mySelf')}>
            <h3>My Self</h3>
        </div>
        <div className='for for-other' onClick={()=> handleclick('other')}>
            <h3>Other</h3>
           
        </div>
       </section>
    </div>
    </div>
  )
}

export default CheckApp