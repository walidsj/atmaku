import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSeparator,
   MenubarShortcut,
   MenubarSub,
   MenubarSubContent,
   MenubarSubTrigger,
   MenubarTrigger,
} from '@/components/ui/menubar'
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useCookies } from 'react-cookie'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLayout() {
   const [cookies, _setCookie, removeCookie] = useCookies(['token'])

   const user = useQuery({
      queryKey: ['profile', cookies.token],
      queryFn: async () => {
         const response = await fetch(
            'http://127.0.0.1:3000/api/auth/profile',
            {
               headers: {
                  Authorization: `Bearer ${cookies.token}`,
               },
            }
         )
         const data = await response.json()
         return data
      },
   })

   return (
      <div className="bg-gray-50 min-h-svh">
         <div className="flex flex-col container">
            <Menubar className="rounded-none rounded-b-lg">
               <Link to="/dashboard">
                  <h1 className="font-extrabold px-5 py-1">Atmaku.</h1>
               </Link>
               <AlertDialog>
                  <MenubarMenu>
                     <MenubarTrigger>
                        <Avatar className="h-5 w-5 mr-2">
                           <AvatarImage src="/avatar.jpg" />
                           <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                        {user.isSuccess ? (
                           user.data.user.nama
                        ) : (
                           <Skeleton className="w-28 h-4 rounded-lg" />
                        )}
                     </MenubarTrigger>
                     <MenubarContent>
                        <MenubarSub>
                           <Link to="/profil-saya">
                              <MenubarItem>Profil Saya</MenubarItem>
                           </Link>
                           <MenubarSubTrigger>
                              Pengaturan Akun
                           </MenubarSubTrigger>
                           <MenubarSubContent>
                              <Link to="/edit-profil">
                                 <MenubarItem>Edit Profil</MenubarItem>
                              </Link>
                              <Link to="/ganti-password">
                                 <MenubarItem>Ganti Password</MenubarItem>
                              </Link>
                           </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <AlertDialogTrigger asChild>
                           <MenubarItem>
                              Logout
                              <MenubarShortcut>⌘W</MenubarShortcut>
                           </MenubarItem>
                        </AlertDialogTrigger>
                     </MenubarContent>
                  </MenubarMenu>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Apakah Anda yakin keluar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Anda harus login kembali untuk melanjutkan
                           menggunakan Aplikasi SiMKU.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                           onClick={() => {
                              removeCookie('token')
                           }}
                        >
                           Logout
                        </Button>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
               <MenubarMenu>
                  <MenubarTrigger>Pengaturan</MenubarTrigger>
                  <MenubarContent>
                     <MenubarSub>
                        <MenubarSubTrigger>Rekening Bank</MenubarSubTrigger>
                        <MenubarSubContent>
                           <MenubarItem>RKU-BLUD</MenubarItem>
                           <MenubarItem>Pengeluaran BLUD</MenubarItem>
                           <MenubarItem>Penerimaan BLUD</MenubarItem>
                        </MenubarSubContent>
                     </MenubarSub>
                     <MenubarItem>Besaran UP</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem>Perangkat Daerah</MenubarItem>
                     <MenubarItem>Pengguna</MenubarItem>
                     <MenubarItem>Pegawai</MenubarItem>
                     <MenubarSeparator />
                     <MenubarItem>Kode Rekening</MenubarItem>
                  </MenubarContent>
               </MenubarMenu>
            </Menubar>
            <Outlet />
         </div>
      </div>
   )
}
