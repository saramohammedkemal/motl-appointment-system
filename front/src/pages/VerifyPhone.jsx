import React, { useState } from 'react'
import '../css/register.css'
import Header from './Header'
import { useNavigate, useLocation } from 'react-router-dom'

 function VerifyPhone() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(null)
  const location = useLocation()
    const appoint = location.state?.appoint
  const navigate = useNavigate()

  function getRanNum(min, max){
    return Math.floor(Math.random() * (max- min + 1))+ min
  }
  function handleSubmit(e){
    e.preventDefault()
  if(!phone){
    return setMessage('Enter your phone number')
  }else if(isNaN(phone)){
    return setMessage('Only numbers!')
  }else if(phone.length !==9){
    return setMessage('incorrect phone number')
  }
    const code =getRanNum(10000, 99999)
  alert('Your code is ' + code)


  navigate('/verifycode',{
    state:{phone, code, appoint}
  })
  

  }
  return (
    <div className='box-section'>
      <Header/>
      <div className='verify'>
        <h1>{appoint === 'for-other-appointment' ? 'Verify Phone Number' : 'Verify Your Number' }</h1>

        <form onSubmit={handleSubmit}>
            <select name="" id="">
                <option value="+251">+251</option>
            </select>
            <input type="phone" placeholder='9 X X X X X X X X' value={phone} onChange={e => setPhone(e.target.value)} /><br />
           {message === null ? '' : <p className='verify-message'>{message}</p>}<br />

            <button className='send-code'>send verification code</button>
        </form>
    </div>
    </div>
  )
}

export default VerifyPhone