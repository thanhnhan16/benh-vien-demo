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
        <Grid>
          <Item label="Tên bệnh viện" value={hospital?.hospitalName || "N/A"} />
          <Item label="Loại bệnh viện" value={hospital?.hospitalType} />
          <Item label="Cơ quan chủ quản" value={hospital?.managingOrg} />
          <Item label="Chuyên khoa chính" value={hospital?.mainSpecialty} />
          <Item label="Chuyên khoa mũi nhọn" value={hospital?.keySpecialty} />
          <Item label="Giường bệnh" value={hospital?.bedCount} />
          <Item label="Ngoại trú/năm" value={hospital?.outpatientPerYear} />
          <Item label="Nội trú/năm" value={hospital?.inpatientPerYear} />
          <Item label="Phẫu thuật/năm" value={hospital?.surgeryPerYear} />
          <Item label="Địa chỉ" value={hospital?.address} />
          <Item label="Website" value={hospital?.website} />
        </Grid>
      </Section>

      {/* 👥 CONTACTS */}
      <Section title="👥 Đầu mối tham gia">
        {contacts.map((c: any, i: number) => (
          <div key={i} className="border p-3 rounded mb-2">
            <div>Lãnh đạo phụ trách: {c.leader}</div>
            <div>Phòng KHTH / phòng phụ trách: {c.department}</div>
            <div>Bác sĩ/chuyên gia lâm sàng tham gia: {c.doctor}</div>
            <div>Dược sĩ dược lâm sàng tham gia: {c.pharmacist}</div>
            <div>Đầu mối CNTT / dữ liệu: {c.it}</div>
            <div>Người tổng hợp biểu mẫu: {c.owner}</div>
          </div>
        ))}
      </Section>

      {/* 🧠 STRENGTHS */}
      <Section title="🧠 Thế mạnh chuyên môn">
        <Grid>
          <Item label="Chuyên khoa chính: " value={strengths.mainSpecialty} />
          <Item label="Nhóm bệnh phổ biến: " value={strengths.topDiseases} />
          <Item label="Nhóm bệnh thuộc thế mạnh chuyên môn: " value={strengths.strongDiseases} />
          <Item label="Kỹ thuật đặc thù / kỹ thuật cao đang triển khai" value={strengths.techniques} />
          <Item label="Kỹ thuật lợi thế nổi bật của bệnh viện" value={strengths.highlightTechniques} />
          <Item label="Dịch vụ hoặc quy trình chuyên môn nào khác biệt so với bệnh viện khác" value={strengths.uniqueServices} />
          <Item label="Nhóm bệnh hoặc nhóm bệnh nhân mà bệnh viện tiếp nhận nhiều nhất" value={strengths.mainPatientGroup} />
          <Item label="Số bệnh nhân/năm" value={strengths.patientPerYear} />
          <Item label="Số ca bệnh đặc thù/năm" value={strengths.specialCases} />
          <Item label="Số ca nặng / ICU / cấp cứu liên quan" value={strengths.icuCases} />
          <Item label="Thời gian tích lũy dữ liệu của chuyên khoa thế mạnh" value={strengths.dataDuration} />
          <Item label="Số năm triển khai kỹ thuật đặc thù" value={strengths.techYears} />
          <Item label="Có chuỗi dữ liệu theo dõi dài hạn hay không" value={strengths.longTermData ? "Có" : "Không"} />
          <Item label="Theo dõi bao lâu" value={strengths.trackingTime} />
          <Item label="Lĩnh vực giỏi nhất trong hệ thống y tế thành phố" value={strengths.topTierSpecialty} />
          <Item label="Nhóm bệnhcó thể đại diện tiêu biểu cho TP.HCM" value={strengths.representativeDiseases} />
          <Item label="Bài toán (vấn đề) nàonếu giải được sẽ tạo tác động lớn nhất" value={strengths.highImpactProblem} />
        </Grid>
        
      </Section>

      {/* ⚠️ PROBLEMS */}

      <Section title="⚠️ Bài toán/Vấn đề cần giải quyết">
      {problems.map((p: any, i: number) => (
        <div
          key={i}
          className="border p-4 rounded mb-3 grid grid-cols-2 gap-x-6 gap-y-2"
        >
          <div>
            <span className="font-semibold">Tên bài toán:</span> {p.name}
          </div>

          <div>
            <span className="font-semibold">Mô tả:</span> {p.description}
          </div>

          <div>
            <span className="font-semibold">Nhóm bài toán:</span> {p.category}
          </div>

          <div>
            <span className="font-semibold">Bối cảnh:</span> {p.context}
          </div>

          <div>
            <span className="font-semibold">Tần suất:</span> {p.frequency}
          </div>

          <div>
            <span className="font-semibold">Mức độ:</span> {p.severity}
          </div>

          <div>
            <span className="font-semibold">Quy mô ảnh hưởng:</span> {p.impact}
          </div>

          <div>
            <span className="font-semibold">Đối tượng:</span> {p.affected}
          </div>

          <div className="col-span-2">
            <span className="font-semibold">
              Quyết định cần hỗ trợ:
            </span>{" "}
            {p.decision}
          </div>

          <div className="col-span-2">
            <span className="font-semibold">
              Giải pháp hiện tại:
            </span>{" "}
            {p.solution}
          </div>

          <div className="col-span-2">
            <span className="font-semibold">
              Hạn chế:
            </span>{" "}
            {p.limitations}
          </div>

          <div>
            <span className="font-semibold">Giá trị:</span> {p.value}
          </div>

          <div>
            <span className="font-semibold">Chỉ số:</span> {p.metric}
          </div>

          <div className="col-span-2">
            <span className="font-semibold">
              Khoa liên quan:
            </span>{" "}
            {p.department}
          </div>

          <div>
            <span className="font-semibold">Có dữ liệu thật:</span> {p.hasRealData ? "Có" : "Không"}
          </div>

          <div>
            <span className="font-semibold">Bài toán xảy ra thường xuyên:</span> {p.isFrequent ? "Có" : "Không"}
          </div>

          <div>
            <span className="font-semibold">Có thể cải thiện bằng công nghệ:</span> {p.techImprovable ? "Có" : "Không"}
          </div>

          <div>
            <span className="font-semibold">Có thể triển khai pilot trong 6–12 tháng:</span> {p.isPilotReady ? "Có" : "Không"}
          </div>

          <div>
            <span className="font-semibold">Có khả năng đề xuất cấp thành phố:</span> {p.isCityLevel ? "Có" : "Không"}
          </div>
          
        </div>
      ))}
    </Section>

      {/* 📊 DATA SOURCES */}
      <Section title="📊 Nguồn dữ liệu hiện có">
        {dataSources.map((d: any, i: number) => (
          <div key={i} className="border p-3 rounded mb-2">
            <div className="font-semibold">{d.name}</div>
            <div>Quy mô dữ liệu hiện có: {d.scale}</div>
            <div>Tần suất phát sinh theo tháng: {d.frequency}</div>
            <div>Liên tục hay rời rạc: {d.type}</div>
            <div>Lưu ở hệ thống nào: {d.system}</div>
            <div>Đơn vị quản lý dữ liệu: {d.owner}</div>
            <div>Thời gian tích lũy: {d.duration}</div>
            <div>Có thể trích xuất được hay không: {d.exportable ? "Có" : "Không"}</div>
            <div>Ghi chú : {d.note}</div>
          </div>
        ))}
      </Section>

      
      <Section title="Dữ liệu đặt thù vượt trội">
        <div>
             <div>
            <span className="font-semibold">Dữ liệu nơi khác ít có hoặc không có:</span> {dataHighlights.uniqueData}
          </div>

          <div>
            <span className="font-semibold">Dữ liệu có quy mô lớn nhất:</span> {dataHighlights.largestScaleData}
          </div>

          <div>
            <span className="font-semibold">Dữ liệu có độ sâu nhất:</span> {dataHighlights.deepestData}
          </div>

          <div>
            <span className="font-semibold">Dữ liệu nào theo dõi dài hạn nhất:</span> {dataHighlights.longestFollowUpData}
          </div>

          <div>
            <span className="font-semibold">Dữ liệu đã được số hóa tốt nhất:</span> {dataHighlights.bestDigitalizedData}
          </div>
                   
          <div>
            <span className="font-semibold">Dữ liệu nào phù hợp nhất để làm dashboard/quản trị:</span> {dataHighlights.bestForDashboard}
          </div>

          <div>
            <span className="font-semibold">Ví dụ minh họa cụ thể theo bệnh/chuyên khoa (nếu có):</span> {dataHighlights.caseStudyExample}
          </div>
        </div>
      </Section>

      <Section title="Khả năng liên kết dữ liệu">
        <Grid>
          <Item label="Có thể liên kết giữa các nguồn dữ liệu hay không" value={dataHighlights.canLinkSources ? "Có" : "Không"} />
          <Item label="Có mã định danh để nối dữ liệu hay không" value={dataHighlights.hasUnifiedID ? "Có" : "Không"} />
          <Item label="Có thể nối dữ liệu theo thời gian hay không" value={dataHighlights.canTrackTime ? "Có" : "Không"} />
          <Item label="Có outcome / nhãn kết quả hay không" value={dataHighlights.hasOutcomes ? "Có" : "Không"} />
          <Item label="Có dữ liệu follow-up hay không" value={dataHighlights.hasFollowUp ? "Có" : "Không"} />
          <Item label="Có dữ liệu đa phương thức hay không" value={dataHighlights.isMultimodal ? "Có" : "Không"} />
        </Grid>
      </Section>

      {/* 🚀 READINESS */}
      <Section title="🚀 Mức sẵn sàng triển khai">
        <Grid>
          <Item label="Khoa/phòng đầu mối" value={readiness.department} />
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
    <div className="text-sm">
      <span className="font-semibold">{label}:</span>{" "}
      <span>{value}</span>
    </div>
  );
}