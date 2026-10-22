import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/admin.css'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

function AdSidebar() {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await api.post('/admin/logout')
      localStorage.clear()
      navigate('/admin/login', {replace: true})
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <div className='admin'>
      <section className='sidebar-section'>
        <div className='sidebar'>
      <hr /> <Link to={'/dashboard'}>Dashboard</Link><br /><hr />
       <Link to={'/appointments'}>Appointments</Link><hr />
       
       <Link onClick={logout} >Logout</Link><hr />
        </div>  
      </section>
        
    </div>
  )
}

export default AdSidebar