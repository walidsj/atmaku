import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'

export default function Dashboard() {
   return (
      <DashboardLayout title="Dashboard" description="Ringkasan data dan statistik kinerja keuangan BLUD">
         <Card>
            <CardContent className="p-5">Welcome</CardContent>
         </Card>
      </DashboardLayout>
   )
}
