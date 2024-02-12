import { CardSkeleton } from '@/components/card-skeleton'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useAuth from '@/lib/auth'

export default function Profil() {
   const { user } = useAuth()

   return (
      <DashboardLayout
         title="Profil Saya"
         description="Informasi profil pengguna"
      >
         {user ? (
            <Card>
               <CardContent className="p-5">
                  <Table className="max-w-xl">
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
            <CardSkeleton />
         )}
      </DashboardLayout>
   )
}
