
import React, { useEffect, useState } from 'react'
import PagesHead from './PagesHead'
import AdSidebar from './AdSidebar'
import api from '../../utils/api'

function Appointments() {
const adminsBranch = JSON.parse(localStorage.getItem('adminsBranch'))
const [appointment, setAppointment] = useState([])

useEffect(() => {
  const fetchAppointments = async() => {
    try {
      const response = await api.get('/admin/getappointments', {withCredentials: true})
      setAppointment(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchAppointments()
}, [])

const updateStatus = async (id, status) => {
  try {
    await api.patch(`/admin/appointment/${id}/status`,{status})
   if(status === 'completed'){
    setAppointment(prev=> prev.filter(app => app.id !== id))
   }
    setAppointment(prev=> prev.map(app => app.id === id ? {...app, status} : app))
  } catch (error) {
    console.log(error.message);
    
  }
}

function statusColor(status){
  if(status === 'waiting') return {backgroundColor: 'red', color: 'white'}
   if (status === 'serving') return { backgroundColor: '#1E90FF', color: 'white' }
        if (status === 'completed') return { backgroundColor: '#28A745', color: 'white' }
}   

  return (
    <div> 
       <PagesHead/>
             <div className='ad-appointments'>
                 <div className='admin-sidebar'>
                     <AdSidebar />
                 </div>
                  <div className='appointments-box'>
           <h1>{adminsBranch} Branch Appointments</h1>
         {appointment.length === 0 ? (
               <p>No appointments for this branch.</p>
             ) :(<div>
                  <table>
                    <thead>
                      <tr>
                        <th>Queue No</th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                     {appointment.map((app)=>(
                       <tr key={app.id}>
                        <td>{app.queueNumber}</td>
                        <td>{app.name}</td>
                        <td>{app.service}</td>
                        <td>{app.date.split('T')[0]}</td>
                        <td>{new Date(`1970-01-01T${app.time}`).toLocaleTimeString([], {hour: '2-digit',minute:'2-digit' })}</td>
                        <td><span style={{...statusColor(app.status)}}className='status'>{app.status}</span></td>

                        <td>{new Date(app.createdAt).toLocaleString()}</td>
                                        <td>
                                    {app.status === 'waiting' && (
                                        <button onClick={() => updateStatus(app.id, 'serving')}
                                            className='serving-btn'>
                                            Serve
                                        </button>
                                    )}
                                    {app.status === 'serving' && (
                                        <button onClick={() => updateStatus(app.id, 'completed')} className='completed'>
                                            Complete
                                        </button>
                                    )}
                                </td>
                      </tr>
                     ))}
                    </tbody>
                  </table>
                   </div>
                  ) }
                  </div>
                 </div>
                
     </div>
  )
}

export default Appointments
