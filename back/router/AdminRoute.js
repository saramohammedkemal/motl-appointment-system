const express = require('express')
const { adminLogin, adminRegister, adminMiddleWare, adminLogout, getAdmins, resetPassword } = require('../controllers/adminCon')
const {getAppointment, updateStatus, getDashboard} = require('../controllers/appoiController')
const adminRoute = express.Router()

adminRoute.post('/register', adminRegister)
adminRoute.post('/login', adminLogin)
adminRoute.get('/getappointments',adminMiddleWare, getAppointment)
adminRoute.patch('/appointment/:id/status', adminMiddleWare, updateStatus)
adminRoute.get('/dashboard', adminMiddleWare, getDashboard)
adminRoute.post('/logout', adminMiddleWare, adminLogout)
adminRoute.get('/admins', getAdmins)
adminRoute.put('/reset/:id', resetPassword)
module.exports = adminRoute