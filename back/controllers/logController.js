const StatusCode = require('http-status-codes')
const connection = require('../model/db')
const bcrypt = require('bcrypt')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    const {phone, password} = req.body

   try {
     if(!phone || !password){
        return res.status(StatusCode.BAD_REQUEST).json({msg: 'All Fileds Are Required'})
    }

     const select = `SELECT id, password, firstName, lastName FROM users WHERE phone=?`
    const [user] = await connection.query(select, [phone])
    
    if(user.length === 0){
        return res.status(StatusCode.BAD_REQUEST).json({msg: 'invalid phone or password'})
    }
    
    const matchPass = await bcrypt.compare(password, user[0].password)
    if(!matchPass){
        return res.status(StatusCode.BAD_REQUEST).json({msg:'invalid phone or password'})
    }
    const userId = user[0].id
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token',token,({
        httpOnly: true,
        maxAge: 60*60*1000,
        secure: false
    }))
    return res.status(StatusCode.OK).json({msg:'logged in succesfully', token, user:{id: user[0].id, firstName: user[0].firstName, lastName: user[0].lastName}})
   } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({msg :error.message})
   }
   
}

const logout = (req, res) => {
try {
        res.clearCookie('token')
        return res.status(StatusCode.OK).json({msg:'logged out succesfully'})

} catch (error) {
    console.log(error);
    
}}

module.exports = {login, logout}