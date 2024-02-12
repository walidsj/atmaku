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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import useAuth from '@/lib/auth'

export default function DashboardLayout() {
   const { user, signOut } = useAuth()

   return (
      <div className="flex flex-col space-y-5">
         <Menubar className="rounded-none">
            <AlertDialog>
               <MenubarMenu>
                  <MenubarTrigger>
                     <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src="/avatar.jpg" />
                        <AvatarFallback>X</AvatarFallback>
                     </Avatar>
                     {user ? (
                        user.nama
                     ) : (
                        <Skeleton className="w-28 h-4 rounded-lg" />
                     )}
                  </MenubarTrigger>
                  <MenubarContent>
                     <MenubarSub>
                        <Link to="/">
                           <MenubarItem>Dashboard</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <Link to="/profil">
                           <MenubarItem>Profil Saya</MenubarItem>
                        </Link>
                        <MenubarSubTrigger>Pengaturan Akun</MenubarSubTrigger>
                        <MenubarSubContent>
                           <Link to="/profil/edit">
                              <MenubarItem>Edit Profil</MenubarItem>
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
                     <Button onClick={() => signOut()}>Logout</Button>
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
   )
}
