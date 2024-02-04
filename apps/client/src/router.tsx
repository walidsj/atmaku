import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@/pages/(auth)/login'
import Register from '@/pages/(auth)/register'

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </BrowserRouter>
   )
}
