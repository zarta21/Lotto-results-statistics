const Viking = require('../vikingLottoDb')

// GET ALL data
const getVikingData = async (req, res) => {
    try {
        const viking = await Viking.find()
        res.status(200).json(viking)
    } catch (error) {
        res.status(400).json({ error: error.message})
        
    }
}

// create new data:
const createVikingData = async (req, res) => {
    const newViking = new Viking(req.body)

    // add doc to db:
    try{
        const savedViking = await newViking.save()
        res.status(200).json(savedViking)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {getVikingData, createVikingData}
