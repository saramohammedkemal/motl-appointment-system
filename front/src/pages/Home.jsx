import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'
import Header from './Header.jsx'

function Home() {
  return (
    <div>
      <Header />
      <div className='home'>
        <div className='home-box'>
          <p className='white'>Skip the Line.</p>
          <p className='aqua'>Save Your Time.</p>
          <p>A Smart queue managment system for the Ministry of Transport and Logistic.</p>

          <Link to={'/login'} className='book-appointment'><button>Book Appointment</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home