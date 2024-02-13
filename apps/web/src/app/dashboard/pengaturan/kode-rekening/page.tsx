import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Rekening {
   kode: string
   uraian: string
}

export default function KodeRekening() {
   const fetcher = axios()
   const [searchParams, setSearchParams] = useSearchParams({
      level: '1',
      page: '1',
   })

   const rekening = useQuery({
      queryKey: [
         'rekening',
         {
            level: searchParams.get('level'),
            page: searchParams.get('page'),
            limit: searchParams.get('limit'),
         },
      ],
      queryFn: async () =>
         await fetcher.get('/common/rekening', {
            params: {
               level: searchParams.get('level'),
               page: searchParams.get('page'),
               limit: searchParams.get('limit'),
            },
         }),
   })

   return (
      <DashboardLayout
         title="Kode Rekening"
         description="Database kode rekening untuk pengelolaan keuangan BLUD sesuai dengan Permendagri 90/2019"
      >
         <Card>
            <CardContent className="p-5 space-y-3">
               <Select
                  value={searchParams.get('level') as string}
                  onValueChange={(value) =>
                     setSearchParams((prev) => ({
                        ...prev,
                        level: value,
                        page: '1',
                     }))
                  }
               >
                  <SelectTrigger className="w-96">
                     <SelectValue placeholder="Pilih Klasifikasi, Kodefikasi dan Nomenklatur Rekening" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectItem value="1">1. Akun</SelectItem>
                        <SelectItem value="2">2. Kelompok</SelectItem>
                        <SelectItem value="3">3. Jenis</SelectItem>
                        <SelectItem value="4">4. Objek</SelectItem>
                        <SelectItem value="5">5. Rincian Objek</SelectItem>
                        <SelectItem value="6">6. Sub Rincian Objek</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
               {rekening.data && (
                  <Fragment>
                     <Table className="border border-gray-200">
                        <TableHeader>
                           <TableRow>
                              <TableHead className="font-semibold w-[200px]">
                                 Kode
                              </TableHead>
                              <TableHead className="font-semibold">
                                 Uraian
                              </TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {rekening.data.data.data.map((item: Rekening) => (
                              <TableRow
                                 key={item.kode}
                                 className="border-dashed border-b border-gray-200"
                              >
                                 <TableCell className="font-medium">
                                    {item.kode}
                                 </TableCell>
                                 <TableCell>{item.uraian}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                     <div className="text-sm text-gray-500 text-right w-full flex justify-between">
                        <span>
                           Menampilkan {rekening.data.data.start} -{' '}
                           {rekening.data.data.end} dari{' '}
                           {rekening.data.data.totalFiltered &&
                              `${rekening.data.data.totalFiltered} terfilter.`}
                           {rekening.data.data.total} data.{' '}
                        </span>
                        <span>
                           Halaman {searchParams.get('page')} dari{' '}
                           {rekening.data.data.pages}
                        </span>
                     </div>
                     <Pagination>
                        <PaginationContent>
                           {parseInt(searchParams.get('page') as string) >
                              1 && (
                              <PaginationItem>
                                 <PaginationPrevious
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(
                                             parseInt(
                                                prev.get('page') as string
                                             ) - 1
                                          ),
                                       }))
                                    }
                                 />
                              </PaginationItem>
                           )}
                           {Array.from(
                              {
                                 length:
                                    parseInt(
                                       searchParams.get('page') as string
                                    ) > 2
                                       ? 2
                                       : parseInt(
                                            searchParams.get('page') as string
                                         ) - 1,
                              },
                              (_, i) => i + 1
                           ).map((page) => (
                              <PaginationItem key={page}>
                                 <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(
                                             parseInt(
                                                searchParams.get(
                                                   'page'
                                                ) as string
                                             ) > 2
                                                ? page +
                                                     parseInt(
                                                        searchParams.get(
                                                           'page'
                                                        ) as string
                                                     ) -
                                                     3
                                                : page
                                          ),
                                       }))
                                    }
                                 >
                                    {parseInt(
                                       searchParams.get('page') as string
                                    ) > 2
                                       ? page +
                                         parseInt(
                                            searchParams.get('page') as string
                                         ) -
                                         3
                                       : page}
                                 </PaginationLink>
                              </PaginationItem>
                           ))}
                           <PaginationLink isActive>
                              {searchParams.get('page')}
                           </PaginationLink>
                           {Array.from(
                              {
                                 length:
                                    rekening.data.data.pages -
                                       parseInt(
                                          searchParams.get('page') as string
                                       ) >=
                                    2
                                       ? 2
                                       : rekening.data.data.pages -
                                         parseInt(
                                            searchParams.get('page') as string
                                         ),
                              },
                              (_, i) => i + 1
                           ).map((page) => (
                              <PaginationItem key={page}>
                                 <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(
                                             page +
                                                parseInt(
                                                   searchParams.get(
                                                      'page'
                                                   ) as string
                                                )
                                          ),
                                       }))
                                    }
                                 >
                                    {page +
                                       parseInt(
                                          searchParams.get('page') as string
                                       )}
                                 </PaginationLink>
                              </PaginationItem>
                           ))}
                           {rekening.data.data.pages >
                              parseInt(searchParams.get('page') as string) && (
                              <PaginationItem>
                                 <PaginationNext
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(
                                             parseInt(
                                                prev.get('page') as string
                                             ) + 1
                                          ),
                                       }))
                                    }
                                 />
                              </PaginationItem>
                           )}
                        </PaginationContent>
                     </Pagination>
                  </Fragment>
               )}
            </CardContent>
         </Card>
      </DashboardLayout>
   )
}
