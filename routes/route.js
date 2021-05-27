import express from 'express'
import { createNewGroup, allGroupChat } from '../controllers/controller.js'
const router = express.Router()

router.get('/', allGroupChat)

router.post('/', createNewGroup)

export default router
