type JabatanType = Array<{ value: string; label: string }>

const jabatan: JabatanType = [
   {
      value: 'PA',
      label: 'Pengguna Anggaran',
   },
   {
      value: 'KPA',
      label: 'Kuasa Pengguna Anggaran',
   },
   {
      value: 'BPG',
      label: 'Bendahara Pengeluaran Pembantu BLUD',
   },
   {
      value: 'BPN',
      label: 'Bendahara Penerimaan Pembantu BLUD',
   },
   {
      value: 'PPKOM',
      label: 'Pejabat Pembuat Komitmen BLUD',
   },
   {
      value: 'PPTK',
      label: 'Pejabat Pelaksana Teknis Kegiatan BLUD',
   },
   {
      value: 'PPK',
      label: 'Pejabat Penatausahaan Keuangan BLUD',
   },
]

export default jabatan
