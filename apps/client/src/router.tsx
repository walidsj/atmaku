import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from '@/components/middlewares/public-route'
import ProtectedRoute from '@/components/middlewares/protected-route'
import Login from '@/app/(auth)/login'
import Register from '@/app/(auth)/register'
import Dashboard from '@/app/(dashboard)/dashboard'
import DashboardLayout from '@/app/(dashboard)/~layout'
import ProfilSaya from '@/app/(dashboard)/profil/profil-saya'
import NotFound from '@/app/errors/not-found'
import AuthLayout from '@/app/(auth)/~layout'

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
               <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profil-saya" element={<ProfilSaya />} />
                  <Route path="*" element={<NotFound />} />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
