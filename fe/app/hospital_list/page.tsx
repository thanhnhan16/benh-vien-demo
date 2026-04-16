"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function HospitalList() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    const res = await axios.get("http://localhost:8080/api/hospital");
    setHospitals(res.data);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/hospital_data_profiling")}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 flex items-center gap-1"
      >
      Thêm bênh viện mới
      </button>
      <h1 className="text-2xl font-bold mb-6">Danh sách bệnh viện</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((hospital: any) => (
          <div
            key={hospital._id}
            onClick={() => router.push(`/hospital_detail/${hospital._id}`)}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold mb-3">
              {hospital.hospitalName}
            </h2>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Loại bệnh viện:</span>{" "}
                {hospital.hospitalType}
              </div>

              <div>
                <span className="font-medium">Cơ quan chủ quản:</span>{" "}
                {hospital.managingOrg}
              </div>

              <div>
                <span className="font-medium">Chuyên khoa chính:</span>{" "}
                {hospital.mainSpecialty}
              </div>

              <div>
                <span className="font-medium">Chuyên khoa mũi nhọn:</span>{" "}
                {hospital.keySpecialty}
              </div>

              <div>
                <span className="font-medium">Quy mô giường bệnh:</span>{" "}
                {hospital.bedCount}
              </div>

              <div>
                <span className="font-medium">Ngoại trú/năm:</span>{" "}
                {hospital.outpatientPerYear}
              </div>

              <div>
                <span className="font-medium">Nội trú/năm:</span>{" "}
                {hospital.inpatientPerYear}
              </div>

              <div>
                <span className="font-medium">Phẫu thuật/năm:</span>{" "}
                {hospital.surgeryPerYear}
              </div>

              <div className="col-span-2">
                <span className="font-medium">Địa chỉ:</span>{" "}
                {hospital.address}
              </div>

              <div className="col-span-2">
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={hospital.website}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {hospital.website}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}