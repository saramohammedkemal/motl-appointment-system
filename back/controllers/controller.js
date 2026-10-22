const connection =require('../model/db')
const bcrypt = require('bcrypt')
const statusCode = require('http-status-codes')

const checkSlots = async (req, res) => {
    try {
        const { branch, date, time } = req.query
        const MAX_SLOTS = 5 

        const query = `SELECT COUNT(*) AS booked FROM appointment WHERE branch=? AND date=? AND time=?`
        const [result] = await connection.query(query, [branch, date, time])

        const booked = result[0].booked
        const available = MAX_SLOTS - booked

        return res.status(200).json({ available, isFull: available <= 0 })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const registration = async (req, res) => {
       const {firstName, lastName, phone, password}= req.body
    
    try {
      if(!firstName || !lastName || !phone || !password){
        return res.status(statusCode.BAD_REQUEST).json('all fields are required')
      }

        const select =`SELECT phone from users WHERE phone=?`
        const user = await connection.query(select, [ phone])

        if(user[0].length > 0 ){
            res.status(statusCode.BAD_REQUEST).json('User Already Existed')
        }

    const insert = `INSERT INTO users(firstName, lastName,phone, password) VALUES(?,?,?,?)`

    const hashPassword = await bcrypt.hash(password, 10) 
    await connection.query(insert, [firstName, lastName, phone, hashPassword])
    return res.status(statusCode.OK).json("successfully registerd")
 

    } catch (error) {
         console.log(error)
   res.status(500).json({
      message: error.message
   })
    }
}


module.exports = {registration}
