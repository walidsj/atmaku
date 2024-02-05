import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Error() {
   return (
      <div className="min-h-svh flex flex-col items-center justify-center">
         <h1 className="text-3xl font-bold">404</h1>
         <p className="text-lg">Halaman tidak ditemukan</p>
         <Link to="/" className="mt-3">
            <Button variant="link">Kembali ke beranda</Button>
         </Link>
      </div>
   )
}
