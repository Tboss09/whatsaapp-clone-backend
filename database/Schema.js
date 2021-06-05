import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
 email: String,
 message: String,
 color :String,
 date: { type: String, default: Date },
},{timestamps:true})

const GroupChatSchema = mongoose.Schema({
    name: String,
 user: [userSchema],
 date: { type: String, default: Date },
},{timestamps:true})

const WhatsappDatabase = mongoose.model('GroupChat', GroupChatSchema)

export default WhatsappDatabase
