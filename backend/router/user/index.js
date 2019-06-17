const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/get', controller.get)

module.exports = router