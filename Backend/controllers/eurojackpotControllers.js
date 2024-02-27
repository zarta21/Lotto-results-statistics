const Eurojackpot = require('../eurojackpotDb')

// GET ALL data
const getEurojackpotData = async (req, res) => {
    try {
        const eurojackpot = await Eurojackpot.find()
        res.status(200).json(eurojackpot)
    } catch (error) {
        res.status(400).json({ error: error.message})
        
    }
}

// create new data:
const createEurojackpotData = async (req, res) => {
    const newEurojackpot = new Eurojackpot(req.body)

    // add doc to db:
    try{
        const savedEurojackpot = await newEurojackpot.save()
        res.status(200).json(savedEurojackpot)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {getEurojackpotData, createEurojackpotData}
