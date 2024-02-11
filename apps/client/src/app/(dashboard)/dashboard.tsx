import { Card, CardContent } from '@/components/ui/card'
import useAuth from '@/lib/auth'

export default function Dashboard() {
   const { user } = useAuth()

   return (
      <div>
         <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-sm text-gray-600">
               Ringkasan data dan statistik kinerja keuangan BLUD
            </p>
         </div>

         <Card>
            <CardContent className="pt-6">
               {user && <div>Welcome, {user.nama}</div>}
            </CardContent>
         </Card>
      </div>
   )
}
