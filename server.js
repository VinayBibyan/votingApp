const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config()
const {jwtAuthMiddleware} = require('./jwt')

const bodyParser = require('body-parser');
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World voting app')
})

const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
const voteRoutes = require('./routes/voteRoutes')


app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);
app.use('/vote', voteRoutes);

app.listen(3000)