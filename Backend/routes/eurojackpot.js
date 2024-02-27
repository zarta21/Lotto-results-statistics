const express = require('express')
const router = express.Router()
const {getEurojackpotData, createEurojackpotData} = require('../controllers/eurojackpotControllers')

// GET ALL data:
router.get('/',getEurojackpotData)

// POST a data:
router.post('/', createEurojackpotData)

module.exports = router
