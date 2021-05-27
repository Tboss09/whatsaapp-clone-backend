import GroupChat from '../database/Schema.js'

export const allGroupChat = (req, res) => {
 GroupChat.find()
  .then(chats => {
   res.status(200).json({ chats })
  })
  .catch(err => console.log(err))
}

export const createNewGroup = (req, res) => {
 const { name, user } = req.body
 const newGroup = new GroupChat({
  user,
  name,
 })

 newGroup
  .save()
  .then(() =>
   res.status(201).json({ success: true, msg: 'Successfully added' })
  )
  .catch(err => {
   res.status(500).json({ success: false, Error: err })
  })
}

export const messagesForGroupChat = (req, res) => {
 const { roomId } = req.params
 GroupChat.findById(`${roomId}`)
  .then(data => res.status(201).json(data))
  .catch(err => res.status(404).json({ success: false, msg: err.message }))
}

export const postGroupMessage = (req, res) => {

 const { roomId } = req.params
 const { name, message } = req.body

 GroupChat.findByIdAndUpdate(
  roomId,
  { $push: { user: { message, name } } },
  { safe: true, upsert: true, new: true },
  function (err, model) {
   if (err) {
    res.status(404).send(err)
   } else {
    res.status(200).json({model})
   }
  }
 )
}
