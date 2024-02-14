import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from '@/lib/axios'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'

interface Rekening {
   kode: string
   uraian: string
}

export default function KodeRekening() {
   const fetcher = axios()
   const [searchParams, setSearchParams] = useSearchParams({
      level: '1',
      page: '1',
      limit: '10',
      q: '',
      kode: '',
   })

   const rekening = useQuery({
      queryKey: [
         'rekening',
         {
            level: searchParams.get('level'),
            page: searchParams.get('page'),
            limit: searchParams.get('limit'),
            q: searchParams.get('q'),
            kode: searchParams.get('kode'),
         },
      ],
      queryFn: async () =>
         await fetcher.get('/common/rekening', {
            params: {
               level: searchParams.get('level'),
               page: searchParams.get('page'),
               limit: searchParams.get('limit'),
               q: searchParams.get('q'),
               kode: searchParams.get('kode'),
            },
         }),
      placeholderData: keepPreviousData,
   })

   return (
      <DashboardLayout
         title="Kode Rekening"
         description="Database kode rekening untuk pengelolaan keuangan BLUD sesuai dengan Permendagri 90/2019"
      >
         <Card>
            <CardContent className="p-5 space-y-3">
               <div className="flex space-x-3">
                  <Select
                     value={searchParams.get('limit') as string}
                     onValueChange={(value) =>
                        setSearchParams((prev) => ({
                           ...prev,
                           level: prev.get('level') as string,
                           page: '1',
                           limit: value,
                           q: prev.get('q') as string,
                           kode: prev.get('kode') as string,
                        }))
                     }
                  >
                     <SelectTrigger className="w-20">
                        <SelectValue placeholder="Tampilkan" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectItem value="5">5</SelectItem>
                           <SelectItem value="10">10</SelectItem>
                           <SelectItem value="25">25</SelectItem>
                           <SelectItem value="50">25</SelectItem>
                           <SelectItem value="75">75</SelectItem>
                           <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <Select
                     value={searchParams.get('level') as string}
                     onValueChange={(value) =>
                        setSearchParams((prev) => ({
                           ...prev,
                           level: value,
                           page: '1',
                           limit: prev.get('limit') as string,
                           q: prev.get('q') as string,
                           kode: prev.get('kode') as string,
                        }))
                     }
                  >
                     <SelectTrigger className="w-52">
                        <SelectValue placeholder="Pilih Klasifikasi, Kodefikasi dan Nomenklatur Rekening" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectItem value="1">Akun</SelectItem>
                           <SelectItem value="2">Kelompok</SelectItem>
                           <SelectItem value="3">Jenis</SelectItem>
                           <SelectItem value="4">Objek</SelectItem>
                           <SelectItem value="5">Rincian Objek</SelectItem>
                           <SelectItem value="6">Sub Rincian Objek</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  <Input
                     className="w-48"
                     placeholder="Cari kode rekening.."
                     value={searchParams.get('kode') as string}
                     onChange={(e) =>
                        setSearchParams((prev) => ({
                           ...prev,
                           level: prev.get('level') as string,
                           page: '1',
                           limit: prev.get('limit') as string,
                           q: prev.get('q') as string,
                           kode: e.target.value,
                        }))
                     }
                  />
                  <Input
                     className="w-72"
                     placeholder="Cari uraian.."
                     value={searchParams.get('q') as string}
                     onChange={(e) =>
                        setSearchParams((prev) => ({
                           ...prev,
                           level: prev.get('level') as string,
                           page: '1',
                           limit: prev.get('limit') as string,
                           q: e.target.value,
                           kode: prev.get('kode') as string,
                        }))
                     }
                  />
               </div>

               {rekening.data && (
                  <>
                     <Table className="border border-gray-200">
                        <TableHeader className="bg-gray-100">
                           <TableRow>
                              <TableHead className="font-semibold w-[200px]">Kode</TableHead>
                              <TableHead className="font-semibold">Uraian</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {rekening.data.data.data.map((item: Rekening) => (
                              <TableRow key={item.kode} className="border-dashed border-b border-gray-200">
                                 <TableCell className="font-medium">{item.kode}</TableCell>
                                 <TableCell>{item.uraian}</TableCell>
                              </TableRow>
                           ))}
                           {rekening.data.data.data.length === 0 && (
                              <TableRow>
                                 <TableCell colSpan={2} className="text-center">
                                    Tidak ada data
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                     <div className="text-sm text-gray-500 text-right w-full flex justify-between">
                        <span>
                           {rekening.data.data.data.length > 0 && (
                              <>
                                 Menampilkan {rekening.data.data.start} - {rekening.data.data.end} dari{' '}
                                 {rekening.data.data.totalFiltered &&
                                    `${rekening.data.data.totalFiltered} terfilter. Total `}
                                 {rekening.data.data.total} data.{' '}
                              </>
                           )}
                        </span>
                        <span>
                           Halaman {searchParams.get('page')} dari {rekening.data.data.pages}
                        </span>
                     </div>
                     <Pagination>
                        <PaginationContent>
                           {parseInt(searchParams.get('page') as string) > 1 && (
                              <PaginationItem>
                                 <PaginationPrevious
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(parseInt(prev.get('page') as string) - 1),
                                          limit: prev.get('limit') as string,
                                          q: prev.get('q') as string,
                                          kode: prev.get('kode') as string,
                                       }))
                                    }
                                 />
                              </PaginationItem>
                           )}
                           {parseInt(searchParams.get('page') as string) - 2 > 1 && (
                              <>
                                 <PaginationItem>
                                    <PaginationLink
                                       className="cursor-pointer"
                                       onClick={() =>
                                          setSearchParams((prev) => ({
                                             level: prev.get('level') as string,
                                             page: String(1),
                                             limit: prev.get('limit') as string,
                                             q: prev.get('q') as string,
                                             kode: prev.get('kode') as string,
                                          }))
                                       }
                                    >
                                       1
                                    </PaginationLink>
                                 </PaginationItem>
                                 <PaginationItem>
                                    <PaginationEllipsis />
                                 </PaginationItem>
                              </>
                           )}
                           {Array.from(
                              {
                                 length:
                                    parseInt(searchParams.get('page') as string) > 2
                                       ? 2
                                       : parseInt(searchParams.get('page') as string) - 1,
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
                                             parseInt(searchParams.get('page') as string) > 2
                                                ? page + parseInt(searchParams.get('page') as string) - 3
                                                : page
                                          ),
                                          limit: prev.get('limit') as string,
                                          q: prev.get('q') as string,
                                          kode: prev.get('kode') as string,
                                       }))
                                    }
                                 >
                                    {parseInt(searchParams.get('page') as string) > 2
                                       ? page + parseInt(searchParams.get('page') as string) - 3
                                       : page}
                                 </PaginationLink>
                              </PaginationItem>
                           ))}
                           <PaginationLink isActive>{searchParams.get('page')}</PaginationLink>
                           {Array.from(
                              {
                                 length:
                                    rekening.data.data.pages - parseInt(searchParams.get('page') as string) >= 2
                                       ? 2
                                       : rekening.data.data.pages - parseInt(searchParams.get('page') as string),
                              },
                              (_, i) => i + 1
                           ).map((page) => (
                              <PaginationItem key={page}>
                                 <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(page + parseInt(searchParams.get('page') as string)),
                                          limit: prev.get('limit') as string,
                                          q: prev.get('q') as string,
                                          kode: prev.get('kode') as string,
                                       }))
                                    }
                                 >
                                    {page + parseInt(searchParams.get('page') as string)}
                                 </PaginationLink>
                              </PaginationItem>
                           ))}
                           {rekening.data.data.pages - 2 > parseInt(searchParams.get('page') as string) && (
                              <>
                                 <PaginationItem>
                                    <PaginationEllipsis />
                                 </PaginationItem>
                                 <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(rekening.data.data.pages),
                                          limit: prev.get('limit') as string,
                                          q: prev.get('q') as string,
                                          kode: prev.get('kode') as string,
                                       }))
                                    }
                                 >
                                    {rekening.data.data.pages}
                                 </PaginationLink>
                              </>
                           )}
                           {rekening.data.data.pages > parseInt(searchParams.get('page') as string) && (
                              <PaginationItem>
                                 <PaginationNext
                                    className="cursor-pointer"
                                    onClick={() =>
                                       setSearchParams((prev) => ({
                                          level: prev.get('level') as string,
                                          page: String(parseInt(prev.get('page') as string) + 1),
                                          limit: prev.get('limit') as string,
                                          q: prev.get('q') as string,
                                          kode: prev.get('kode') as string,
                                       }))
                                    }
                                 />
                              </PaginationItem>
                           )}
                        </PaginationContent>
                     </Pagination>
                  </>
               )}
            </CardContent>
         </Card>
      </DashboardLayout>
   )
}
