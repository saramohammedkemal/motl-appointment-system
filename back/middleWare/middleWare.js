const jwt = require('jsonwebtoken')
const connection = require('../model/db')
const statusCode = require('http-status-codes')

const middleWare = async(req,res,next)=>{

   const token = req.cookies['token']

   if(!token){
      return res.json('Login First')
   }
   

   jwt.verify(token, process.env.SECRET_KEY,
   async(error,decoded)=>{

      if(error){
         return res.json('token error')
      }

      req.userId = decoded.userId
      console.log(req.userId);
      

      next()
   })
}

module.exports = middleWare