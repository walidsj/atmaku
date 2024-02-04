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
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { RiTimer2Line } from 'react-icons/ri'

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string(),
})

export default function Login() {
   const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit = async (values: z.infer<typeof loginSchema>) => {
      console.log(values)
   }

   return (
      <div className="min-h-svh flex flex-col items-center justify-center">
         <Card className="w-[400px]">
            <CardHeader>
               <CardTitle>Login Aplikasi</CardTitle>
               <CardDescription>
                  Silakan masuk untuk mengakses Aplikasi SiMKU
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
                                 <Input type="email" {...field} autoFocus />
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
                     <Button type="submit" size="lg" className="w-full">
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
