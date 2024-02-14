import { CardSkeleton } from '@/components/card-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'sonner'
import { AxiosResponse, isAxiosError } from 'axios'
import axios from '@/lib/axios'
import useAuth from '@/lib/auth'
import { useEffect } from 'react'
import DashboardLayout from '@/components/dashboard-layout'

export default function EditProfil() {
   const { user } = useAuth()
   const navigate = useNavigate()
   const fetcher = axios()

   const form = useForm({
      defaultValues: {
         nama: '',
         email: '',
         telepon: '',
         jabatan: '',
      },
   })

   const jabatan = useQuery({
      queryKey: ['common/jabatan'],
      queryFn: async () => await fetcher.get('/common/jabatan'),
   })

   useEffect(() => {
      if (user) {
         form.setValue('nama', user.nama)
         form.setValue('email', user.email)
         form.setValue('telepon', user.telepon)
         form.setValue('jabatan', user.jabatan)
      }
   }, [user, jabatan.data])

   const queryClient = useQueryClient()

   const register = useMutation({
      mutationKey: ['/auth/profil'],
      mutationFn: async (data) => await fetcher.put('/auth/profil', data),
      onSuccess: (res: AxiosResponse) => {
         toast.success(res.data.message)

         queryClient.setQueryData(['/auth/profil'], res.data.user)
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
         onSuccess: () => navigate('/profil'),
      })
   }

   return (
      <DashboardLayout title="Edit Profil" description="Perbarui informasi profil pengguna">
         {user ? (
            <Card>
               <CardContent className="p-5">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-xl">
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
                                 <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Pilih Jabatan..." />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {jabatan.data?.data.map((item: { value: string; label: string }) => (
                                          <SelectItem key={item.value} value={item.value}>
                                             {item.label}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Button type="submit" className="w-full">
                           {form.formState.isSubmitting && <FiLoader className="animate-spin h-4 w-4 mr-2" />}
                           Simpan
                        </Button>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         ) : (
            <CardSkeleton />
         )}
      </DashboardLayout>
   )
}
