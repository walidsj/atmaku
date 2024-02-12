import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
   return (
      <div className="min-h-svh flex flex-col items-center justify-center">
         <Outlet />
      </div>
   )
}
