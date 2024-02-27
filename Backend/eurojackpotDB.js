require('dotenv').config()
const mongoose = require('mongoose')
const eurojackpotSchema = require("./models/eurojackpotModel")

const connection2 = mongoose.createConnection(process.env.E_Lotto_DB_URL).on("error", (err) => {
    console.error(err.message);
});

module.exports = connection2.model("Eurojackpot", eurojackpotSchema)
