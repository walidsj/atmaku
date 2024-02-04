type JabatanType = {
   [key: string]: {
      value: string
      label: string
   }
}

const jabatan: JabatanType = {
   PA: {
      value: 'PA',
      label: 'Pengguna Anggaran',
   },
   KPA: {
      value: 'KPA',
      label: 'Kuasa Pengguna Anggaran',
   },
   BPG: {
      value: 'BPG',
      label: 'Bendahara Pengeluaran Pembantu BLUD',
   },
   BPN: {
      value: 'BPN',
      label: 'Bendahara Penerimaan Pembantu BLUD',
   },
   PPKOM: {
      value: 'PPKOM',
      label: 'Pejabat Pembuat Komitmen BLUD',
   },
   PPTK: {
      value: 'PPTK',
      label: 'Pejabat Pelaksana Teknis Kegiatan BLUD',
   },
   PPK: {
      value: 'PPK',
      label: 'Pejabat Penatausahaan Keuangan BLUD',
   },
}

export default jabatan
