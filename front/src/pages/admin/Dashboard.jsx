import React, { useEffect, useState } from 'react'
import PagesHead from './PagesHead'
import AdSidebar from './AdSidebar'
import api from '../../utils/api'

function Dashboard() {
    const [stats, setStats] = useState({
        total:0,
        todayTotal:0,
        waiting:0,
        completed:0
    })

    const fetchstats = async ()=>{
        try {
            const response = await api.get('/admin/dashboard', {withCredentials:true})
            setStats(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchstats()
        const interval = setInterval(() => {
            
        }, (fetchstats, 10000));
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <PagesHead />
            <div className='ad-appointments'>

                <div className='admin-sidebar'>
                    <AdSidebar />
                </div>

                <div className='dashboard-box'>
                    
                     <div className='green dashboard-row'>
                        <span className='label'>Completed </span>
                        <span className='line'></span> 
                        <span className='value'>{stats.completed}</span>
                     </div>
                     <div className='blue dashboard-row'>
                        <span className='label'>Today's Appointments </span>
                        <span className='line'></span> 
                        <span className='value'>{stats.todayTotal} </span>
                     </div>
                     <div className='red dashboard-row'>
                        <span className='label'>Waiting </span>
                        <span className='line'></span> 
                        <span className='value'>{stats.waiting}</span>
                     </div>
                      <div className='blue dashboard-row'>
                        <span className='label'>Total Appointments </span>
                        <span className='line'></span> 
                        <span className='value'>{stats.total} </span>
                     </div>
                       
                </div>
            </div>
        </div>
    )
}

export default Dashboard