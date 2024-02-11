import {
   EmptyPlaceholder,
   EmptyPlaceholderDescription,
   EmptyPlaceholderIcon,
   EmptyPlaceholderTitle,
} from '@/components/empty-placeholder'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FiCreditCard } from 'react-icons/fi'

export default function NotFound() {
   return (
      <EmptyPlaceholder>
         <EmptyPlaceholderIcon>
            <FiCreditCard className="h-10 w-10" />
         </EmptyPlaceholderIcon>
         <EmptyPlaceholderTitle>404 Not Found</EmptyPlaceholderTitle>
         <EmptyPlaceholderDescription>
            Halaman tidak ditemukan.
         </EmptyPlaceholderDescription>
         <Link to="/" className="mt-3">
            <Button variant="outline">Kembali ke Beranda</Button>
         </Link>
      </EmptyPlaceholder>
   )
}
