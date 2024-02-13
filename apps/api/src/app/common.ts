import { Hono } from 'hono'
import jabatan from '../constants/jabatan'
import rekeningLevel1 from '../data/rekening/level-1.json'
import rekeningLevel2 from '../data/rekening/level-2.json'
import rekeningLevel3 from '../data/rekening/level-3.json'
import rekeningLevel4 from '../data/rekening/level-4.json'
import rekeningLevel5 from '../data/rekening/level-5.json'
import rekeningLevel6 from '../data/rekening/level-6.json'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

/**
 * @api {get} /common/jabatan Get Jabatan
 */

app.get('/jabatan', async (c) => {
   return c.json(jabatan)
})

/**
 * @api {get} /common/rekening Get Rekening
 */

const rekeningSchema = z.object({
   level: z.string().refine((val) => {
      return ['1', '2', '3', '4', '5', '6'].includes(val)
   }),
   limit: z.string().optional(),
   page: z.string().optional(),
   q: z.string().optional(),
   kode: z.string().optional(),
})

interface Rekening {
   kode: string
   uraian: string
}

interface LevelsData {
   [key: string]: Rekening[]
}

app.get(
   '/rekening',
   zValidator('query', rekeningSchema, (result, c) => {
      if (!result.success) {
         return c.json(
            {
               message: 'Data yang diinput tidak valid',
               errors: result.error.flatten().fieldErrors,
            },
            422
         )
      }
   }),
   async (c) => {
      const level = c.req.query('level')
      const limit = c.req.query('limit')
      const page = c.req.query('page')
      const q = c.req.query('q')
      const kode = c.req.query('kode')

      const levelsData: LevelsData = {
         '1': rekeningLevel1,
         '2': rekeningLevel2,
         '3': rekeningLevel3,
         '4': rekeningLevel4,
         '5': rekeningLevel5,
         '6': rekeningLevel6,
      }

      if (level && level in levelsData) {
         const levelData = levelsData[level]

         let filteredData = levelData

         if (kode) {
            filteredData = filteredData.filter((value) => {
               return value.kode.startsWith(kode)
            })
         }

         if (q) {
            filteredData = filteredData.filter((value) => {
               const regex = new RegExp(q, 'i')
               return regex.test(value.uraian)
            })
         }

         const pages = Math.ceil(
            filteredData.length / (limit ? parseInt(limit) : 10)
         )

         const slicedData = filteredData.slice(
            page
               ? limit
                  ? (parseInt(page) - 1) * parseInt(limit)
                  : (parseInt(page) - 1) * 10
               : 0,
            page
               ? limit
                  ? (parseInt(page) - 1) * parseInt(limit) + parseInt(limit)
                  : (parseInt(page) - 1) * 10 + 10
               : 0
         )

         return c.json({
            data: slicedData,
            start: page
               ? limit
                  ? (parseInt(page) - 1) * parseInt(limit) + 1
                  : (parseInt(page) - 1) * 10 + 1
               : 0 + 1,
            end: page
               ? limit
                  ? (parseInt(page) - 1) * parseInt(limit) + parseInt(limit)
                  : (parseInt(page) - 1) * 10 + 10
               : 0 + 1,
            total: levelData.length,
            totalFiltered:
               levelData.length == filteredData.length
                  ? null
                  : filteredData.length,
            nextPage: page
               ? pages > parseInt(page)
                  ? parseInt(page) + 1
                  : null
               : null,
            prevPage: page
               ? parseInt(page) > 1
                  ? parseInt(page) - 1
                  : null
               : null,
            pages,
         })
      }
   }
)

export default app
