require('dotenv').config()
const express = require('express')
const vikingRoute = require('./routes/viking')
const eurojackpotRoute = require('./routes/eurojackpot')
const cors = require('cors')

const app = express()

app.listen(process.env.PORT || 5500, () => {
    console.info(`Listening on port ${process.env.PORT}...`);
}).on("error", (err) => {
    console.error(err.message);
});



app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}

app.use(ignoreFavicon)

app.use('/viking', vikingRoute)
app.use('/eurojackpot', eurojackpotRoute)


