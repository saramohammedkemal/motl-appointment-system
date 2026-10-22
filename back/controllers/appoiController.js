const { StatusCodes } = require('http-status-codes')
const connection = require('../model/db')

const appointment = async (req, res) =>{
   try {
     const {service, branch, date, time, appointmentFor}= req.body
    const userId = req.userId
    if(!service || !branch || !date || !time){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'All Fields Are Required'})
    }

            // fix date
            const cleanDate = date.replace(/\s+/g, '') // removes all spaces → "2026-07-07"
            const [year, month, day] = cleanDate.split('-')
            const fixedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            console.log(fixedDate);


//  fix time manually
const fixTime = (time) => {
    const [timePart, period] = time.split(/(AM|PM)/)
    let [hours, minutes] = timePart.split(':')
    hours = parseInt(hours)

    if (period === 'AM' && hours === 12) hours = 0
    if (period === 'PM' && hours !== 12) hours += 12

    return `${String(hours).padStart(2, '0')}:${minutes}:00`
}

const fixedTime = fixTime(time)
    const select = `SELECT MAX(queueNumber) AS lastQueue FROM appointment WHERE branch=? AND date=?`
    const [result] = await connection.query(select, [branch, fixedDate])

    const queueNumber = (result[0].lastQueue || 0) + 1

    const insert = `INSERT INTO appointment (userId, service, branch, date, time, queueNumber, appointmentFor) VALUES(?,?,?,?,?,?,?)`
    await connection.query(insert,[userId,service, branch, fixedDate, fixedTime, queueNumber, appointmentFor || null])
    
    const checkQuery = `SELECT date FROM appointment ORDER BY id DESC LIMIT 3;`
    const selectApp =`SELECT status, createdAt FROM appointment WHERE userId=?`
    const [appointment] = await connection.query(selectApp, [userId])
    const createdAt = appointment[0].createdAt
    
     const status = appointment[0].status
     console.log(status);
     
     
    return res.status(StatusCodes.OK).json({msg:'completed', queueNumber:queueNumber, branch:branch, service: service, date: fixedDate, time:fixedTime, createdAt: createdAt, status: status})
     
    
   } catch (error) {
    console.log(error);
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    
   }
}

const getAppointment = async(req, res) => {
   try {
     const branch = req.branch     
    const select = `SELECT a.id, a.service, a.branch, a.date, a.time, a.queueNumber, a.status, a.createdAt,  CASE WHEN a.appointmentFor IS NOT NULL THEN a.appointmentFor ELSE CONCAT(u.firstName, ' ', u.lastName) END AS name FROM appointment a JOIN users u ON a.userId=u.id WHERE a.branch=? AND a.status != 'completed' ORDER BY a.date ASC, a.queueNumber ASC`
    const [appInfn] = await connection.query(select, [branch])
    return res.status(StatusCodes.OK).json(appInfn)
   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
   }
    

}

const getSlots = async (req, res) => {
  try {
    const { branch, date } = req.query
    const ALL_TIMES = ['02:30', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00']

    const counts = {}
    for (const time of ALL_TIMES) {
      const query = `SELECT COUNT(*) AS booked FROM appointment WHERE branch=? AND date=? AND time=?`
      const [result] = await connection.query(query, [branch, date, `${time}:00`])
      counts[time] = result[0].booked
    }
    return res.status(200).json(counts)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const updateStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body

        const allowed = ['waiting', 'serving', 'completed']
        if(!allowed.includes(status)){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Invalid status'})
        }

        const query = `UPDATE appointment SET status=? WHERE id=?`
        await connection.query(query, [status, id])

        return res.status(StatusCodes.OK).json({msg: 'status updated'})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}
const getDashboard = async (req, res) => {
    try {
        const branch = req.branch
        const today = new Date().toISOString().split('T')[0]

        const query = `
            SELECT 
                COUNT(*) AS total,
                SUM(CASE WHEN DATE(date) = ? THEN 1 ELSE 0 END) AS todayTotal,
                SUM(CASE WHEN status = 'waiting' AND DATE(date) = ? THEN 1 ELSE 0 END) AS waiting,
                SUM(CASE WHEN status = 'completed' AND DATE(date) = ? THEN 1 ELSE 0 END) AS completed
            FROM appointment
            WHERE branch = ?
        `
        const [result] = await connection.query(query, [today, today, today, branch])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}


module.exports = {appointment, getAppointment, updateStatus, getSlots, getDashboard}