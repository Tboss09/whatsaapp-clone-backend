//external routes
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { httpServer, io } from './sockets/socket.js'
//internal route
// external files
import {
 getAllGroups,
 getGroupBy_id,
 sendChatMessage,
 createNewGroup,
 getLastSentMessage,
} from './controllers/whatsapp.js'

const port = process.env.PORT || 5000
const app = express()
app.get('/', (req, res) => {
 console.log(req.body)
 res.send('wonderfullll')
})
// middlewares
app.use(express.json())
dotenv.config()
app.use(cors())
// middlewares

// Db Config
mongoose.connect(process.env.DATABASE_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
})
const db = mongoose.connection
db.on('open', () => {
 console.log('Database connected successfully')

 io.on('connection', socket => {
  console.log('A user just connected')
  socket.on('get_all_whatsapp_group', getAllGroups)
  socket.on('get_group_byks_id', args => getGroupBy_id(args))
  socket.on('send_chat_message', args => sendChatMessage(args,socket))
  socket.on('create_new_group', args => createNewGroup(args))
  socket.on('get_last_sent_message_foreach_group', getLastSentMessage)

 })
})
// Db Configuration

// Socket.io config
httpServer.listen(port, () => {
 console.log(`Port listening on port :${port}`)
})
