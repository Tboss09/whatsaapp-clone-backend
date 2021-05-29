import WhatsappChats from '../database/Schema.js'
import { io } from '../sockets/socket.js'

// get all the Groups

// Get all groups
export const getAllGroups = () => {
 WhatsappChats.find({}).then(docs => {
  io.sockets.emit('get_data', docs)
 })
}
// FInd group by each id and retrieve its message
export const getGroupBy_id = args => {
 const _id = args

 WhatsappChats.findById(_id, function (err, res) {
  err ? console.log(err) : io.sockets.emit('get_group_with_id', res)
 })
}

// send text message
export const sendChatMessage = args => {
 console.log(args)
 // io.sockets.
}
