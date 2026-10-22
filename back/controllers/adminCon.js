const { StatusCodes } = require('http-status-codes')
const connection = require('../model/db')
const bcrypt = require('bcrypt')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

const adminRegister = async(req, res)=>{
   try {
     const {email, password, branch} =req.body
     if(!email || !password || !branch)
        return res.status(StatusCodes.BAD_REQUEST).json('All Fields are Required')
    const hashPassword = await bcrypt.hash(password, 10)
    const insert = `INSERT INTO admin (email, password, branch) VALUES(?,?,?)`
    await connection.query(insert,[email, hashPassword, branch])
    res.status(StatusCodes.OK).json('registered')
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
   }
}

const getAdmins = async(req, res) => {
    try {
        const query = `SELECT id, branch, email FROM admin`
        const [admins] = await connection.query(query)
        return res.status(StatusCodes.OK).json(admins)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

const resetPassword = async (req, res) =>{
    try {
        const {id} = req.params
        const newPass = 'admin123'
        const hashPassword = await bcrypt.hash(newPass, 10)
        const query = `UPDATE admin SET password=? WHERE id=? `
        await connection.query(query, [hashPassword,id])
        return res.status(StatusCodes.OK).json({msg: 'password reset to admin123'})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

const adminLogin = async(req, res) =>{
   try {
     const {email, password} = req.body
    if(!email || !password)
        return res.status(StatusCodes.BAD_REQUEST).json('All Fields are Required')
    const select = `SELECT id, email, password, branch, role FROM admin WHERE email=?`
    const [user] = await connection.query(select, [email])
    if(user.length === 0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'wrong email or password'})
    }

    const matchPass = await bcrypt.compare(password, user[0].password)
    if(!matchPass){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'wrong email or password'})
   }

  
    const userId = user[0].id
    const branch = user[0].branch
    
    const adToken = jwt.sign({userId, branch}, process.env.SECRET_KEY, {expiresIn: '1h'})

    res.cookie('adToken',adToken,({
        httpOnly: true,
        maxAge: 60*60*1000,
        secure:false
    }))
    
    return res.status(StatusCodes.OK).json({msg:'logged in succesfully', branch:branch, role:user[0].role})

   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    console.log(error);
    
   }

}



const adminMiddleWare = async(req, res, next)=> {
    const adToken = req.cookies['adToken']
    if(!adToken)
        return res.status(StatusCodes.BAD_REQUEST).json('login first')
    const verifiedToken = jwt.verify(adToken, process.env.SECRET_KEY)
     
    if(!verifiedToken)
        return res.status(StatusCodes.BAD_REQUEST).json('token error')

    req.userId = verifiedToken.userId
    req.branch = verifiedToken.branch
    next()
}

const adminLogout = (req, res) => {
try {
    res.clearCookie('adToken')
    return res.status(StatusCodes.OK).json({msg:'Logged out succesfully'})
} catch (error) {
    console.log(error);
}}


module.exports = {adminRegister, adminLogin, adminMiddleWare, adminLogout, getAdmins, resetPassword}