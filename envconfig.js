import { resolve } from 'path'
import { existsSync } from 'fs'

const env = process.env.NODE_ENV

const envPath = resolve(process.cwd(), `.env.${env}`)
const defaultEnvPath = resolve(process.cwd(), '.env')

require('dotenv').config({
  path: existsSync(envPath) ? envPath : defaultEnvPath
})
