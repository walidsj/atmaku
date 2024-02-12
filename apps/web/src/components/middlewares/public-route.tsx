import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute() {
   const [cookies] = useCookies(['token'])

   if (!cookies.token) {
      return <Outlet />
   }

   return <Navigate to="/dashboard" replace />
}
