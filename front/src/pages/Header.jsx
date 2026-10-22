import React, { useState } from 'react'
import '../css/header.css'
import { useNavigate, NavLink } from 'react-router-dom'
import menu from '../images/menuIcon.png'
import x from '../images/xIcon.png'

function Header() {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(null)
  const [closeMenu, setCloseMenu] = useState(null)

// function clickMenu(){
  // if(closeMenu == 'close')
  //   return setShowMenu(null)

  // setShowMenu('clicked')
  // }

  // function clickCloseMenu(){
  //   setCloseMenu('close')
  //   if(closeMenu == 'close')
  //     setShowMenu(null)
    
  // }

  return (
    <div className='home-header-sec'>
      <div className='home-header'>
        <h1 className='logo' onClick={() => navigate('/')}>Ministry of Transport <br /> and Logistics</h1>
        <NavLink to={'/'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'} >
          <li>Home</li>
        </NavLink>

        <NavLink to={'/terms'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'}>
          <li>Terms and Conditions</li>
        </NavLink>
        <NavLink to={'/help'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'}>
          <li>Help</li>
        </NavLink>
      </div>

      <div className={showMenu == null ? 'phone-home-header': 'none' && closeMenu == 'close' ? 'phone-home-header' : 'none'} >
        <h1 className='logo' onClick={() => navigate('/')}>Ministry of Transport <br /> and Logistics</h1>
        <div className='menu-icon'>
          <img src={menu} alt="" className='menu' onClick={() => setShowMenu('clicked')}/>
        </div>
      </div>

      <div className={showMenu == null ? 'none': 'menu-bar' && closeMenu == 'close' ? 'none' : 'menu-bar'}>
        <NavLink to={'/'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'} >
          <li>Home</li>
        </NavLink>

        <NavLink to={'/terms'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'}>
          <li>Terms and Conditions</li>
        </NavLink>
        <NavLink to={'/help'} className={({ isActive }) => isActive ? 'active-link' : 'home-header-link'}>
          <li>Help</li>
        </NavLink>
        <img src={x} alt="" className='x' onClick={() => setCloseMenu('close')} />
      </div>

    </div>


  )
}

export default Header