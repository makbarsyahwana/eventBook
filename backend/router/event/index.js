const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/create', controller.create)
router.get('/get', controller.read)
router.post('/approval', controller.approval)

module.exports = router