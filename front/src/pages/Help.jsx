import React from 'react'
import Header from './Header'

function Help() {
  return (
    <div className='box-section'>
      <Header/>

      <div className='help-box'>
        <h2>How to Book an Appointment</h2>
        <ol>
            <li>Click the “Book Appointment” button to begin the appointment process.</li>
            <li>Log in to your account.</li>
            <p>If you do not have an account, click the "Register Here" link to create one.</p>
            <li>Choose the service you want to receive.</li>
            <li>Select your preferred branch for the appointment.</li>
            <li>Select an available date and time from the open appointment slots.</li>
            <li>Choose who the appointment is for:</li>
            <ul>
              <li className='descr'><span className='bold'>Yourself</span> — you will go directly to the booking summary.</li>
              <li className='descr'><span className='bold'>Someone Else</span> — you will be asked to fill in the other person’s information before continuing.</li>
            </ul>
            <li>Review your booking summary carefully and click the "Confirm" button to complete your appointment. And get your Queue Number.</li>
        </ol>
    </div>
    </div>
  )
}



export default Help