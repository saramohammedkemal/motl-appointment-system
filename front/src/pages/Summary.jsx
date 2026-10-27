import React from 'react'
import '../css/summary.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'
function Summary() {
    const appointmentFor = localStorage.getItem('appointmentFor')
    const navigate = useNavigate()
    const appointmentForOther = localStorage.getItem('appointmentForOther')
    const user = localStorage.getItem('user')
    const branch = localStorage.getItem('branch')
    const brCode = localStorage.getItem('brCode')
    const service = localStorage.getItem('service')
    const date = localStorage.getItem('appDate')
    const time = localStorage.getItem('appTime')
    const token = localStorage.getItem('token')

    async function confirm() {

        try {
            const response = await api.post('/user/appointment', {
                service: service,
                branch: branch,
                date: date,
                time: time,
                appointmentFor: appointmentForOther || null

            }, {
                headers: token
            })
            localStorage.setItem('createdAt', JSON.stringify(response.data.createdAt))
            localStorage.setItem('selectedBranch', JSON.stringify(response.data.branch))
            localStorage.setItem('queueNumber', JSON.stringify(response.data.queueNumber))
            const queueNumber = JSON.parse(localStorage.getItem('queueNumber'))
            const queue = `${brCode} - ${queueNumber}`
            localStorage.setItem('queue', queue)
            localStorage.setItem('userAppData', JSON.stringify(response.data))

            navigate('/queue')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='box-section'>
            <Header />
            <div className='booking-summary'>
                <h1>Booking Summary</h1>

                {appointmentFor === 'for-other-appointment' ?
                    <section>
                        <section className='sections'>
                            <p className='title'>Appointment For</p>
                            <h5>{appointmentForOther}</h5>
                        </section><hr />
                        <section className='sections'>
                            <p className='title'>Booking Owner</p>
                            <h5>{user}</h5>
                        </section><hr />
                    </section> : <section>
                        <section className='sections'>
                            <p className='title'>Full Name</p>
                            <h5>{user}</h5>
                        </section><hr />
                    </section>}

                <section className='booked-branch sections'>
                    <p className='title'>Branch</p>
                    <h5>{branch}</h5>
                </section><hr />
                <section className='service sections'>
                    <p className='title'>Service</p>
                    <h5>{service}</h5>
                </section><hr />
                <section className='booked-date sections'>
                    <p className='title'>Booking Date</p>
                    <h5>{date}</h5>
                </section><hr />
                <section className='booked-time sections'>
                    <p className='title'>Booking Time</p>
                    <h5>{time}</h5>

                </section><hr />

                <section>
                    <button onClick={() => navigate('/')}>Cancel</button>
                    <button onClick={confirm}>Confirm</button>
                </section>
            </div>
        </div>
    )
}

export default Summary