import { Hono } from 'hono'
import jabatan from '../constants/jabatan'
import prisma from '../lib/prisma'
import { z } from 'zod'
import { validator } from 'hono/validator'
import * as bcrypt from 'bcrypt'
import { jwt, sign } from 'hono/jwt'

const router = new Hono()

router.get('/', async (c) => {
   return c.json({ message: 'Hello Hono!' })
})

router.get('/kategori/jabatan', async (c) => {
   return c.json(jabatan)
})

router.get(
   '/auth/profile',
   jwt({
      secret: process.env.SECRET_KEY as string,
   }),
   async (c) => {
      const payload = c.get('jwtPayload')

      const user = await prisma.user.findUnique({
         where: {
            id: payload.sub,
         },
         select: {
            id: true,
            nama: true,
            email: true,
            jabatan: true,
            telepon: true,
         },
      })

      if (!user) {
         return c.json({ message: 'User tidak ditemukan' }, 404)
      }

      return c.json({ success: true, user })
   }
)

router.post(
   '/auth/login',
   validator('json', async (value, c) => {
      const parsed = await z
         .object({
            email: z.string().email(),
            password: z.string(),
         })
         .spa(value)
      if (!parsed.success) {
         return c.json(
            {
               message: 'Data yang diinput tidak valid',
               errors: parsed.error.flatten().fieldErrors,
            },
            422
         )
      }
      return parsed.data
   }),
   async (c) => {
      const body = c.req.valid('json')

      const user = await prisma.user.findUnique({
         where: {
            email: body.email,
         },
      })

      if (!user) {
         return c.json({ message: 'Email atau password salah' }, 422)
      }

      const match = bcrypt.compareSync(body.password, user.password)

      if (!match) {
         return c.json({ message: 'Email atau password salah' }, 422)
      }

      const token = await sign(
         { sub: user.id, email: user.email },
         process.env.SECRET_KEY as string
      )

      return c.json({
         message: `Login sukses`,
         token,
         user: {
            ...user,
            password: undefined,
         },
      })
   }
)

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
               return jabatan.find((j) => j.value === val)
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
            {
               message: 'Data yang diinput tidak valid',
               errors: parsed.error.flatten().fieldErrors,
            },
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

      return c.json({ message: 'Registrasi sukses', user })
   }
)

export default router
