import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv-safe'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({
  path: join(__dirname, '../../.env')
})

export const appConfig = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  accessTokenPrivateKey: process.env.accessTokenPrivateKey,
  accessTokenPublicKey: process.env.accessTokenPublicKey,
  refreshTokenPrivateKey: process.env.refreshTokenPrivateKey,
  refreshTokenPublicKey: process.env.refreshTokenPublicKey,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 999
}
export const mongoURI =
  process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost:27017/pichak'
