// for socket io
import { createServer } from 'http'
import { Server } from 'socket.io'

export const httpServer = createServer()

export const io = new Server(httpServer, {
 cors: {
  origin: '*',
  methods: ['GET', 'POST'],
 },
})
