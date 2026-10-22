// import React from 'react'
// import AdminLayout from '../../components/AdminLayout'
// import PagesHead from '../PagesHead'
// import AdSidebar from './AdSidebar'
// import { useNavigate } from 'react-router-dom'
// function Appointments() {

//     const navigate = useNavigate()

//     return (
//         <div>
//             <PagesHead />
//             <div className='ad-appointments'>
//                 <div>
//                     <AdSidebar />
//                 </div>
//                 <div className='appointments-box'>
//                     <div className='appointments'>
//                         <h2>Appointments</h2>
//                         <table>
//                             <tr>
//                                 <td>Queue No</td>
//                                 <td>Name</td>
//                                 <td>Service</td>
//                                 <td>Date</td>
//                                 <td>Time</td>
//                                 <td>Created at</td>
//                                 <td>Status</td>
//                                 <td>Action</td>
//                             </tr>
//                             <tr>
//                                 <td>Queue No</td>
//                                 <td>sara </td>
//                                 <td>Service</td>
//                                 <td>Date</td>
//                                 <td>Time</td>
//                                 <td>Status</td>
//                                 <td>Action</td>
//                             </tr>
//                         </table>

//                     </div>
//                 </div>
//             </div>
//         </div>)
// }

// export default Appointments

// import React, { useEffect, useState } from 'react'
// import api from '../../utils/api'

// function Appointments() {
//     const [appointments, setAppointments] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         fetchAppointments()
//     }, [])

//     const fetchAppointments = async () => {
//         try {
//             const response = await api.get('/admin/appointments')
//             setAppointments(response.data)
//             setLoading(false)
//         } catch (error) {
//             console.log(error.message)
//             setLoading(false)
//         }
//     }

//     const updateStatus = async (id, status) => {
//         try {
//             await api.patch(`/admin/appointment/${id}/status`, { status })
//             // update the status locally without refetching
//             setAppointments(prev =>
//                 prev.map(app => app.id === id ? { ...app, status } : app)
//             )
//         } catch (error) {
//             console.log(error.message)
//         }
//     }

    // function statusColor(status) {
    //     if (status === 'waiting') return { backgroundColor: '#FFA500', color: 'white' }
    //     if (status === 'serving') return { backgroundColor: '#1E90FF', color: 'white' }
    //     if (status === 'completed') return { backgroundColor: '#28A745', color: 'white' }
    // }

//     if (loading) return <p>Loading appointments...</p>

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Today's Appointments</h1>
//             {appointments.length === 0 ? (
//                 <p>No appointments for today.</p>
//             ) : (
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr style={{ backgroundColor: '#f4f4f4' }}>
//                             <th>Queue No</th>
//                             <th>Name</th>
//                             <th>Service</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Status</th>
//                             <th>Created At</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {appointments.map(app => (
//                             <tr key={app.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
//                                 <td>{app.queueNumber}</td>
//                                 <td>{app.name}</td>
//                                 <td>{app.service}</td>
//                                 <td>{app.date}</td>
//                                 <td>{app.time}</td>
//                                 <td>
//                                     <span style={{ ...statusColor(app.status), padding: '4px 10px', borderRadius: '20px' }}>
//                                         {app.status}
//                                     </span>
//                                 </td>
//                                 <td>{new Date(app.createdAt).toLocaleString()}</td>
//                                 <td>
//                                     {app.status === 'waiting' && (
//                                         <button onClick={() => updateStatus(app.id, 'serving')}
//                                             style={{ marginRight: '5px', backgroundColor: '#1E90FF', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
//                                             Serve
//                                         </button>
//                                     )}
//                                     {app.status === 'serving' && (
//                                         <button onClick={() => updateStatus(app.id, 'completed')}
//                                             style={{ backgroundColor: '#28A745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
//                                             Complete
//                                         </button>
//                                     )}
//                                     {app.status === 'completed' && (
//                                         <span style={{ color: 'green' }}>✔ Done</span>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     )
// }

// export default Appointments

import React, { useEffect, useState } from 'react'
import PagesHead from './PagesHead'
import AdSidebar from './AdSidebar'
import { date } from '../utils/Utils'
import api from '../../utils/api'

function Appointments() {

const userAppData = JSON.parse(localStorage.getItem('userAppData'))
const adminsBranch = JSON.parse(localStorage.getItem('adminsBranch'))
const [appointment, setAppointment] = useState([])
const [changeStatus, setChangeStatus] = useState('Waiting...')
// const [statusColor, setStatusColor] = useState(null)

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
           <h1>Today's Appointments</h1>
         {appointment.length === 0 ? (
               <p>No appointments for today.</p>
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
                        <td><span style={{...statusColor(app.status), padding: '4px 10px', borderRadius: '20px' }} className='status'>{app.status}</span></td>

                        <td>{new Date(app.createdAt).toLocaleString()}</td>
                                        <td>
                                    {app.status === 'waiting' && (
                                        <button onClick={() => updateStatus(app.id, 'serving')}
                                            style={{ marginRight: '5px', backgroundColor: '#1E90FF', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                                            Serve
                                        </button>
                                    )}
                                    {app.status === 'serving' && (
                                        <button onClick={() => updateStatus(app.id, 'completed')}
                                            style={{ backgroundColor: '#28A745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                                            Complete
                                        </button>
                                    )}
                                    {app.status === 'completed' && (
                                        <span style={{ color: 'green' }}>✔ Done</span>
                                    )}
                                </td>
                      </tr>
                     ))}
                    </tbody>
                  </table>
                   </div>) }
                  </div>
                 </div>
                
     </div>
  )
}

export default Appointments
