const express = require('express')
const router = express.Router()
const {registration} = require('../controllers/controller')
const {login, logout} = require('../controllers/logController')
const middleWare = require('../middleWare/middleWare')
const {appointment, getAppointment, getSlots} = require('../controllers/appoiController')
const { checkSlots } = require('../controllers/adminCon')

router.post('/register', registration)
router.post('/login', login)
router.post('/appointment', middleWare , appointment)
router.get('/getappointments',middleWare, getAppointment)
router.get('/slots', middleWare, getSlots)
router.post('/logout', middleWare, logout)

module.exports = router