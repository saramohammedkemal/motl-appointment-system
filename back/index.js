require('dotenv').config()

const express = require('express')
const router = require('./router/router')
const cookieParser = require('cookie-parser')
const adminRoute = require('./router/AdminRoute')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))
app.use('/user',router)
app.use('/admin',adminRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server running on port${process.env.PORT}`);
})