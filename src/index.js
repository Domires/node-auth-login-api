const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

const PORT = 3001
app.set('port', PORT)
app.listen(app.get('port'), console.log(`Server running on port ${PORT}...`))
