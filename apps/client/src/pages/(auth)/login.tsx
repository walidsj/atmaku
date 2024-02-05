import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { RiTimer2Line } from 'react-icons/ri'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { AxiosResponse, isAxiosError } from 'axios'

export default function Login() {
   const fetch = axios()
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
      mutationFn: async (data) => await fetch.post('/auth/login', data),
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
            toast.error(error.response?.data.message)

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
      <div className="min-h-svh flex flex-col items-center justify-center">
         <Card className="w-[400px]">
            <CardHeader>
               <CardTitle className="text-3xl font-extrabold">
                  SIMKU炎
                  <span className="text-lg ml-2 font-bold">by Atmaku</span>
               </CardTitle>
               <CardDescription>
                  炎 (baca: Hono) artinya api, dan api itu menyala.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-3"
                  >
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Alamat Email</FormLabel>
                              <FormControl>
                                 <Input
                                    type="email"
                                    {...field}
                                    autoFocus
                                    placeholder="Alamat Email"
                                 />
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
                                 <Input
                                    type="password"
                                    {...field}
                                    placeholder="Password"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit" size="xl" className="w-full">
                        {form.formState.isSubmitting && (
                           <RiTimer2Line className="animate-spin h-4 w-4 mr-2" />
                        )}
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
      </div>
   )
}
