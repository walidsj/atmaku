import Router from '@/router'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

function App() {
   return (
      <CookiesProvider>
         <QueryClientProvider client={queryClient}>
            <Router />
            <Toaster position="top-center" richColors />
         </QueryClientProvider>
      </CookiesProvider>
   )
}

export default App
