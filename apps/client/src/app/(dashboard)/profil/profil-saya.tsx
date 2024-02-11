import { CardSkeleton } from '@/components/card-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useAuth from '@/lib/auth'

export default function ProfilSaya() {
   const { user, isLoading } = useAuth()

   return (
      <div>
         <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Profil Saya</h2>
            <p className="text-sm text-gray-600">Informasi profil pengguna</p>
         </div>

         {user ? (
            <Card>
               <CardContent className="pt-6">
                  <Table>
                     <TableBody>
                        <TableRow>
                           <TableCell className="font-medium">
                              Nama Lengkap
                           </TableCell>
                           <TableCell className="text-right">
                              {user.nama}
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="font-medium">
                              Alamat Email
                           </TableCell>
                           <TableCell className="text-right">
                              {user.email}
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="font-medium">
                              No. Handphone
                           </TableCell>
                           <TableCell className="text-right">
                              {user.telepon}
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell className="font-medium">
                              Jabatan
                           </TableCell>
                           <TableCell className="text-right">
                              {user.jabatan}
                           </TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         ) : (
            isLoading && <CardSkeleton />
         )}
      </div>
   )
}
