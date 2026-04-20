"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function HospitalEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

const [hospitalEdit, setHospitalEdit] = useState<any>(null);
const [contactsEdit, setContactsEdit] = useState<any>([]);
const [strengthsEdit, setStrengthsEdit] = useState<any>(null);
const [problemEdit, setProblemEdit] = useState<any>(null);
const [dataSourcesEdit, setdataSourcesEdit] = useState<any>(null);
const [dataHighLightEdit, setdataHighLightEdit] = useState<any>(null);
const [readinessEdit, setReadinessEdit] = useState<any>(null);

const specialCasesRef = useRef<HTMLTableRowElement | null>(null);
const icuCasesRef = useRef<HTMLTableRowElement | null>(null);

const [errors, setErrors] = useState({
  patientPerYear: "",
  specialCases: "",
  icuCases:""
});



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/hospital/hospital-full/${id}`
    );
    setData(res.data);
    setHospitalEdit(res.data.hospital);
    setContactsEdit(res.data.contacts);
    setStrengthsEdit(res.data.strengths);
    setProblemEdit(res.data.problems);
    setdataSourcesEdit(res.data.dataSources);
    setdataHighLightEdit(res.data.dataHighlights);
    setReadinessEdit(res.data.readiness);

  };

  if (!data) return <div className="p-6">Loading...</div>;

  const {contacts, strengths, problems, dataSources, dataHighlights, readiness, hospital} =
    data;

  const cleanPayload = (data: any) => {
  const { _id, createdAt, updatedAt, __v, hospitalId, ...payload } = data;
  return payload;
};

 const handleEdit = async () => {
    if (!validateStrengths()) return;
  
    try {
    //update hospital
     await axios.patch(`http://localhost:8080/api/hospital/${hospitalEdit._id}`, hospitalEdit);

     //update contacts
    const requestsContacts = (contactsEdit || []).map((contact: any) => {
    const { _id,hospitalId, createdAt, updatedAt, __v, ...payloadDataHL } = contact;
      return axios.patch(
        `http://localhost:8080/api/hospital-contact/${_id}`,
        payloadDataHL
      );
    });
    await Promise.all(requestsContacts);

    //update strengths

    await axios.patch(`http://localhost:8080/api/hospital-strength/${strengthsEdit._id}`, cleanPayload(strengthsEdit));

    // update Problem
    const requestsProblems = (problemEdit || []).map((problem: any) => {
         const { _id,hospitalId, createdAt, updatedAt, __v, ...payloadDataHL } = problem;
      return axios.patch(
        `http://localhost:8080/api/hospital-problem/${_id}`,
        payloadDataHL
      );
    });
    await Promise.all(requestsProblems);

    //update dataSources
      const requestsDataSources = (dataSourcesEdit || []).map((dataScource: any) => {
      const { _id,hospitalId, createdAt, updatedAt, __v, ...payload } = dataScource;

      return axios.patch(
        `http://localhost:8080/api/hospital-data-source/${_id}`,
        payload
      );
    });
    await Promise.all(requestsDataSources);

    //update dataHightLight
    await axios.patch(`http://localhost:8080/api/hospital-data-highlight/${dataHighLightEdit._id}`, cleanPayload(dataHighLightEdit));

    //update readiness
    await axios.patch(`http://localhost:8080/api/hospital-readiness/${readinessEdit._id}`, cleanPayload(readinessEdit));

    alert("Cập nhật thông tin bệnh viện thành công!");
    
  } catch (error) {
    console.error(error);
    alert("Có lỗi khi cập nhật!");
  }
 }

 //Validation
 const validateStrengths = () => {
  const patient = Number(strengthsEdit?.patientPerYear || 0);
  const special = Number(strengthsEdit?.specialCases || 0);
  const icu = Number(strengthsEdit?.icuCases || 0);

  let newErrors = {
    patientPerYear: "",
    specialCases: "",
    icuCases: ""
  };

// check specialCases
  if (special > patient) {
    newErrors.specialCases =
      "Số ca bệnh đặc thù phải nhỏ hơn số bệnh nhân/năm";
    alert("Số ca bệnh đặc thù phải nhỏ hơn số bệnh nhân/năm")
    setErrors(newErrors);

    setTimeout(() => {
      specialCasesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);

    return false;
  }

  // check icuCases
  if (icu > patient) {
    newErrors.icuCases =
      "Số ca nặng phải nhỏ hơn số bệnh nhân/năm";
    alert("Số ca nặng phải nhỏ hơn số bệnh nhân/năm")
    setErrors(newErrors);

    setTimeout(() => {
      icuCasesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);

    return false;
  }

  setErrors(newErrors);
  return true;
};
 

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
      ← Quay lại
      </button>

      {/*HOSPITAL INFO */}
      <Section title="PHẦN 0. THÔNG TIN CHUNG">
        <h2 className="font-semibold w-1/3">0.1. Thông tin đơn vị</h2>
        <table className="w-full border">
          <tbody>
            <tr>
              <td className="font-semibold w-1/3 border">Tên bệnh viện:</td>
              <td className="border">
                <input className="w-full" type="text" 
                value={hospitalEdit?.hospitalName}
                onChange={(e) => setHospitalEdit({...hospitalEdit, hospitalName: e.target.value})}/>               
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Loại bệnh viện:</td>
              <td className="border">
                 <select
                 className="w-full"
                   value={hospitalEdit?.hospitalType}
                    onChange={(e) => setHospitalEdit({...hospitalEdit, hospitalType: e.target.value})}
                 >
                    <option value="da-khoa">Đa khoa</option>
                    <option value="chuyen-khoa">Chuyên khoa</option>
                    <option value="tuyen-cuoi">Tuyến cuối</option>
                    <option value="quan-huyen">Quận / Huyện</option>
                    <option value="khac">Khác</option>
                 </select>
            </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Cơ quan chủ quản:</td>
              <td className="border">
                <input className="w-full" type="text" 
                value={hospitalEdit?.managingOrg} 
                onChange={(e) => setHospitalEdit({...hospitalEdit, managingOrg: e.target.value})}/>               
              </td>
            </tr>
           
            <tr>
              <td className="font-semibold w-1/3 border">Chuyên khoa mũi nhọn:</td>
              <td className="border">
                <input className="w-full" type="text" 
                value={hospitalEdit?.keySpecialty} 
                 onChange={(e) => setHospitalEdit({...hospitalEdit, keySpecialty: e.target.value})}/>               
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Giường bệnh:</td>
              <td className="border">
                <input className="w-full" type="number" min={0} 
                value={hospitalEdit?.bedCount} 
                onChange={(e) => setHospitalEdit({...hospitalEdit, bedCount: e.target.value})}/>             
              </td>
            </tr>
            

             <tr>
              <td className="font-semibold w-1/3 border">Ngoại trú/năm (Theo năm gần nhất):</td>
              <td className="border">
                <input className="w-full" type="number" min={0}
                value={hospitalEdit?.outpatientPerYear} 
                 onChange={(e) => setHospitalEdit({...hospitalEdit, outpatientPerYear: e.target.value})}/>            
              </td>
            </tr>
             <tr>
              <td className="font-semibold w-1/3 border">Nội trú/năm (Theo năm gần nhất):</td>
              <td className="border">
                <input className="w-full" type="number" min={0}
                  value={hospitalEdit?.inpatientPerYear}
                  onChange={(e) => setHospitalEdit({...hospitalEdit, inpatientPerYear: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Phẫu thuật/năm (Theo năm gần nhất):</td>
              <td className="border">
                <input className="w-full" type="number" min={0}
                  value={hospitalEdit?.surgeryPerYear}
                 onChange={(e) => setHospitalEdit({...hospitalEdit, surgeryPerYear: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Địa chỉ:</td>
              <td className="border">
                <input className="w-full" type="text"
                  value={hospitalEdit?.address}
                  onChange={(e) => setHospitalEdit({...hospitalEdit, address: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3 border">Website:</td>
              <td className="border">
                 <input className="w-full" type="text"
                  value={hospitalEdit?.website}
                   onChange={(e) => setHospitalEdit({...hospitalEdit, website: e.target.value})}/>
              </td>
            </tr>
          </tbody>
        </table>

        <br /><h2 className="font-semibold w-1/3">0.2. Đầu mối tham gia workshop</h2>
        {contactsEdit.map((c: any) => (
          <div key={c._id} className=" rounded mb-3">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold w-1/3 border">
                    Lãnh đạo phụ trách:
                  </td>
                  <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={c.leader}
                     onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, leader: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                       />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold border">
                    Phòng KHTH / phòng phụ trách:
                  </td>
                  <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={c.department}
                    onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, department: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                       />
                  </td>
                </tr>

                <tr>
                  <td className=" font-semibold border">
                   Bác sĩ/chuyên gia lâm sàng tham gia:
                  </td>
                  <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={c.doctor}
                    onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, doctor: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                       />
                  </td>
                </tr>

                <tr>
                  <td className=" font-semibold border">
                   Dược sĩ dược lâm sàng tham gia:
                  </td>
                  <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={c.pharmacist}
                    onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, pharmacist: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                       />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold border">
                   Đầu mối CNTT / dữ liệu:
                  </td>
                  <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={c.it}
                     onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, it: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold border">
                   Người tổng hợp biểu mẫu:
                  </td>
                  <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={c.owner}
                     onChange={(e) => {
                       const newContacts = contactsEdit.map((item: any) =>
                        item._id === c._id
                            ? { ...item, owner: e.target.value }
                            : item
                        );

                        setContactsEdit(newContacts);
                    }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>    
          </div>
        ))}
      </Section>

      {/* 🧠 STRENGTHS */}
      <Section title="PHẦN A. THẾ MẠNH CHUYÊN MÔN">
        <h2 className="font-semibold w-1/2">A1. Chuyên khoa mũi nhọn</h2>
         <table className="w-full border">
          <tbody>
            <tr>
              <td className="font-semibold w-1/2 border">Chuyên khoa mũi nhọn</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.mainSpecialty} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, mainSpecialty: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Nhóm bệnh phổ biến</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.topDiseases} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, topDiseases: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Nhóm bệnh thuộc thế mạnh chuyên môn</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.strongDiseases} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, strongDiseases: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Kỹ thuật đặc thù / kỹ thuật cao đang triển khai</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.techniques} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, techniques: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Kỹ thuật lợi thế nổi bật của bệnh viện</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.highlightTechniques} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, highlightTechniques: e.target.value})}/>
              </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Dịch vụ hoặc quy trình chuyên môn nào khác biệt so với bệnh viện khác</td>
              <td className="border p-0 h-10">
                <input type="text" 
                value={strengthsEdit?.uniqueServices} 
                className="w-full h-full py-2"
                 onChange={(e) => setStrengthsEdit({...strengthsEdit, uniqueServices: e.target.value})}/>
              </td>
            </tr>
             <tr>
              <td className="font-semibold w-1/2 border">Nhóm bệnh hoặc nhóm bệnh nhân mà bệnh viện tiếp nhận nhiều nhất</td>
              <td className="border p-0 h-10">
                <input type="text" 
                value={strengthsEdit?.mainPatientGroup} 
                className="w-full h-full py-2"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, mainPatientGroup: e.target.value})}/>
              </td>
            </tr>
            </tbody>
            </table>
            
            <br />
            <h2 className="font-semibold w-1/2">A2. Quy mô hoạt động chuyên môn</h2>
            <table className="w-full border ">           
            <tbody>
             <tr>
              <td className="font-semibold w-1/2 border">Số bệnh nhân/năm (Theo năm gần nhất)</td>
              <td className="border">
                <input type="number" min={0}
                value={strengthsEdit?.patientPerYear} 
               className={`w-full h-full py-2 ${errors.specialCases ||errors.icuCases ? "text-red-500 " : ""}`}
                
                onChange={(e) => setStrengthsEdit({...strengthsEdit, patientPerYear: e.target.value})}/>
             </td>
            </tr>
            <tr ref={specialCasesRef}>
              <td className="font-semibold w-1/2 border">Số ca bệnh đặc thù/năm (Theo năm gần nhất)</td>
              <td className={`border`}>
                <input type="number" min={0} 
                value={strengthsEdit?.specialCases} 
                className={`w-full h-full py-2 ${errors.specialCases ? "text-red-500 " : ""}`}
                onChange={(e) => setStrengthsEdit({...strengthsEdit, specialCases: e.target.value})}/>
              </td>
            </tr>
            <tr ref={icuCasesRef}>
              <td className="font-semibold w-1/2 border">Số ca nặng / ICU / cấp cứu liên quan</td>
              <td className={`border`}>
                <input type="number" min={0}
                value={strengthsEdit?.icuCases} 
                className={`w-full h-full py-2 ${errors.icuCases ? "text-red-500 " : ""}`}
                onChange={(e) => setStrengthsEdit({...strengthsEdit, icuCases: e.target.value})}/>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Thời gian tích lũy dữ liệu của chuyên khoa thế mạnh (VD: 5 năm, 2020-2025)</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.dataDuration} 
                className="w-full h-full py-2"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, dataDuration: e.target.value})}/>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Số năm triển khai kỹ thuật đặc thù (VD: 5 năm, 2020-2025)</td>
              <td className="border">
                 <input 
                value={strengthsEdit?.techYears} 
                className="w-full h-full py-2"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, techYears: e.target.value})}/>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Có chuỗi dữ liệu theo dõi dài hạn hay không</td>
              <td className="border">
                <select
                    className="w-full"
                    value={strengthsEdit?.longTermData.toString()}
                    onChange={(e) =>
                        setStrengthsEdit({
                        ...strengthsEdit,
                        longTermData: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Thời gian theo dõi (VD: 5 năm, 2020-2025)</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.trackingTime || "Không có thông tin"} 
                className="w-full"
                onChange={(e) => setStrengthsEdit({...strengthsEdit, trackingTime: e.target.value})}/>
             </td>
            </tr>
            </tbody>
            </table>

            <br />
            <h2 className="font-semibold w-1/2">A3. Nhận diện lợi thế chuyên môn</h2>
            <table className="w-full border ">
            <tbody>
            <tr>
              <td className="font-semibold w-1/2 border">Lĩnh vực giỏi nhất trong hệ thống y tế thành phố</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.topTierSpecialty || "Không có thông tin"} 
                className="w-full "
                onChange={(e) => setStrengthsEdit({...strengthsEdit, topTierSpecialty: e.target.value})}/>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Nhóm bệnh có thể đại diện tiêu biểu cho TP.HCM</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.representativeDiseases || "Không có thông tin"} 
                className="w-full "
                onChange={(e) => setStrengthsEdit({...strengthsEdit, representativeDiseases: e.target.value})}/>
                </td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2 border">Bài toán (vấn đề) nàonếu giải được sẽ tạo tác động lớn nhất</td>
              <td className="border">
                <input type="text" 
                value={strengthsEdit?.highImpactProblem || "Không có thông tin"} 
                className="w-full "
                onChange={(e) => setStrengthsEdit({...strengthsEdit, highImpactProblem: e.target.value})}/>
                </td>
            </tr>
          </tbody>
        </table>       
      </Section>

      {/* ⚠️ PROBLEMS */}
      <Section title="PHẦN B. DANH MỤC BÀI TOÁN/ VẤN ĐỀ CẦN GIẢI QUYẾT ƯU TIÊN">
      {problemEdit.map((p: any, i: number) => 
      {
        const selected = p.affected ? p.affected.split(", ") : [];
        return (
        <div  key={p._id} className="p-1 rounded mb-3 gap-x-6 gap-y-2">
          <table className="w-full ">
            <tbody>
              <tr>
                <td className="font-semibold w-1/2 border">Tên bài toán / vấn đề cần giải quyết</td>
                <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={p.name}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, name: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Mô tả bài toán / vấn đề</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.description}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, description: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Nhóm bài toán</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.category}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, category: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Bối cảnh xuất hiện bài toán</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.context}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, context: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                    </td>
              </tr>

              <tr>
                <td className="font-semibold border">Tần suất biểu hiện</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.frequency}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, frequency: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Mức độ nghiêm trọng</td>
                <td className="border">
                      <input type="text" 
                    className="w-full"
                    value={p.severity}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, severity: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Quy mô ảnh hưởng</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.impact}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, impact: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Đối tượng chịu ảnh hưởng</td>

                <td className="border">
                  <div className="p-2">

                    {/* Selected Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selected.map((item: string) => (
                        <div
                          key={item}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => {
                              const newValues = selected.filter((v: string) => v !== item);

                              const newProblem = problemEdit.map((item2: any) =>
                                item2._id === p._id
                                  ? { ...item2, affected: newValues.join(", ") }
                                  : item2
                              );

                              setProblemEdit(newProblem);
                            }}
                            className="text-blue-500 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Select thêm */}
                    <select
                      className="border p-2 rounded w-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) return;

                        if (!selected.includes(value)) {
                          const newValues = [...selected, value];

                          const newProblem = problemEdit.map((item2: any) =>
                            item2._id === p._id
                              ? { ...item2, affected: newValues.join(", ") }
                              : item2
                          );

                          setProblemEdit(newProblem);
                        }
                      }}
                    >
                      <option value="">Chọn đối tượng</option>
                      <option>Bác sĩ</option>
                      <option>Điều dưỡng</option>
                      <option>Dược sĩ</option>
                      <option>Bệnh nhân</option>
                      <option>Quản lý</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Quyết định nào hiện đang cần được hỗ trợ </td>
                <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={p.decision}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, decision: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Hiện đã có giải pháp chưa</td>
                <td className="border"> 
                    <input type="text" 
                    className="w-full"
                    value={p.solution}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, solution: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Hạn chế của giải pháp hiện có</td>
                <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={p.limitations|| "Không có thông tin"}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, limitations: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Nếu giải được, giá trị mang lại là gì</td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.value}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, value: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Chỉ số nào sẽ cải thiện nếu giải được. 
                  ví dụ: giảm thời gian chờ, giảm biến chứng, giảm tái nhập viện, tăng độ chính xác chẩn đoán, giảm chi phí, giảm quá tải,...
                  </td> 
                <td className="border p-0 h-10">
                     <input type="text" 
                    className="w-full h-full"
                    value={p.metric}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, metric: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Đơn vị/khoa liên quan chính </td>
                <td className="border">
                     <input type="text" 
                    className="w-full"
                    value={p.department}
                     onChange={(e) => {
                       const newProblem = problemEdit.map((item: any) =>
                        item._id === p._id
                            ? { ...item, department: e.target.value }
                            : item
                        );

                        setProblemEdit(newProblem);
                    }}
                    />
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Có dữ liệu thật</td>
                <td className="border">
                    <select
                    className="w-full"
                    value={p?.hasRealData?.toString() || "Không"}
                    onChange={(e) => {
                    const newProblems = problemEdit.map((item: any) =>
                        item._id === p._id
                        ? { ...item, hasRealData: e.target.value === "true" }
                        : item
                    );

                    setProblemEdit(newProblems);
                    }}
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Bài toán xảy ra thường xuyên</td>
                <td className="border">
                    <select
                    className="w-full"
                    value={p?.isFrequent?.toString()}
                    onChange={(e) => {
                    const newProblems = problemEdit.map((item: any) =>
                        item._id === p._id
                        ? { ...item, isFrequent: e.target.value === "true" }
                        : item
                    );

                    setProblemEdit(newProblems);
                    }}
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Có thể cải thiện bằng công nghệ</td>
                <td className="border">
                    <select
                    className="w-full"
                    value={p?.techImprovable?.toString()}
                    onChange={(e) => {
                    const newProblems = problemEdit.map((item: any) =>
                        item._id === p._id
                        ? { ...item, techImprovable: e.target.value === "true" }
                        : item
                    );

                    setProblemEdit(newProblems);
                    }}
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Có thể triển khai pilot trong 6–12 tháng</td>
                <td className="border">
                    <select
                    className="w-full"
                    value={p?.isPilotReady?.toString()}
                    onChange={(e) => {
                    const newProblems = problemEdit.map((item: any) =>
                        item._id === p._id
                        ? { ...item, isPilotReady: e.target.value === "true" }
                        : item
                    );

                    setProblemEdit(newProblems);
                    }}
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">Có khả năng đề xuất cấp thành phố</td>
                <td className="border">
                     <select
                    className="w-full"
                    value={p?.isCityLevel?.toString()}
                    onChange={(e) => {
                    const newProblems = problemEdit.map((item: any) =>
                        item._id === p._id
                        ? { ...item, isCityLevel: e.target.value === "true" }
                        : item
                    );

                    setProblemEdit(newProblems);
                    }}
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                    </select>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      )})}
    </Section>

      {/* 📊 DATA SOURCES */}
       <Section title="PHẦN C. LỢI THẾ DỮ LIỆU">
        <h2 className="font-semibold w-1/3">C1. Danh mục dữ liệu hiện có</h2>
        {dataSourcesEdit.map((d: any, i: number) => (
          <div key={d._id} className=" p-1 rounded mb-2">        
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold w-1/3 border">Tên dữ liệu</td>
                    <td className="border">
                        {d.name}
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Quy mô dữ liệu hiện có</td>
                    <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={d.scale}
                     onChange={(e) => {
                       const newDataSources = dataSourcesEdit.map((item: any) =>
                        item._id === d._id
                            ? { ...item, scale: e.target.value }
                            : item
                        );

                        setdataSourcesEdit(newDataSources);
                    }}
                    />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Liên tục hay rời rạc</td>
                    <td className="border">
                    <select
                        className="w-full"
                        value={d?.type}
                        onChange={(e) => {
                        const newDataSources = dataSourcesEdit.map((item: any) =>
                            item._id === d._id
                            ? { ...item, type: e.target.value  }
                            : item
                        );
                        setdataSourcesEdit(newDataSources);
                        }}
                        >
                        <option value="Liên tục">Liên tục</option>
                        <option value="Rời rạc">Rời rạc</option>
                    </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Lưu ở hệ thống nào</td>
                    <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={d.system}
                     onChange={(e) => {
                       const newDataSources = dataSourcesEdit.map((item: any) =>
                        item._id === d._id
                            ? { ...item, system: e.target.value }
                            : item
                        );

                        setdataSourcesEdit(newDataSources);
                    }}
                    />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Đơn vị quản lý dữ liệu</td>
                    <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={d.owner}
                     onChange={(e) => {
                       const newDataSources = dataSourcesEdit.map((item: any) =>
                        item._id === d._id
                            ? { ...item, owner: e.target.value }
                            : item
                        );

                        setdataSourcesEdit(newDataSources);
                    }}
                    />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Thời gian tích lũy (VD: 5 năm, 2020-2025)</td>
                    <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={d.duration}
                     onChange={(e) => {
                       const newDataSources = dataSourcesEdit.map((item: any) =>
                        item._id === d._id
                            ? { ...item, duration: e.target.value }
                            : item
                        );

                        setdataSourcesEdit(newDataSources);
                    }}
                    />
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Có thể trích xuất được hay không</td>
                    <td className="border">
                        <select
                        className="w-full"
                        value={d?.exportable?.toString()}
                        onChange={(e) => {
                        const newDataSources = dataSourcesEdit.map((item: any) =>
                            item._id === d._id
                            ? { ...item, exportable: e.target.value === "true" }
                            : item
                        );
                        setdataSourcesEdit(newDataSources);
                        }}
                        >
                        <option value="true">Có</option>
                        <option value="false">Không</option>
                        </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold border">Ghi chú</td>
                    <td className="border">
                    <input type="text" 
                    className="w-full"
                    value={d.note}
                     onChange={(e) => {
                       const newDataSources = dataSourcesEdit.map((item: any) =>
                        item._id === d._id
                            ? { ...item, note: e.target.value }
                            : item
                        );

                        setdataSourcesEdit(newDataSources);
                    }}
                    />
                     </td>
                  </tr>

                </tbody>
              </table>
          </div>
        ))}

        <h2 className="font-semibold w-1/3">C2. Dữ liệu đặc thù và vượt trội</h2>
         <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3 border">
                  Dữ liệu nơi khác ít có hoặc không có
                </td>
                <td className="border">
                    <input className="w-full" 
                    value={dataHighLightEdit?.uniqueData} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, uniqueData: e.target.value})}/> 
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Dữ liệu có quy mô lớn nhất
                </td>
                <td className="border">
                     <input className="w-full" 
                    value={dataHighLightEdit?.largestScaleData} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, largestScaleData: e.target.value})}/> 
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Dữ liệu có độ sâu nhất (Nhiều lớp thông tin có thể thu thập được cho 1 ca bệnh)
                </td>
                <td className="border">
                    <input className="w-full" 
                    value={dataHighLightEdit?.deepestData} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, deepestData: e.target.value})}/> 
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Dữ liệu nào theo dõi dài hạn nhất
                </td>
                <td className="border">
                    <input className="w-full" 
                    value={dataHighLightEdit?.longestFollowUpData} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, longestFollowUpData: e.target.value})}/> 
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Dữ liệu đã được số hóa tốt nhất
                </td>
                <td className="border">
                    <input className="w-full" 
                    value={dataHighLightEdit?.bestDigitalizedData} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, bestDigitalizedData: e.target.value})}/>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Dữ liệu nào phù hợp nhất để làm dashboard/quản trị
                </td>
                <td className="border p-0 h-10">
                     <input className="w-full h-full" 
                    value={dataHighLightEdit?.bestForDashboard} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, bestForDashboard: e.target.value})}/>
                </td>
              </tr>

              <tr>
                <td className="font-semibold border">
                  Ví dụ minh họa cụ thể theo bệnh/chuyên khoa (nếu có)
                </td>
                <td className="border p-0 h-10">
                     <input className="w-full h-full" 
                    value={dataHighLightEdit?.caseStudyExample || "Không có dữ liệu"} 
                    onChange={(e) => setdataHighLightEdit({...dataHighLightEdit, caseStudyExample: e.target.value})}/>
                </td>
              </tr>
            </tbody>
          </table>

        <br/><h2 className="font-semibold w-1/3">C3. Khả năng liên kết dữ liệu</h2>
          <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold w-1/3 border">
                Có thể liên kết giữa các nguồn dữ liệu hay không
              </td>
              <td className="border p-0 h-10">
                <select
                 className="w-full h-full"
                   value={dataHighLightEdit?.canLinkSources.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        canLinkSources: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
              <td className="font-semibold border">
                Có mã định danh để nối dữ liệu hay không
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={dataHighLightEdit?.hasUnifiedID.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        hasUnifiedID: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
              <td className="font-semibold border ">
                Có thể nối dữ liệu theo thời gian hay không
              </td>
              <td className="border p-0 h-10">
                <select
                 className="w-full h-full" 
                   value={dataHighLightEdit?.canTrackTime.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        canTrackTime: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
              <td className="font-semibold border">
                Có outcome / nhãn kết quả hay không
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={dataHighLightEdit?.hasOutcomes.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        hasOutcomes: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
              <td className="font-semibold border">
                Có dữ liệu follow-up hay không
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={dataHighLightEdit?.hasFollowUp.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        hasFollowUp: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
              <td className="font-semibold border">
                Có dữ liệu đa phương thức hay không
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={dataHighLightEdit?.isMultimodal.toString()}
                    onChange={(e) =>
                        setdataHighLightEdit({
                        ...dataHighLightEdit,
                        isMultimodal: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>
          </tbody>
        </table>

      </Section>

      {/* 🚀 READINESS */}
      <Section title="PHẦN F. MỨC ĐỘ SẴN SÀNG TRIỂN KHAI">
        <h2 className="font-semibold w-1/3">F1. Đầu mối triển khai nội bộ</h2>
        <table className="w-full border">
            <tbody>
                            <tr>
                <td className="font-semibold border w-1/2">Khoa/phòng đầu mối:</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.department || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, department: e.target.value})}/>
                </td>
            </tr>
            <tr>
                <td className="font-semibold border">Lãnh đạo bảo trợ:</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.leader || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, leader: e.target.value})}/>
                </td>
            </tr>
            <tr>
                <td className="font-semibold border">Chuyên gia lâm sàng phụ trách:</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.expert || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, expert: e.target.value})}/>
                </td>
            </tr>
            <tr>
                <td className="font-semibold border">Đầu mối dữ liệu/CNTT</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.it || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, it: e.target.value})}/>
                </td>
            </tr>
            <tr>
                <td className="font-semibold border">Đầu mối nghiên cứu/KH&CN</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.research || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, research: e.target.value})}/>
                </td>
            </tr>
            <tr>
                <td className="font-semibold border">Dược lâm sàng / quản trị / điều dưỡng liên quan</td>
                <td className="border">
                     <input className="w-full h-full" 
                    value={readinessEdit?.relatedClinicalDepartments || "Không có dữ liệu"} 
                    onChange={(e) => setReadinessEdit({...readinessEdit, relatedClinicalDepartments: e.target.value})}/>
                </td>
            </tr>
            <tr>
                 <td className="font-semibold border">Có nhóm liên ngành nội bộ hay chưa</td>
                <td className="border">
                    <select
                    className="w-full"
                   value={readinessEdit?.interdisciplinary.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        interdisciplinary: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
                </td>
            </tr>
            </tbody>
        </table>

        <br/><h2 className="font-semibold w-1/3">F2. Mức sẵn sàng triển khai</h2>
        <table className="w-full border">
            <tbody>
                <tr>
                <td className="font-semibold border w-1/2">
                Có người chịu trách nhiệm chính
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.hasOwner.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        hasOwner: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                <td className="font-semibold border">
                Có dữ liệu
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.hasData.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        hasData: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>
            
            <tr>
                <td className="font-semibold border">
                Có quyền truy xuất
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.hasAccess.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        hasAccess: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                 <td className="font-semibold border">
                Có khả năng chuẩn hóa
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.standardizable.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        standardizable: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                 <td className="font-semibold border">
               Có thể làm pilot
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.pilot.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        pilot: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                <td className="font-semibold border">
               Có khoa/phòng sẵn sàng phối hợp
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.readyDept.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        readyDept: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                  <td className="font-semibold border">
               Có thể làm trong 6–12 tháng
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.canPilot6to12Months.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        canPilot6to12Months: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                <td className="font-semibold border">
              Có thể phối hợp với đối tác công nghệ
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.partner.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        partner: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>

            <tr>
                 <td className="font-semibold border">
             Có thể đề xuất cấp thành phố
              </td>
              <td className="border">
                <select
                 className="w-full"
                   value={readinessEdit?.cityProposal.toString()}
                    onChange={(e) =>
                        setReadinessEdit({
                        ...readinessEdit,
                        cityProposal: e.target.value === "true",
                        })
                    }
                    >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                 </select>
              </td>
            </tr>
            </tbody>
        </table>
      </Section>
      {/* <Section title="🚀 Mức sẵn sàng triển khai">
        <Grid>
          <Item label="Khoa/phòng đầu mối" value={readiness.department}  />
          <Item label="Lãnh đạo bảo trợ" value={readiness.leader} />
          <Item label="Chuyên gia lâm sàng phụ trách" value={readiness.expert} />
          <Item label="Đầu mối dữ liệu/CNTT" value={readiness.it} />
          <Item label="Đầu mối nghiên cứu/KH&CN" value={readiness.research} />
          <Item label="Dược lâm sàng / quản trị / điều dưỡng liên quan" value={readiness.relatedClinicalDepartments} />
          <Item label="Có nhóm liên ngành nội bộ hay chưa" value={readiness.interdisciplinary ? "Có" : "Không"} />
          <Item label="Có người chịu trách nhiệm chính" value={readiness.hasOwner ? "Có" : "Không"} />
          <Item label="Có dữ liệu" value={readiness.hasData ? "Có" : "Không"} />
          <Item label="Có quyền truy xuất" value={readiness.hasAccess ? "Có" : "Không"} />
          <Item label="Có khả năng chuẩn hóa" value={readiness.standardizable ? "Có" : "Không"} />
          <Item label="Có thể làm pilot" value={readiness.pilot ? "Có" : "Không"} />
          <Item label="Có khoa/phòng sẵn sàng phối hợp" value={readiness.readyDept ? "Có" : "Không"} />
          <Item label="Có thể làm trong 6–12 tháng" value={readiness.canPilot6to12Months ? "Có" : "Không"} />
          <Item label="Có thể phối hợp với đối tác công nghệ" value={readiness.partner ? "Có" : "Không"} />
          <Item label="Có thể đề xuất cấp thành phố" value={readiness.cityProposal ? "Có" : "Không"} />
        </Grid>
      </Section> */}

      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
      ← Quay lại
      </button>
            <button
        onClick={handleEdit}
        className="mb-4 ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 "
      >
        Lưu thay đổi
      </button>

    </div>
  );
}

/* ===== UI HELPERS ===== */

function Section({ title, children }: any) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }: any) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Item({ label, value }: any) {
  return (
    <div >
      <span className="font-semibold">{label}:</span>{" "}
      <span>{value}</span>
    </div>
  );
}