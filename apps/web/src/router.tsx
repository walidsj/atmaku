import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from '@/components/middlewares/public-route'
import ProtectedRoute from '@/components/middlewares/protected-route'
import Login from '@/app/(auth)/login/page'
import Register from '@/app/(auth)/register/page'
import Dashboard from '@/app/dashboard/page'
import DashboardLayout from '@/app/dashboard/layout'
import Profil from '@/app/dashboard/profil/page'
import Error from '@/app/error'
import AuthLayout from '@/app/(auth)/layout'
import EditProfil from '@/app/dashboard/profil/edit/page'
import KodeRekening from '@/app/dashboard/pengaturan/kode-rekening/page'

const NotFound = () => (
   <Error title="404 Not Found" description="Halaman tidak ditemukan." />
)

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<PublicRoute />}>
               <Route element={<AuthLayout />}>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
               </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
               <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="profil" element={<Profil />} />
                  <Route path="profil/edit" element={<EditProfil />} />
                  <Route
                     path="pengaturan/kode-rekening"
                     element={<KodeRekening />}
                  />
               </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   )
}
