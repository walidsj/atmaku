import { Hono } from 'hono'
import auth from './auth'
import common from './common'

const app = new Hono()

app.route('/auth', auth)
app.route('/common', common)

export default app
