require('dotenv').config()
const mongoose = require('mongoose')
const vikingSchema = require("./models/vikingModel")

const connection3 = mongoose.createConnection(process.env.V_Lotto_DB_URL).on("error", (err) => {
    console.error(err.message);
});

// connection1.model("Product", ProductSchema)

module.exports = connection3.model("Viking", vikingSchema)