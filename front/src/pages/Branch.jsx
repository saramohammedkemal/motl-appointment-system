import React, { useState } from 'react'
import '../css/branchService.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'

function Branch() {

  const navigate = useNavigate()
  const [branch, setBranch]= useState('')
  const [brCode, setBrCode]= useState('')
  
  const token = localStorage.getItem('token')
  function handleClick(br) {
  let code = '';

  if(br === 'Addis Ketema'){
    code = 'AK';
  }else if(br === 'Bole'){
    code = 'BO';
  }else if(br === 'Kality'){
    code = 'KA';
  }else if(br === 'Megenagna'){
    code = 'MG';
  }else if(br === 'Mekanisa'){
    code = 'MK';
  }

  localStorage.setItem('branch', br);
  localStorage.setItem('brCode', code);

  navigate('/date');
}
  
  return (
      <div className='box-section'>
        <Header/>
        <div className='branches-container'>

             <h2>Select your preferred Branch.</h2>

          <div className='first'>
             
            <div className='branch' onClick={()=>handleClick('Addis Ketema')}>
                <p>Addis Ketema </p>
            </div>

            <div className='branch' onClick={()=> handleClick('Bole')}>
              <p>Bole</p>
            </div>

            <div className='branch kality' onClick={()=> handleClick('Kality')}>
              <p>Kality</p>
            </div>
          </div>

          <div>
            <div className='branch kality-phone' onClick={()=> handleClick('Kality')}>
              <p>Kality</p>
            </div>
          </div>

          <div className='second'>
             
            <div className='branch' onClick={()=>handleClick('Megenagna')}>
              <p>Megenagna</p>
            </div>

            <div className='branch' onClick={()=> handleClick('Mekanisa')}>
              <p>Mekanisa</p>
            </div>
          </div>

        </div>
      </div>
    
  )
}

export default Branch