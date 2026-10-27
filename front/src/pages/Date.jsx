
import React, { useState, useEffect } from 'react'
import '../css/date.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import api from '../utils/api'
import { fullDate, secondDay, thirdDay, fourthDay, fifthDay, sixthDay, date, today, days, dayName, monthName, year, secondDate, thirdDate, fourthDate, fifthDate, sixthDate } from './utils/Utils'

const MAX_SLOTS = {
  '02:30': 5,
  '03:00': 15,
  '04:00': 15,
  '05:00': 15,
  '06:00': 15,
  '07:00': 15,
  '08:00': 15,
  '09:00': 15,
  '10:00': 15,
}

const ALL_TIMES = ['02:30', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00']

function DateFun() {
  const navigate = useNavigate()
  const [appointmentDate, setAppDate] = useState(null)
  const [slotCounts, setSlotCounts] = useState({})
  const branch = localStorage.getItem('branch')

  // fetch slots whenever date changes
  useEffect(() => {
    if (!appointmentDate) return

    const fetchSlots = async () => {
      try {
        const response = await api.get('/user/slots', {
          params: { branch, date: appointmentDate }
        })
        setSlotCounts(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchSlots()
  }, [appointmentDate])

  function handleclick(time) {
    if (!appointmentDate) return
    if (slotCounts[time] >= MAX_SLOTS[time]) return //  block full slots

    localStorage.setItem('appDate', appointmentDate)
    localStorage.setItem('appTime', time)
    navigate('/checkappointment')
  }

  function slotLabel(time) {
    if (!appointmentDate) return 'Select date'
    if (slotCounts[time] === undefined) return 'Loading...'
    const available = MAX_SLOTS[time] - slotCounts[time]
    if (available <= 0) return 'full slot'
    return `${available} slots left`
  }


  function slotClass(time, activeClass, inactiveClass) {
    if (!appointmentDate) return inactiveClass
    if (slotCounts[time] >= MAX_SLOTS[time]) return 'slot-full'
    return activeClass
  }

  return (
    <div className='box-section'>
      <Header />
      <div className='date-box'>
        <h1>Select Date and Time</h1>
        <section className='calender'>
          <h2>{monthName + ' ' + year}</h2>

        </section>

        <section className='day-date'>
          <div className={appointmentDate === fullDate ? 'selected' : 'day-date-div'} onClick={() => setAppDate(fullDate)}>
            <p className='day'>{dayName}</p><p>{date}</p>
          </div>
          <div className={appointmentDate === secondDay ? 'selected' : 'day-date-div'} onClick={() => setAppDate(secondDay)}>
            <p className='day'>{days[(today.getDay() + 1) % 7]}</p><p>{secondDate.getDate()}</p>
          </div>
          <div className={appointmentDate === thirdDay ? 'selected' : 'day-date-div'} onClick={() => setAppDate(thirdDay)}>
            <p className='day'>{days[(today.getDay() + 2) % 7]}</p><p>{thirdDate.getDate()}</p>
          </div>
          <div className={appointmentDate === fourthDay ? 'selected' : 'day-date-div'} onClick={() => setAppDate(fourthDay)}>
            <p  className='day'>{days[(today.getDay() + 3) % 7]}</p><p>{fourthDate.getDate()}</p>
          </div>
          <div className={appointmentDate === fifthDay ? 'selected' : 'day-date-div'} onClick={() => setAppDate(fifthDay)}>
            <p className='day'>{days[(today.getDay() + 4) % 7]}</p><p>{fifthDate.getDate()}</p>
          </div>
          <div className={appointmentDate === sixthDay ? 'selected' : 'day-date-div'} onClick={() => setAppDate(sixthDay)}>
            <p className='day'>{days[(today.getDay() + 5) % 7]}</p><p>{sixthDate.getDate()}</p>
          </div>
        </section>

        <section className='morning'><h2>Morning</h2></section>
        <section className='morning-slots'>
          <div className={slotClass('02:30', 'morning-div', 'morning-slots-div')} onClick={() => handleclick('02:30')}>
            <p>02:30</p><p className='available-slots'>{slotLabel('02:30')}</p>
          </div>
          <div className={slotClass('03:00', 'morning-div', 'morning-slots-div')} onClick={() => handleclick('03:00')}>
            <p>03:00</p><p className='available-slots'>{slotLabel('03:00')}</p>
          </div>
          <div className={slotClass('04:00', 'morning-div', 'morning-slots-div')} onClick={() => handleclick('04:00')}>
            <p>04:00</p><p className='available-slots'>{slotLabel('04:00')}</p>
          </div>
          <div className={slotClass('05:00', 'morning-div', 'morning-slots-div')} onClick={() => handleclick('05:00')}>
            <p>05:00</p><p className='available-slots'>{slotLabel('05:00')}</p>
          </div>
        </section>

        <section className='afternoon'><h2>Afternoon</h2></section>
        <section className='afternoon-slots'>
          <div className={slotClass('06:00', 'afternoon-div', 'afternoon-slots-div')} onClick={() => handleclick('06:00')}>
            <p>06:00</p><p className='available-slots'>{slotLabel('06:00')}</p>
          </div>
          <div className={slotClass('07:00', 'afternoon-div', 'afternoon-slots-div')} onClick={() => handleclick('07:00')}>
            <p>07:00</p><p className='available-slots'>{slotLabel('07:00')}</p>
          </div>
          <div className={slotClass('08:00', 'afternoon-div', 'afternoon-slots-div')} onClick={() => handleclick('08:00')}>
            <p>08:00</p><p className='available-slots'>{slotLabel('08:00')}</p>
          </div>
          <div className={slotClass('09:00', 'afternoon-div', 'afternoon-slots-div')} onClick={() => handleclick('09:00')}>
            <p>09:00</p><p className='available-slots'>{slotLabel('09:00')}</p>
          </div>
          <div className={slotClass('10:00', 'afternoon-div', 'afternoon-slots-div')} onClick={() => handleclick('10:00')}>
            <p>10:00</p><p className='available-slots'>{slotLabel('10:00')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DateFun