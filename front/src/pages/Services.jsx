import React, { useState } from 'react'
import '../css/branchService.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'

function Services() {

  const navigate = useNavigate()
  const [service, setService] = useState('')


  function handleClick(ser) {
    setService(ser)

    localStorage.setItem('service', ser)


    navigate('/branches')
  }

  return (
    <div className='box-section'>
      <Header />
      <div className='service-box'>
        <h2>Select Service</h2>
        <section className='services'>
          <div className='license-issuance' onClick={() => handleClick('License Issuance')}>
            <p>License Issuance</p>
          </div>

          <div className='license-renewal' onClick={() => handleClick('Licesnse Renewal')}>
            <p>License Renewal</p>
          </div>

          <div className='owner-transfer' onClick={() => handleClick('Ownership Transfer')}>
            <p>Ownership Transfer</p>
          </div>
        </section>

        <section className='services services-on-phone'>
          <div className='owner-transfer-phone' onClick={() => handleClick('Ownership Transfer')}>
            <p>Ownership Transfer</p>
          </div>

          <div className='vehicle-inspection-phone' value={service} onClick={() => handleClick('Vehicle Inspection')}>
            <p>Vehicle Inspection</p>
          </div>
        </section>

        <section className='services'>
          <div className='inspection' value={service} onClick={() => handleClick('Vehicle Inspection')}>
            <p>Vehicle Inspection</p>
          </div>
          <div className='registration' value={service} onClick={() => handleClick('Vehicle Registration')}>
            <p>Vehicle Registration</p>
          </div>

          <div className='other-service' value={service} onClick={() => handleClick('Other Service')}>
            <p>Other Services</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Services