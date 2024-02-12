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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'sonner'
import { AxiosResponse, isAxiosError } from 'axios'
import axios from '@/lib/axios'

export default function Register() {
   const navigate = useNavigate()
   const fetcher = axios()

   const form = useForm({
      defaultValues: {
         nama: '',
         email: '',
         password: '',
         telepon: '',
         jabatan: '',
      },
   })

   const jabatan = useQuery({
      queryKey: ['common/jabatan'],
      queryFn: async () => await fetcher.get('/common/jabatan'),
   })

   const register = useMutation({
      mutationKey: ['login'],
      mutationFn: async (data) => await fetcher.post('/auth/register', data),
      onSuccess: (res: AxiosResponse) => {
         toast.success(res.data.message)
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
      await register.mutateAsync(data, {
         onSuccess: () => navigate('/login'),
      })
   }

   return (
      <Card className="w-[400px]">
         <CardHeader>
            <CardTitle>Register Akun</CardTitle>
            <CardDescription>
               Silakan membuat akun untuk mengakses aplikasi
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
                     name="nama"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nama Lengkap</FormLabel>
                           <FormControl>
                              <Input {...field} autoFocus />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Alamat Email</FormLabel>
                           <FormControl>
                              <Input type="email" {...field} />
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
                              <Input type="password" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="telepon"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>No. Handphone</FormLabel>
                           <FormControl>
                              <Input type="tel" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="jabatan"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Jabatan</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jabatan..." />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {jabatan.data?.data.map(
                                    (item: {
                                       value: string
                                       label: string
                                    }) => (
                                       <SelectItem
                                          key={item.value}
                                          value={item.value}
                                       >
                                          {item.label}
                                       </SelectItem>
                                    )
                                 )}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="w-full">
                     {form.formState.isSubmitting && (
                        <FiLoader className="animate-spin h-4 w-4 mr-2" />
                     )}
                     Register
                  </Button>
                  <span>
                     Sudah punya akun?{' '}
                     <Link to="/">
                        <Button variant="link">Login</Button>
                     </Link>
                  </span>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
