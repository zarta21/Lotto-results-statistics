const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eurojackpotSchema = new Schema({
    date: { type: String, required: true},
    numbers: { type: String, required: true},
    jack: { type: String, required: true},
    sumOfNumbers: { type: String, required: true}
}, { timestamps: true, writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  } })

  module.exports = eurojackpotSchema
