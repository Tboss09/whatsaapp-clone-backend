import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
 name: String,
 message: String,
 date: { type: String, default: Date },
})

const GroupChatSchema = mongoose.Schema({
 name: String,
 user: [userSchema],
 date: { type: String, default: Date },
})

const WhatsappDatabase = mongoose.model('GroupChat', GroupChatSchema)

export default WhatsappDatabase
