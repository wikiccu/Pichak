import express from 'express'
import morgan from 'morgan'
import compress from 'compression'
import cors from 'cors'
// import passport from 'passport';
import routes from '../api/routes/v1/index.js'
// import strategies from './passport';
// import error from '../api/middlewares/error';

/**
 * Express instance
 * @public
 */
const app = express()

app.use(morgan('dev'))

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/api/v1', routes)

app.all('*', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`)
  err.statusCode = 404
  next(err)
})

// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})
export default app
