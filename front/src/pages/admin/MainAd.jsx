import React, { useEffect, useState } from 'react'
import PagesHead from './PagesHead'
import { create } from 'axios'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function MainAd() {
    const [clicked, setClicked] = useState(null)
    const [branch, setBranch] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [admins, setAdmins] = useState([])
    const [resetMessage, setResetMessage] = useState(null)

    const navigate = useNavigate()
    
    async function handleSubmit(e){
        e.preventDefault()
      try {
          if(!email || !password || !branch){
        setMessage('Fill all')
        return
    }
        const response = await api.post('/admin/register', {
            email: email,
            password: password,
            branch: branch
        },{withCredentials:true})
        setMessage('created')
        setAdmins(prev => [...prev, {branch, email}])
        setBranch('')
        setEmail('')
        setPassword('')
        
      } catch (error) {
        console.log(error.message);
        
      }
    }

    useEffect(() => {
      const fetchAdmins = async () => {
        try {
          const response = await api.get('/admin/admins', {withCredentials:true})
          setAdmins(response.data)  
        } catch (error) {
          console.log(error.message);
          
        }
      }
      fetchAdmins()
    }, [])

    async function handleReset(id) {
      try {
        await api.put(`/admin/reset/${id}`, {withCredentials:true})
        setResetMessage(`Password reset to 'admin123' successfully`)
        setTimeout(() => setResetMessage(null),3000);
      } catch (error) {
        console.log(error.response);
        
      }
    }

     const mainAdLogout = async () => {
        try {
          await api.post('/admin/logout', {withCredentials: true});
        localStorage.clear();

   navigate('/admin/login', {replace: true})

        } catch (error) {
          console.log(error.message); 
        } 
      }

  return (
    <div className='main-admin'>
        <PagesHead/>
        <section className='admins-infn'>
            <button className={clicked === 'infn' ? 'none' : 'ad-infn-button'} onClick={() => setClicked('infn')}>Admins Information</button>
            {clicked === 'infn' && (
              <div className='admins-infn-li' >{resetMessage && <p className='success'>{resetMessage}</p>}
              <table>
                <thead>
                  <tr>
                    <td><bold>Branch</bold></td>
                    <td>Email</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.branch}</td>
                      <td>{admin.email}</td>
                      <td>
                        <button onClick={() => handleReset(admin.id)}>Reset Password</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
            
        </section>

        <section className='create-admin'>
             <button className={clicked === 'create' ? 'none' : 'cr-ad-button'} onClick={() => setClicked('create')}>Create New Admin Account</button>
       <form className={clicked === 'create' ? 'form' : 'none'} onSubmit={handleSubmit}>
        <input type="text" placeholder='Branch Name' value={branch} onChange={e => setBranch(e.target.value)}/><br />
        <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/><br />
        <input type="password" placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)} />
       {message === null ? '' : <p className={message === 'created' ? 'success' : 'error'}>{message}</p>}
       <br /> <button className='create-button'>Create</button>
       </form>
       <button className='main-ad-logout' onClick={mainAdLogout}>Log out</button>
        </section>
    </div>
  )
}

export default MainAd