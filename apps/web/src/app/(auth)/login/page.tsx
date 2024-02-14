import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { AxiosResponse, isAxiosError } from 'axios'

export default function Login() {
   const fetcher = axios()
   const form = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
   })
   const navigate = useNavigate()
   const [_cookies, setCookie] = useCookies(['token'])

   const login = useMutation({
      mutationKey: ['login'],
      mutationFn: async (data) => await fetcher.post('/auth/login', data),
      onSuccess: (res: AxiosResponse) => {
         const queryClient = new QueryClient()
         queryClient.setQueryData(['profile', res.data.token], res.data.user)

         toast.success(res.data.message)
         setCookie('token', res.data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
         })
      },
      onError: (error: any) => {
         if (isAxiosError(error)) {
            if (error.response?.data.message) {
               toast.error(error.response?.data.message)
            } else {
               toast.error(error.message)
            }

            if (error.response?.data.errors) {
               for (const field in error.response?.data.errors) {
                  form.setError(field as any, {
                     message: error.response?.data.errors[field][0],
                  })
               }
            }
         }
      },
   })

   const onSubmit = async (data: any) => {
      await login.mutateAsync(data, {
         onSuccess: () => navigate('/'),
      })
   }

   return (
      <Card className="w-[400px]">
         <CardHeader>
            <CardTitle className="text-3xl font-extrabold">Atmaku.</CardTitle>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Alamat Email</FormLabel>
                           <FormControl>
                              <Input type="email" {...field} autoFocus placeholder="Alamat Email" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input type="password" {...field} placeholder="Password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" size="xl" className="w-full">
                     {form.formState.isSubmitting && <FiLoader className="animate-spin h-4 w-4 mr-2" />}
                     Login
                  </Button>
                  <span>
                     Belum punya akun?{' '}
                     <Link to="/register">
                        <Button variant="link">Daftar Sekarang</Button>
                     </Link>
                  </span>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
