//external routes
import express from 'express'
// for socket io
import { Server } from 'socket.io'
import { createServer } from 'http'
// for socket io
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//internal route
import route from './routes/route.js'
import getMessageroute from './routes/groupMessage.js'

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())
// internal
app.use('/', getMessageroute)

// Db Config
mongoose.connect(process.env.DATABASE_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
})
const db = mongoose.connection
db.on('open', () => {
 console.log('Database connected successfully')
})
// Db Config

const httpServer = createServer()

const io = new Server(httpServer, {
 cors: {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['my-custom-header'],
  credentials: true,
 },
})

io.on('connection',socket =>{
    socket.on('chat message',msg =>{
        console.log(msg)
    })
})

httpServer.listen(port, () => {
 console.log(`Port listening on port :${port}`)
})
