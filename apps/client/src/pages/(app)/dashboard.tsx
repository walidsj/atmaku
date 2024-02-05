import { useCookies } from 'react-cookie'
import { useQuery } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FiHome } from 'react-icons/fi'

export default function Dashboard() {
   const [cookies] = useCookies(['token'])

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
      <div>
         <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
         <p className="text-sm text-gray-600 mb-5">
            Ringkasan data dan statistik kinerja keuangan BLUD
         </p>
         {user.isLoading && <p>Loading...</p>}
         {user.isError && <p>Error</p>}
         {user.isSuccess && <div>Welcome, {user.data.user.nama}</div>}
      </div>
   )
}
