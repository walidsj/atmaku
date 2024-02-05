import Axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const instance = Axios.create({
   baseURL: import.meta.env.VITE_API_URL as string,
   headers: {
      'Content-Type': 'application/json',
   },
})

const axios = () => {
   const [cookies, setCookie, removeCookie] = useCookies(['token'])
   const navigate = useNavigate()

   if (cookies.token) {
      instance.defaults.headers.common['Authorization'] =
         `Bearer ${cookies.token}`
   }

   instance.interceptors.response.use(
      (response) => {
         return response
      },
      (error) => {
         if (error.response.status === 401) {
            removeCookie('token')
            toast.error('Sesi anda telah berakhir, silahkan login kembali')
            navigate('/')
         }
         return Promise.reject(error)
      }
   )

   return instance
}

export default axios
