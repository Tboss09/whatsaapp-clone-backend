import express from 'express'
import { messagesForGroupChat,postGroupMessage } from '../controllers/controller.js'
const router = express.Router()

router.get('/:roomId', messagesForGroupChat)

router.post('/:roomId',postGroupMessage)

export default router