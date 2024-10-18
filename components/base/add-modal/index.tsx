"use client";

import { FormData } from "@/types/form-data";
import { Response } from "@/types/response";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

interface AddModalProps {
  onSuccess: (e: string, s: number) => void;
}

const validationSchema = Yup.object({
  nama: Yup.string().required("Nama wajib diisi"),
  nik: Yup.number()
    .required("NIK wajib diisi")
    .typeError("NIK harus berupa angka"),
  nomor_kk: Yup.number()
    .required("Nomor Kartu Keluarga wajib diisi")
    .typeError("Nomor Kartu Keluarga harus berupa angka"),
  umur: Yup.number()
    .min(25, "Umur harus lebih dari atau sama dengan 25")
    .required("Umur wajib diisi"),
  gender: Yup.string().required("Jenis Kelamin wajib dipilih"),
  provinsi: Yup.string().required("Provinsi wajib diisi"),
  kabKota: Yup.string().required("Kab/Kota wajib diisi"),
  kecamatan: Yup.string().required("Kecamatan wajib diisi"),
  kelurahan: Yup.string().required("Kelurahan wajib diisi"),
  alamat: Yup.string()
    .max(255, "Alamat tidak boleh lebih dari 255 karakter")
    .required("Alamat wajib diisi"),
  rt: Yup.string()
    .required("RT wajib diisi")
    .typeError("RT harus berupa angka atau string"),
  rw: Yup.string()
    .required("RW wajib diisi")
    .typeError("RW harus berupa angka atau string"),
  pendapatan_sebelum_pandemi: Yup.number()
    .required("Pendapatan sebelum pandemi wajib diisi")
    .typeError("Pendapatan harus berupa angka"),
  pendapatan_setelah_pandemi: Yup.number()
    .required("Pendapatan setelah pandemi wajib diisi")
    .typeError("Pendapatan harus berupa angka"),
  alasan: Yup.string().required("Alasan wajib diisi"),
});

export const AddModal: React.FC<AddModalProps> = ({ onSuccess }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<Response[]>([]);
  const [regencies, setRegencies] = useState<Response[]>([]);
  const [districts, setDistricts] = useState<Response[]>([]);
  const [villages, setVillages] = useState<Response[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRegencies, setSelectedRegencies] = useState<string>("");
  const [selectedDistricts, setSelectedDistrict] = useState<string>("");

  const getProvinces = async () => {
    try {
      const response = await axios.get("/api/get-province");
      setProvinces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRegencies = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-city/`, {
        params: {
          city: id,
        },
      });
      setRegencies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDistricts = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-districts`, {
        params: {
          districts: id,
        },
      });
      setDistricts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getVillages = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-villages`, {
        params: {
          villages: id,
        },
      });
      setVillages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log({ checked });
    console.log(formik.isValid);
  }, [checked]);
  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getRegencies(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegencies) {
      getDistricts(selectedRegencies);
    }
  }, [selectedRegencies]);
  useEffect(() => {
    if (selectedDistricts) {
      getVillages(selectedDistricts);
    }
  }, [selectedDistricts]);

  const formik = useFormik<FormData>({
    initialValues: {
      nama: "",
      nik: 0,
      nomor_kk: 0,
      umur: 0,
      gender: "",
      provinsi: "",
      kabKota: "",
      kecamatan: "",
      kelurahan: "",
      alamat: "",
      rt: "",
      rw: "",
      pendapatan_sebelum_pandemi: 0,
      pendapatan_setelah_pandemi: 0,
      alasan: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const responseTime = 1500;

      console.log(values);

      setTimeout(() => {
        if (Math.random() > 0.5) {
          onSuccess("Berhasil Menambahkan Data", 200);
          handleCloseModal();
        } else {
          onSuccess("Gagal Menambahkan Data", 400);
        }
      }, responseTime);
    },
  });

  const handleCloseModal = () => {
    const modal = document.getElementById("add-modal") as HTMLDialogElement;
    modal?.close();
    formik.resetForm();
    setSelectedProvince("");
    setSelectedRegencies("");
    setSelectedDistrict("");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
  };

  return (
    <dialog id="add-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h1 className="w-full text-center"> Tambah Data Penduduk</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 flex flex-col gap-1 mt-6"
        >
          <input
            name="nama"
            placeholder="Nama"
            onChange={formik.handleChange}
            value={formik.values.nama}
            className="w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          />

          <input
            name="nik"
            type="number"
            placeholder="NIK"
            onChange={formik.handleChange}
            value={formik.values.nik}
            className="w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          />

          <input
            name="nomor_kk"
            type="number"
            placeholder="Nomor Kartu Keluarga"
            onChange={formik.handleChange}
            value={formik.values.nomor_kk}
            className="w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          />

          <span className=" w-full join flex flex-row gap-2">
            <input
              name="umur"
              type="number"
              placeholder="Umur (>= 25)"
              onChange={formik.handleChange}
              value={formik.values.umur}
              className="h-11 w-1/3 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            />

            <select
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              className="dropdown h-11 w-2/3 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            >
              <option value="" defaultChecked disabled hidden>
                Pilih Jenis Kelamin
              </option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </span>

          <select
            name="provinsi"
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              formik.setFieldValue("provinsi", e.target.value);
            }}
            value={formik.values.provinsi}
            className="dropdown w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          >
            <option value="" defaultChecked disabled hidden>
              Pilih Provinsi
            </option>
            {provinces.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>

          <select
            name="kabKota"
            onChange={(e) => {
              setSelectedRegencies(e.target.value);
              formik.setFieldValue("kabKota", e.target.value);
            }}
            value={formik.values.kabKota}
            className="dropdown w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          >
            <option value="" defaultChecked disabled hidden>
              Pilih Kab/Kota
            </option>
            {regencies.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.name}
              </option>
            ))}
          </select>

          <select
            name="kecamatan"
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              formik.setFieldValue("kecamatan", e.target.value);
            }}
            value={formik.values.kecamatan}
            className="dropdown w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          >
            <option value="" defaultChecked disabled hidden>
              Pilih Kecamatan
            </option>
            {districts.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.name}
              </option>
            ))}
          </select>
          <select
            name="kelurahan"
            onChange={(e) => formik.setFieldValue("kelurahan", e.target.value)}
            value={formik.values.kelurahan}
            className="dropdown w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          >
            <option value="" defaultChecked disabled hidden>
              Pilih kelurahan
            </option>
            {villages.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <span className=" w-full join grid grid-cols-2 gap-2">
            <input
              name="rt"
              placeholder="Rt"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.rt}
              className="h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            />{" "}
            <input
              name="rw"
              placeholder="Rw"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.rw}
              className="h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            />
          </span>
          <span className=" w-full join grid grid-cols-2 gap-2">
            <input
              name="pendapatan_sebelum_pandemi"
              placeholder="Pendapatan sebelum Pandemi"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.pendapatan_sebelum_pandemi}
              className="h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            />{" "}
            <input
              name="pendapatan_setelah_pandemi"
              placeholder="Pendapatan setelah pandemi"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.pendapatan_setelah_pandemi}
              className="h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
              required
            />
          </span>
          <input
            name="alamat"
            type="text"
            placeholder="Alamat"
            onChange={formik.handleChange}
            value={formik.values.alamat}
            className="w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          />
          <input
            name="alasan"
            type="text"
            placeholder="Alasan"
            onChange={formik.handleChange}
            value={formik.values.alasan}
            className="w-full h-11 outline-none ring-0 rounded-md shadow-md px-2 tracking-wide"
            required
          />

          <label className="flex flex-row items-start gap-1 py-1">
            <input
              type="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
              className="text-xs"
            />
            <p className="text-xs">
              {" "}
              Saya menyatakan bahwa data yang diisikan adalah benar dan siap
              mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
              data tersebut.
            </p>
          </label>

          <span className="join grid grid-cols-2">
            <button
              className="btn btn-error btn-sm"
              onClick={handleCloseModal}
              type="button"
            >
              Batal
            </button>
            <button
              className={`btn  btn-sm  ${
                checked && formik.isValid ? "btn-info" : "btn-disabled"
              }`}
              type="submit"
              disabled={!formik.isValid && !checked}
            >
              Kirim
            </button>
          </span>
        </form>
      </div>
    </dialog>
  );
};
