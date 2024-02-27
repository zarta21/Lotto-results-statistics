require('dotenv').config()
const mongoose = require('mongoose')
const vikingSchema = require("./models/vikingModel")

const connection1 = mongoose.createConnection(process.env.V_Lotto_DB_URL).on("error", (err) => {
    console.error(err.message);
});

module.exports = connection1.model("Viking", vikingSchema)
