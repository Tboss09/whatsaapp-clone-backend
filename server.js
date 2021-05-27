//external route
import express from 'express'

import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//internal route
import route from './routes/route.js'
import getMessageroute from './routes/groupMessage.js'

const port = process.env.PORT || 5000
const app = express()


app.use(cors())
app.use(express.json())
dotenv.config()


app.use('/', route)
app.use('/', getMessageroute)

// Db Config
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify :false
})
const db = mongoose.connection

db.on('open', () => {
  console.log('Database connected successfully');
})

app.listen(port, () => {
  console.log(`Port listening on port :${port}`)
})
