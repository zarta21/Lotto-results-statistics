require('dotenv').config()
const mongoose = require('mongoose')
const eurojackpotSchema = require("./models/eurojackpotModel")

const connection4 = mongoose.createConnection(process.env.E_Lotto_DB_URL).on("error", (err) => {
    console.error(err.message);
});

// connection1.model("Product", ProductSchema)

module.exports = connection4.model("Eurojackpot", eurojackpotSchema)