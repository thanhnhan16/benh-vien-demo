"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function HospitalDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/hospital/hospital-full/${id}`
    );
    setData(res.data);
  };

  if (!data) return <div className="p-6">Loading...</div>;

  const {contacts, strengths, problems, dataSources, dataHighlights, readiness, hospital} =
    data;

  //Xuất excel
  const exportToExcel = () => {
  if (!data) return;

  const { contacts, strengths, problems, dataSources, dataHighlights, readiness, hospital } = data;

  // 1. Sheet: Hospital info

 const hospitalSheet = [
  {
    "Tên bệnh viện": hospital.hospitalName,
    "Loại bệnh viện": hospital.hospitalType,
    "Cơ quan chủ quản": hospital.managingOrg,
    "Chuyên khoa chính": hospital.mainSpecialty,
    "Chuyên khoa mũi nhọn": hospital.keySpecialty,
    "Giường bệnh": hospital.bedCount,
    "Ngoại trú/năm": hospital.outpatientPerYear,
    "Nội trú/năm": hospital.inpatientPerYear,
    "Phẫu thuật/năm": hospital.surgeryPerYear,
    "Địa chỉ": hospital.address,
    "Website": hospital.website,

  },
];

  // 2. Contacts 
 const contactsSheet = contacts.map((c: any) => ({
  "Lãnh đạo phụ trách": c.leader,
  "Phòng KHTH": c.department,
  "Bác sĩ tham gia": c.doctor,
  "Dược sĩ": c.pharmacist,
  "CNTT / dữ liệu": c.it,
  "Người tổng hợp": c.owner,
}));

  // 3. Strengths
 const strengthsSheet = [
  {
    "Chuyên khoa chính": strengths.mainSpecialty,
    "Nhóm bệnh phổ biến": strengths.topDiseases,
    "Nhóm bệnh thế mạnh": strengths.strongDiseases,
    "Kỹ thuật đang triển khai": strengths.techniques,
    "Kỹ thuật nổi bật": strengths.highlightTechniques,
    "Dịch vụ khác biệt": strengths.uniqueServices,
    "Nhóm bệnh tiếp nhận nhiều": strengths.mainPatientGroup,
    "Bệnh nhân/năm": strengths.patientPerYear,
    "Ca đặc thù/năm": strengths.specialCases,
    "Ca ICU/cấp cứu": strengths.icuCases,
  },
];

  // 4. Problems
  const problemsSheet = problems.map((p: any) => ({
  "Tên bài toán": p.name,
  "Mô tả": p.description,
  "Nhóm": p.category,
  "Bối cảnh": p.context,
  "Tần suất": p.frequency,
  "Mức độ": p.severity,
  "Ảnh hưởng": p.impact,
  "Đối tượng": p.affected,
  "Quyết định cần hỗ trợ": p.decision,
  "Giải pháp hiện tại": p.solution,
  "Hạn chế": p.limitations,
  "Giá trị": p.value,
  "Chỉ số": p.metric,
  "Khoa liên quan": p.department,
}));

  // 5. Data sources
 const dataSourcesSheet = dataSources.map((d: any) => ({
  "Tên nguồn": d.name,
  "Quy mô dữ liệu": d.scale,
  "Tần suất": d.frequency,
  "Loại dữ liệu": d.type,
  "Hệ thống lưu trữ": d.system,
  "Đơn vị quản lý": d.owner,
  "Thời gian tích lũy": d.duration,
  "Có thể xuất": d.exportable ? "Có" : "Không",
  "Ghi chú": d.note,
}));

// 5.2 Data highlights
const dataHighlightsSheet = [
  {
    "Dữ liệu nơi khác ít có ": dataHighlights.uniqueData,
    "Dữ liệu có quy mô lớn nhất": dataHighlights.largestScaleData,
    "Dữ liệu nào có độ sâu nhất ": dataHighlights.deepestData,
    "Dữ liệu nào theo dõi dài hạn nhất": dataHighlights.longestFollowUpData,
    "Dữ liệu nào đã được số hóa tốt nhất": dataHighlights.bestDigitalizedData,
    "Dữ liệu nào phù hợp nhất để làm dashboard/quản trị": dataHighlights.bestForDashboard,
    "Ví dụ minh họa cụ thể theo bệnh/chuyên khoa (nếu có)": dataHighlights.caseStudyExample,
    "Có thể liên kết giữa các nguồn dữ liệu hay không": dataHighlights.canLinkSources ? "Có" : "Không",
    "Có mã định danh để nối dữ liệu hay không": dataHighlights.hasUnifiedID ? "Có" : "Không",
    "Có thể nối dữ liệu theo thời gian hay không": dataHighlights.canTrackTime ? "Có" : "Không",
    "Có outcome / nhãn kết quả hay không": dataHighlights.hasOutcomes ? "Có" : "Không",
    "Có dữ liệu follow-up hay không": dataHighlights.hasFollowUp ? "Có" : "Không",
    "Có dữ liệu đa phương thức hay không": dataHighlights.isMultimodal ? "Có" : "Không",
  }];

  // 6. Readiness
  const readinessSheet = [
  {
    "Khoa phụ trách": readiness.department,
    "Lãnh đạo bảo trợ": readiness.leader,
    "Chuyên gia": readiness.expert,
    "CNTT": readiness.it,
    "Nghiên cứu": readiness.research,
    "Liên ngành": readiness.interdisciplinary ? "Có" : "Không",
    "Có owner": readiness.hasOwner ? "Có" : "Không",
    "Có dữ liệu": readiness.hasData ? "Có" : "Không",
    "Có truy xuất": readiness.hasAccess ? "Có" : "Không",
    "Chuẩn hoá được": readiness.standardizable ? "Có" : "Không",
    "Pilot": readiness.pilot ? "Có" : "Không",
  },
];

// Workbook
const wb = XLSX.utils.book_new();
  

const createSheet = (data: any[]) => {
  const ws = XLSX.utils.json_to_sheet(data);

  // set width mặc định 50 cho tất cả cột
  const colCount = Object.keys(data?.[0] || {}).length;
  ws["!cols"] = Array(colCount).fill({ wch: 30 });

  return ws;
  };

  XLSX.utils.book_append_sheet(wb, createSheet(hospitalSheet), "Hospital");
  XLSX.utils.book_append_sheet(wb, createSheet(contactsSheet), "Workshop");
  XLSX.utils.book_append_sheet(wb, createSheet(strengthsSheet), "Strengths");
  XLSX.utils.book_append_sheet(wb, createSheet(problemsSheet), "Problems");
  XLSX.utils.book_append_sheet(wb, createSheet(dataSourcesSheet), "DataSources");
  XLSX.utils.book_append_sheet(wb, createSheet(dataHighlightsSheet), "DataHighlights");
  XLSX.utils.book_append_sheet(wb, createSheet(readinessSheet), "Readiness");
  

  // Export file
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `hospital-${hospital.hospitalName || "data"}.xlsx`);
};

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
      ← Quay lại
      </button>

      <button
        onClick={exportToExcel}
        className="mb-4 ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 "
      >
        ⬇️ Xuất Excel
      </button>

      {/* 🏥 HOSPITAL INFO */}
      <Section title="🏥 Thông tin bệnh viện">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold w-1/3">Tên bệnh viện:</td>
              <td>{hospital?.hospitalName }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Loại bệnh viện:</td>
              <td>{hospital?.hospitalType }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Cơ quan chủ quản:</td>
              <td>{hospital?.managingOrg }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Chuyên khoa chính:</td>
              <td>{hospital?.mainSpecialty }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Chuyên khoa mũi nhọn:</td>
              <td>{hospital?.keySpecialty }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Giường bệnh:</td>
              <td>{hospital?.bedCount }</td>
            </tr>
             <tr>
              <td className="font-semibold w-1/3">Ngoại trú/năm:</td>
              <td>{hospital?.outpatientPerYear }</td>
            </tr>
             <tr>
              <td className="font-semibold w-1/3">Nội trú/năm:</td>
              <td>{hospital?.inpatientPerYear }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Phẫu thuật/năm:</td>
              <td>{hospital?.surgeryPerYear }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Địa chỉ:</td>
              <td>{hospital?.address }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/3">Website:</td>
              <td >
                <a
                  href={hospital?.website}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {hospital?.website}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* 👥 CONTACTS */}

      <Section title="👥 Đầu mối tham gia">
        
          {contacts.map((c: any, i: number) => (
          <div key={i} className="border p-3 rounded mb-2">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold w-1/3">
                    Lãnh đạo phụ trách:
                  </td>
                  <td className="">
                    {c.leader}
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">
                    Phòng KHTH / phòng phụ trách:
                  </td>
                  <td >
                    {c.department}
                  </td>
                </tr>

                <tr>
                  <td className=" font-semibold">
                   Bác sĩ/chuyên gia lâm sàng tham gia:
                  </td>
                  <td >
                    {c.doctor}
                  </td>
                </tr>

                <tr>
                  <td className=" font-semibold">
                   Dược sĩ dược lâm sàng tham gia:
                  </td>
                  <td >
                    {c.pharmacist}
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">
                   Đầu mối CNTT / dữ liệu:
                  </td>
                  <td className="">
                    {c.it}
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">
                   Người tổng hợp biểu mẫu:
                  </td>
                  <td >
                    {c.owner}
                  </td>
                </tr>
              </tbody>
            </table>    
          </div>
        ))}
       
    </Section>
      

      {/* 🧠 STRENGTHS */}
      <Section title="🧠 Thế mạnh chuyên môn">
         <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold w-1/2">Chuyên khoa chính</td>
              <td>{strengths?.mainSpecialty }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Nhóm bệnh phổ biến</td>
              <td>{strengths?.topDiseases }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Nhóm bệnh thuộc thế mạnh chuyên môn</td>
              <td>{strengths?.strongDiseases }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Kỹ thuật đặc thù / kỹ thuật cao đang triển khai</td>
              <td>{strengths?.techniques }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Kỹ thuật lợi thế nổi bật của bệnh viện</td>
              <td>{strengths?.highlightTechniques }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Dịch vụ hoặc quy trình chuyên môn nào khác biệt so với bệnh viện khác</td>
              <td>{strengths?.uniqueServices }</td>
            </tr>
             <tr>
              <td className="font-semibold w-1/2">Nhóm bệnh hoặc nhóm bệnh nhân mà bệnh viện tiếp nhận nhiều nhất</td>
              <td>{strengths?.mainPatientGroup}</td>
            </tr>
             <tr>
              <td className="font-semibold w-1/2">Số bệnh nhân/năm</td>
              <td>{strengths?.patientPerYear}</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Số ca bệnh đặc thù/năm</td>
              <td>{strengths?.specialCases }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Số ca nặng / ICU / cấp cứu liên quan</td>
              <td>{strengths?.icuCases }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Thời gian tích lũy dữ liệu của chuyên khoa thế mạnh</td>
              <td>{strengths?.dataDuration }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Số năm triển khai kỹ thuật đặc thù</td>
              <td>{strengths?.techYears }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Có chuỗi dữ liệu theo dõi dài hạn hay không</td>
              <td>{strengths?.longTermData ? "Có" : "Không"}</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Theo dõi bao lâu</td>
              <td>{strengths?.trackingTime || "Không có thông tin"}</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Lĩnh vực giỏi nhất trong hệ thống y tế thành phố</td>
              <td>{strengths?.topTierSpecialty }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Nhóm bệnhcó thể đại diện tiêu biểu cho TP.HCM</td>
              <td>{strengths?.representativeDiseases }</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/2">Bài toán (vấn đề) nàonếu giải được sẽ tạo tác động lớn nhất</td>
              <td>{strengths?.highImpactProblem }</td>
            </tr>
          </tbody>
        </table>
        
      </Section>

      {/* ⚠️ PROBLEMS */}

      <Section title="⚠️ Bài toán/Vấn đề cần giải quyết">
      {problems.map((p: any, i: number) => (
        <div  key={i} className="border p-4 rounded mb-3 gap-x-6 gap-y-2">
          <table className="w-full ">
            <tbody>
              <tr>
                <td className="font-semibold w-1/2">Tên bài toán</td>
                <td>{p.name}</td>
              </tr>

              <tr>
                <td className="font-semibold">Mô tả</td>
                <td>{p.description}</td>
              </tr>

              <tr>
                <td className="font-semibold">Nhóm bài toán</td>
                <td>{p.category}</td>
              </tr>

              <tr>
                <td className="font-semibold">Bối cảnh</td>
                <td>{p.context}</td>
              </tr>

              <tr>
                <td className="font-semibold">Tần suất</td>
                <td>{p.frequency}</td>
              </tr>

              <tr>
                <td className="font-semibold">Mức độ</td>
                <td>{p.severity}</td>
              </tr>

              <tr>
                <td className="font-semibold">Quy mô ảnh hưởng</td>
                <td>{p.impact}</td>
              </tr>

              <tr>
                <td className="font-semibold">Đối tượng</td>
                <td>{p.affected}</td>
              </tr>

              <tr>
                <td className="font-semibold">Quyết định cần hỗ trợ</td>
                <td>{p.decision}</td>
              </tr>

              <tr>
                <td className="font-semibold">Giải pháp hiện tại</td>
                <td>{p.solution}</td>
              </tr>

              <tr>
                <td className="font-semibold">Hạn chế</td>
                <td>{p.limitations || "Không có thông tin"}</td>
              </tr>

              <tr>
                <td className="font-semibold">Giá trị</td>
                <td>{p.value}</td>
              </tr>

              <tr>
                <td className="font-semibold">Chỉ số</td>
                <td>{p.metric}</td>
              </tr>

              <tr>
                <td className="font-semibold">Khoa liên quan</td>
                <td>{p.department}</td>
              </tr>

              <tr>
                <td className="font-semibold">Có dữ liệu thật</td>
                <td>{p.hasRealData ? "Có" : "Không"}</td>
              </tr>

              <tr>
                <td className="font-semibold">Bài toán xảy ra thường xuyên</td>
                <td>{p.isFrequent ? "Có" : "Không"}</td>
              </tr>

              <tr>
                <td className="font-semibold">Có thể cải thiện bằng công nghệ</td>
                <td>{p.techImprovable ? "Có" : "Không"}</td>
              </tr>

              <tr>
                <td className="font-semibold">Có thể triển khai pilot trong 6–12 tháng</td>
                <td>{p.isPilotReady ? "Có" : "Không"}</td>
              </tr>

              <tr>
                <td className="font-semibold">Có khả năng đề xuất cấp thành phố</td>
                <td>{p.isCityLevel ? "Có" : "Không"}</td>
              </tr>

            </tbody>
          </table>
        </div>
      ))}
    </Section>

      {/* 📊 DATA SOURCES */}
      <Section title="📊 Nguồn dữ liệu hiện có">
        {dataSources.map((d: any, i: number) => (
          <div key={i} className="border p-3 rounded mb-2">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold w-1/3">Tên dữ liệu</td>
                    <td>{d.name}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Quy mô dữ liệu hiện có</td>
                    <td>{d.scale}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Tần suất phát sinh theo tháng</td>
                    <td>{d.frequency}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Liên tục hay rời rạc</td>
                    <td>{d.type}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Lưu ở hệ thống nào</td>
                    <td>{d.system}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Đơn vị quản lý dữ liệu</td>
                    <td>{d.owner}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Thời gian tích lũy</td>
                    <td>{d.duration}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Có thể trích xuất được hay không</td>
                    <td>{d.exportable ? "Có" : "Không có"}</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Ghi chú</td>
                    <td>{d.note || "Không có thông tin"}</td>
                  </tr>

                </tbody>
              </table>
          </div>
        ))}
      </Section>

      
      <Section title="Dữ liệu đặt thù vượt trội">
        <div >
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3">
                  Dữ liệu nơi khác ít có hoặc không có
                </td>
                <td>{dataHighlights.uniqueData}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Dữ liệu có quy mô lớn nhất
                </td>
                <td>{dataHighlights.largestScaleData}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Dữ liệu có độ sâu nhất
                </td>
                <td>{dataHighlights.deepestData}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Dữ liệu nào theo dõi dài hạn nhất
                </td>
                <td>{dataHighlights.longestFollowUpData}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Dữ liệu đã được số hóa tốt nhất
                </td>
                <td>{dataHighlights.bestDigitalizedData}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Dữ liệu nào phù hợp nhất để làm dashboard/quản trị
                </td>
                <td>{dataHighlights.bestForDashboard}</td>
              </tr>

              <tr>
                <td className="font-semibold">
                  Ví dụ minh họa cụ thể theo bệnh/chuyên khoa (nếu có)
                </td>
                <td>{dataHighlights.caseStudyExample}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Khả năng liên kết dữ liệu">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold w-1/3">
                Có thể liên kết giữa các nguồn dữ liệu hay không
              </td>
              <td>
                {dataHighlights.canLinkSources ? "Có" : "Không"}
              </td>
            </tr>

            <tr>
              <td className="font-semibold">
                Có mã định danh để nối dữ liệu hay không
              </td>
              <td>
                {dataHighlights.hasUnifiedID ? "Có" : "Không"}
              </td>
            </tr>

            <tr>
              <td className="font-semibold">
                Có thể nối dữ liệu theo thời gian hay không
              </td>
              <td>
                {dataHighlights.canTrackTime ? "Có" : "Không"}
              </td>
            </tr>

            <tr>
              <td className="font-semibold">
                Có outcome / nhãn kết quả hay không
              </td>
              <td>
                {dataHighlights.hasOutcomes ? "Có" : "Không"}
              </td>
            </tr>

            <tr>
              <td className="font-semibold">
                Có dữ liệu follow-up hay không
              </td>
              <td>
                {dataHighlights.hasFollowUp ? "Có" : "Không"}
              </td>
            </tr>

            <tr>
              <td className="font-semibold">
                Có dữ liệu đa phương thức hay không
              </td>
              <td>
                {dataHighlights.isMultimodal ? "Có" : "Không"}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* 🚀 READINESS */}
      <Section title="🚀 Mức sẵn sàng triển khai">
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
      </Section>

      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
      ← Quay lại
      </button>

      <button
        onClick={exportToExcel}
        className="mb-4 ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 "
      >
        ⬇️ Xuất Excel
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