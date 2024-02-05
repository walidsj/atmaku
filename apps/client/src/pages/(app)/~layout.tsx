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
      <div className="flex flex-col">
         <Menubar className="rounded-none">
            <AlertDialog>
               <MenubarMenu>
                  <Link to="/dashboard">
                     <h1 className="font-extrabold px-4 py-1">SIMKU炎</h1>
                  </Link>
                  <MenubarTrigger>Beranda</MenubarTrigger>
                  <MenubarContent>
                     <Link to="/profil-saya">
                        <MenubarItem>
                           <Avatar className="h-5 w-5 mr-2">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>X</AvatarFallback>
                           </Avatar>
                           {user.isSuccess ? user.data.user.nama : 'Loading...'}
                        </MenubarItem>
                     </Link>
                     <MenubarSeparator />
                     <Link to="/dashboard">
                        <MenubarItem>
                           Dashboard
                           <MenubarShortcut>⌘H</MenubarShortcut>
                        </MenubarItem>
                     </Link>
                     <MenubarSub>
                        <MenubarSubTrigger>Pengaturan</MenubarSubTrigger>
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
                        Anda harus login kembali untuk melanjutkan menggunakan
                        Aplikasi SiMKU.
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
               <MenubarTrigger>Belanja</MenubarTrigger>
               <MenubarContent>
                  <MenubarItem>Daftar Produk</MenubarItem>
                  <MenubarItem>Daftar Supplier</MenubarItem>
                  <MenubarItem>Daftar Pembeli</MenubarItem>
               </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
               <MenubarTrigger>Pendapatan</MenubarTrigger>
               <MenubarContent>
                  <MenubarItem>Daftar Pendapatan</MenubarItem>
                  <MenubarItem>Daftar Pengeluaran</MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
         <div className="p-5">
            <Outlet />
         </div>
      </div>
   )
}
