import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import useAuth from '@/lib/auth'

export default function Dashboard() {
   const { user } = useAuth()

   return (
      <DashboardLayout
         title="Dashboard"
         description="Ringkasan data dan statistik kinerja keuangan BLUD"
      >
         <Card>
            <CardContent className="p-5">
               {user && <div>Welcome, {user.nama}</div>}
            </CardContent>
         </Card>
      </DashboardLayout>
   )
}
