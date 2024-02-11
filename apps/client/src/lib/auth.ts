import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

const useAuth = () => {
   const fetcher = axios()

   const user = useQuery({
      queryKey: ['auth/profile'],
      queryFn: () => fetcher.get('/auth/profile'),
   })

   return {
      user: user.data?.data.user || null,
      isLoading: user.isLoading,
   }
}

export default useAuth
