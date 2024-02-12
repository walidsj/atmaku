import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

const useAuth = () => {
   const fetcher = axios()
   const [_cookies, _setCookie, removeCookie] = useCookies(['token'])

   const user = useQuery({
      queryKey: ['/auth/profil'],
      queryFn: () => fetcher.get('/auth/profil').then((res) => res.data),
   })

   return {
      user: user?.data?.user || null,
      isLoading: user.isLoading,
      signOut: () => {
         removeCookie('token')
      },
   }
}

export default useAuth
