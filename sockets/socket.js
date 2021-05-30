// for socket io
import { createServer } from 'http'
import { Server } from 'socket.io'

export const httpServer = createServer()

export const io = new Server(httpServer, {
 cors: {
  origin: 'https://whatsaap-clone-683bb.web.app/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['my-custom-header'],
  credentials: true,
 },
})
