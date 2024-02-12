import { Hono } from 'hono'
import jabatan from '../constants/jabatan'

const app = new Hono()

app.get('/jabatan', async (c) => {
   return c.json(jabatan)
})

export default app
