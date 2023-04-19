import mongoose from 'mongoose'
import { mongoURI } from './variables.js'

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const connectMongoDB = async () => {
  await mongoose.connect(mongoURI)
  console.log('MongoDB is ready ... ')
  return mongoose.connection
}
