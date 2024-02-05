import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from '@/components/middlewares/public-route'
import ProtectedRoute from '@/components/middlewares/protected-route'
import Login from '@/pages/(auth)/login'
import Register from '@/pages/(auth)/register'
import Dashboard from '@/pages/(app)/dashboard'
import DashboardLayout from '@/pages/(app)/~layout'
import ProfilSaya from '@/pages/(app)/profil/profil-saya'
import Error from '@/pages/~error'

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<PublicRoute />}>
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
               <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profil-saya" element={<ProfilSaya />} />
               </Route>
            </Route>
            <Route path="*" element={<Error />} />
         </Routes>
      </BrowserRouter>
   )
}
