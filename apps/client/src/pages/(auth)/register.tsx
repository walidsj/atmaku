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
import { useQuery } from 'react-query'
import { RiTimer2Line } from 'react-icons/ri'
import { toast } from 'sonner'

export default function Register() {
   const navigate = useNavigate()

   const jabatan = useQuery({
      queryKey: ['kategori/jabatan'],
      queryFn: async () => {
         const response = await fetch(
            'http://127.0.0.1:3000/api/kategori/jabatan'
         )
         return response.json()
      },
   })

   const form = useForm()

   const onSubmit = async (values: any) => {
      const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      })

      const data = await response.json()

      if (data.success) {
         toast.success(data.message)
         navigate('/')
      } else {
         if (data.errors) {
            for (const field in data.errors) {
               form.setError(field as any, {
                  message: data.errors[field][0],
               })
            }
         } else {
            toast.error(data.message)
         }
      }
   }

   return (
      <div className="min-h-svh flex flex-col items-center justify-center">
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
                                    {jabatan.data?.map(
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
                           <RiTimer2Line className="animate-spin h-4 w-4 mr-2" />
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
      </div>
   )
}
