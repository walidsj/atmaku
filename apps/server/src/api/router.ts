import { Hono, HonoRequest } from 'hono'
import jabatan from '../constants/jabatan'
import prisma from '../lib/prisma'
import { z } from 'zod'
import { validator } from 'hono/validator'
import * as bcrypt from 'bcrypt'

const router = new Hono()

router.get('/', async (c) => {
   return c.json({ message: 'Hello Hono!' })
})

router.get('/kategori/jabatan', async (c) => {
   const data = Object.keys(jabatan).map((key) => {
      return {
         value: jabatan[key].value,
         label: jabatan[key].label,
      }
   })

   return c.json(data)
})

router.post(
   '/auth/register',
   validator('json', async (value, c) => {
      const parsed = await z
         .object({
            nama: z.string(),
            email: z
               .string()
               .email()
               .refine(async (email) => {
                  return !(await prisma.user.findUnique({
                     where: {
                        email,
                     },
                  }))
               }, 'Email sudah terdaftar'),
            password: z.string().min(8),
            jabatan: z.string().refine((val) => {
               return Object.keys(jabatan).includes(val)
            }),
            telepon: z
               .string()
               .min(9)
               .max(13)
               .refine(async (telepon) => {
                  return !(await prisma.user.findUnique({
                     where: {
                        telepon,
                     },
                  }))
               }, 'No. Handphone sudah terdaftar'),
         })
         .spa(value)
      if (!parsed.success) {
         return c.json(
            { success: false, errors: parsed.error.flatten().fieldErrors },
            422
         )
      }
      return parsed.data
   }),
   async (c) => {
      const body = c.req.valid('json')

      const user = await prisma.user.create({
         data: {
            nama: body.nama,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            jabatan: body.jabatan,
            telepon: body.telepon,
         },
      })

      return c.json({ success: true, message: 'Registrasi sukses', user })
   }
)

export default router
