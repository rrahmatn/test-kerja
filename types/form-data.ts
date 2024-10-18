export interface FormData {
  nama: string;
  nik: number;
  nomor_kk: number;
  umur: number;
  gender: string;
  provinsi: string;
  kabKota: string;
  kecamatan: string;
  kelurahan: string;
  alamat: string;
  rt: string | number;
  rw: string | number;
  pendapatan_sebelum_pandemi: number;
  pendapatan_setelah_pandemi: number ;
  alasan: string;

  [key: string]: string | number;
}
