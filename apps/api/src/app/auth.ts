import { Hono } from 'hono'
import jabatan from '../constants/jabatan'
import prisma from '../lib/prisma'
import { z } from 'zod'
import { validator } from 'hono/validator'
import * as bcrypt from 'bcrypt'
import { jwt, sign } from 'hono/jwt'

const app = new Hono()

app.get(
   '/profil',
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

app.put(
   '/profil',
   jwt({
      secret: process.env.SECRET_KEY as string,
   }),
   validator('json', async (value, c) => {
      const payload = c.get('jwtPayload')
      const user = await prisma.user.findUnique({
         where: {
            id: payload.sub,
         },
      })

      if (!user) {
         return c.json({ message: 'User tidak ditemukan' }, 404)
      }

      const parsed = await z
         .object({
            nama: z.string(),
            jabatan: z.string().refine((val) => {
               return jabatan.find((j) => j.value === val)
            }),
            email: z
               .string()
               .email()
               .refine(async (email) => {
                  const existing = await prisma.user.findUnique({
                     where: {
                        email,
                     },
                  })

                  if (existing && existing.id !== user.id) {
                     return false
                  }

                  return true
               }, 'Email sudah terdaftar'),
            telepon: z
               .string()
               .min(9)
               .max(13)
               .refine(async (telepon) => {
                  const existing = await prisma.user.findUnique({
                     where: {
                        telepon,
                     },
                  })

                  if (existing && existing.id !== user.id) {
                     return false
                  }

                  return true
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
      const payload = c.get('jwtPayload')
      const existing = await prisma.user.findUnique({
         where: {
            id: payload.sub,
         },
      })

      if (!existing) {
         return c.json({ message: 'User tidak ditemukan' }, 404)
      }

      const body = c.req.valid('json')

      const user = await prisma.user.update({
         where: {
            id: existing.id,
         },
         data: {
            nama: body.nama,
            email: body.email,
            jabatan: body.jabatan,
            telepon: body.telepon,
         },
         select: {
            id: true,
            nama: true,
            email: true,
            jabatan: true,
            telepon: true,
         },
      })

      return c.json({ message: 'Profil berhasil diubah', user })
   }
)

app.post(
   '/login',
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

      const token = await sign({ sub: user.id, email: user.email }, process.env.SECRET_KEY as string)

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

app.post(
   '/register',
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

export default app
