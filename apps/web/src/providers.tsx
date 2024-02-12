import Router from '@/router'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export default function App() {
   return (
      <CookiesProvider>
         <QueryClientProvider client={queryClient}>
            <Router />
            <Toaster position="top-center" richColors closeButton />
         </QueryClientProvider>
      </CookiesProvider>
   )
}
