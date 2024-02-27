const express = require('express')
const router = express.Router()
const {getVikingData, createVikingData} = require('../controllers/vikingControllers')

// GET ALL data:
router.get('/',getVikingData)

// POST a question:
router.post('/', createVikingData)

module.exports = router
