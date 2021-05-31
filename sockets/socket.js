// for socket io
import { createServer } from 'http'
import { Server } from 'socket.io'

export const httpServer = createServer()

export const io = new Server(httpServer, {
 cors: {
  origin: 'https://whatsaap-clone-786e3.web.app',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['my-custom-header'],
 },
})
