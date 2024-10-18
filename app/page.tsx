"use client";

import React, { useState } from "react";
import { dummyData } from "@/constans/data";
import { AddModal } from "@/components";
import { Bounce, toast } from "react-toastify";
import { EditModal } from "@/components/base/edit-modal";
import { FormData } from "@/types/form-data";

const Home: React.FC = () => {
  const [data, setData] = useState<FormData>(dummyData[0]);
  const allHeaders = Object.keys(dummyData[0]);
  const headers = allHeaders.filter(
    (header) =>
      ![
        "pendapatan_sebelum_pandemi",
        "pendapatan_setelah_pandemi",
        "rt",
        "rw",
        "reason",
        "nomor_kk",
      ].includes(header)
  );

  return (
    <div className="w-full overflow-x-hidden sm:px-20 px-4">
      <div className="flex flex-col items-center w-full">
        <div className="w-full h-fit py-2  flex flex-col items-center justify-center">
          <h2 className="text-xs">
            catatan : klik baris untuk edit , kolom provinsi kota dan kelurahan
            pada edit akan bekerja baik ketika sudah real data (bukan dummy)
            dikarenakan membutuhkan uuid untuk mendapatkan value nya
          </h2>
          <h3 className="text-xs">
            catatan lagi : saya mengedepankan fungsi jadi saya tidak fokus pada
            tampilan
          </h3>
          <button
            className="btn btn-info ml-auto"
            type="button"
            onClick={() => {
              const modal = document.getElementById(
                "add-modal"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Tambah Data
          </button>
        </div>
        <div className="overflow-y-auto max-h-[600px] w-full mt-4">
          <table className="table w-full">
            <thead className="sticky top-0 bg-gray-200 capitalize">
              <tr className="font-bold">
                {headers.map((header, index) => (
                  <th key={index} className="py-4 text-left text-lg">
                    {header.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, i) => (
                <tr
                  onClick={() => {
                    setData(data);
                    const modal = document.getElementById(
                      "edit-modal"
                    ) as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-slate-200" : ""
                  } cursor-pointer`}
                >
                  {headers.map((header) => (
                    <td key={header} className="py-3 text-sm sm:text-base">
                      {data[header] as string | number}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddModal
        onSuccess={(e, i) => {
          toast(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: i === 200 ? "light" : "colored",
            transition: Bounce,
          });
        }}
      />
      <EditModal
        initialData={data}
        onSuccess={(e, i) => {
          toast(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: i === 200 ? "light" : "colored",
            transition: Bounce,
          });
        }}
      />
    </div>
  );
};

export default Home;
