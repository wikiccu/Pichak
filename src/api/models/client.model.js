import mongoose from 'mongoose'

const roles = ['admin', 'client']

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'نام'
  },
  family: {
    type: String,
    default: 'کاربر'
  },
  mobile: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'client'
  },
  approve: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
})

clientSchema.index({ mobile: 1 }, { unique: true })
clientSchema.index({ role: 1 })
clientSchema.index({ approve: 1 })

const Client = mongoose.model('Client', clientSchema)

export default Client
