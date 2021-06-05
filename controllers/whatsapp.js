import WhatsappChats from '../database/Schema.js'
import { io } from '../sockets/socket.js'

// get all the Groups

// Get all groups
export const getAllGroups = () => {
 WhatsappChats.find({})
  .sort({ updatedAt: -1 })
  .then(docs => {
   io.sockets.emit('get_data', docs)
  })
}

// FInd group by each id id and retrieve its message
export const getGroupBy_id = args => {
 const _id = args
 console.log(args)
 WhatsappChats.findById(_id, function (err, res) {
  err && console.log(err)
  if (res) {
   io.sockets.emit('get_group_with_id', res)
   console.log(res)
  }
 })
}

// send text message
export const sendChatMessage = (args, socket) => {
 const { email, message, _id, color} = args
 const chat = { email, message,color }
console.log(chat)

 WhatsappChats.findOneAndUpdate(
  { _id: _id },
  { $push: { user: chat } },
  { new: true },
  function (error, success) {
   if (success) {
    WhatsappChats.findById(_id)
     .select({ user: { $slice: -1 } })
     .exec((err, doc) => {
      io.emit('get_last_sent_text_message', doc.user)
      socket.broadcast.emit('notification_to_user', doc.user)
     })
   }
  }
 )

 // io.sockets.
}

// Create New Groupcd server
export const createNewGroup = args => {
 console.log(args)
 WhatsappChats.create(args, function (err, small) {
  if (small) {
   console.log(small)
   io.sockets.emit('newly_created_group', small)
  }
 })
}

// get last message sent
export const getLastSentMessage = () => {
 WhatsappChats.find(
  { user: { $exists: true, $ne: [] } },
  { user: { $slice: -1 } }
 )
  .then(data => io.sockets.emit('get_last_sent_message_foreach_group', data))
  .catch(err => console.log('Error found :', err))
}
