import express, { Request, Response } from 'express'
import config from './config'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import db from './database/index'
import route from './routes'

// connect with db
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})

// variable server
const app = express()
const port = config.port || 3000

// htpp request middleware
app.use(morgan('common'))

// meddleware to pass incoming request
app.use(express.json())

// security
app.use(helmet())

// user route
app.use('/api', route)

// limited request
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
)

// route not found
app.use('/a', (_req, res) => {
  res.status(404).json({ message: 'ooh this request not found' })
})

//just normal get request for the server
app.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "'ooh this request not found'"
  })
})
//here the server is listening on the post to check it's running
app.listen(port, () => {
  console.log(`Server is runing at ${port}`)
})

export default app
