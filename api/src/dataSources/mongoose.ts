import { connect, connection } from 'mongoose'
import winston from 'winston'

export const mongoose = {
  run: async () => {
    try {
      const uri = String(process.env.MONGODB_URL)
      const db = await connect(uri)
      console.log(`MongoDB connected: ${db.connection.host}`)
      winston.info(`MongoDB connected: ${db.connection.host}`)
      return db
    } catch (error) {
      winston.error(error)
    }
  },

  stop: async () => {
    try {
      return await connection.destroy()
    } catch (error) {
      winston.error(error)
    }
  }
}
