import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import routes from './app'

const app = new Hono()

app.use('/api/*', cors())
app.route('/api', routes)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
   fetch: app.fetch,
   port,
})
