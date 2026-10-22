import React from 'react'
import '../css/terms.css'
import Header from './Header'

function Terms() {
  return (
   
     <div className='box-section'>
      <Header/>
      <div className='terms'>
        <h2>Appointment Policy Consent</h2>
        <ul>
            <li>Appointments cannot be transferred to another person.</li>
            <li>The appointment is valid only for the specific service you have booked.</li>
            
            <li>
            A valid ID must be presented at the time of the appointment.</li>
            <li>You must arrive on time for your appointment.</li>
            <li>If you are late, we reserve the right not to serve you.
           </li>
        </ul>
    </div>
     </div>
   
  )
}

export default Terms