const express = require('express')
const app = express()
const checkTokenMiddleware = require('./config/checkToken')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
require('./config/database')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/users', require('./routes/api/users'))

app.get('/home', checkTokenMiddleware , (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
