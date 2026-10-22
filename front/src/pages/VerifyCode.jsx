import React, { useState } from 'react'
import '../css/register.css'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'

function VerifyCode() {
  const location = useLocation()
  const phone = location.state?.phone
  const code = location.state?.code

  const appointmentFor = localStorage.getItem('appointmentFor')
  localStorage.setItem('phone', phone)
  const navigate = useNavigate()
  const [digit1, setD1] = useState('')
  const [digit2, setD2] = useState('')
  const [digit3, setD3] = useState('')
  const [digit4, setD4] = useState('')
  const [digit5, setD5] = useState('')
  
  function handleSubmit(e) {
    e.preventDefault()
    const otp = digit1 + digit2 + digit3 + digit4 + digit5
    if (!digit1 || !digit2 || !digit3 || !digit4 || !digit5) {
      return alert('enter code');
    } else if (otp != code) {
      return alert('wrong code')
    }else if(appointmentFor === 'for-other-appointment')
      {return navigate('/seappointment', {
        state: {phone, appointmentFor}
      })}
       return navigate('/register')
  }

  function handleInput(e) {
    if (isNaN(e.target.value)) {
      e.target.value = ''
    } else if (e.target.value.length === 1) {
      e.target.nextElementSibling?.focus()
    }
  }

  function handleBackSpace(e) {
    if (e.key === 'BackSpace' && e.target.value === '') {
      e.target.previousElementSibling?.focus()
    }
  }
  return (
    <div className='box-section'>
      <Header />
      <div className='code-box'>
        <h3>+251{phone}</h3>
        <p>A code was sent via SMS. Please enter the code here. </p>
        <form onSubmit={handleSubmit}>
          <input type="text" maxLength={1} onInput={handleInput} onKeyDown={handleBackSpace} value={digit1} onChange={e => setD1(e.target.value)} />
          <input type="text" maxLength={1} onInput={handleInput} onKeyDown={handleBackSpace} value={digit2} onChange={e => setD2(e.target.value)} />
          <input type="text" maxLength={1} onInput={handleInput} onKeyDown={handleBackSpace} value={digit3} onChange={e => setD3(e.target.value)} />
          <input type="text" maxLength={1} onInput={handleInput} onKeyDown={handleBackSpace} value={digit4} onChange={e => setD4(e.target.value)} />
          <input type="text" maxLength={1} onInput={handleInput} onKeyDown={handleBackSpace} value={digit5} onChange={e => setD5(e.target.value)} /><br />
          <button>Check</button>
        </form>
      </div>
    </div>
  )
}

export default VerifyCode