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

  const handleFeatured = async (id: string) => {
    const confirmDelete = confirm("Bạn có chắc muốn xóa khỏi trang chủ không?");
  
    if (!confirmDelete) return;
    await axios.patch(`http://localhost:8080/api/hospital/${id}`, {
      isFeatured: false,
    });
    fetchHospitals();
  }

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
        {hospitals.filter((hospital: any) => hospital.isFeatured).map((hospital: any) => (
          <div
            key={hospital._id}
            onClick={() => router.push(`/hospital_detail/${hospital._id}`)}
            className="border rounded-xl p-4 shadow-sm bg-white relative" 
          >
            {/* Nút sửa + xóa */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/hospital_edit/${hospital._id}`)
                  }}
                  className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sửa
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatured(hospital._id);
                  }}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  X
                </button>
              </div>
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