// for socket io
import { createServer } from 'http'
import { Server } from 'socket.io'

export const httpServer = createServer()

export const io = new Server(httpServer, {
 cors: {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['my-custom-header'],
  credentials: true,
 },
})
