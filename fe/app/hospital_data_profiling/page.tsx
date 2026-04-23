"use client";

import axios from "axios";
import { time } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DataItem({ data, index, handleDataSourceChange, fieldErrors }: any) {

  return (
    <div className="border rounded-lg p-3 mb-3">
      <div className="flex justify-between items-center">
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={data.available || false}
           onChange={(e) =>
            handleDataSourceChange(index, "available", e.target.checked)
          }
          />
          {data.name}
        </label>
      </div>

      {data.available && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            placeholder="Quy mô dữ liệu"
            className={`border p-2 rounded ${fieldErrors[`dataSources.${index}.scale`]? "border-red-500": ""}`}
            value={data.scale || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "scale", e.target.value)
            }
          />

          <select
            className={`border p-2 rounded ${fieldErrors[`dataSources.${index}.type`]? "border-red-500": ""}`}
            value={data.type || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "type", e.target.value)
            }
          >
            <option value="">Liên tục / rời rạc</option>
            <option value="continuous">Liên tục</option>
            <option value="discrete">Rời rạc</option>
          </select>

          <input
            placeholder="Lưu ở hệ thống nào"
             className={`border p-2 rounded ${fieldErrors[`dataSources.${index}.system`]? "border-red-500": ""}`}
            value={data.system || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "system", e.target.value)
            }
          />

          <input
            placeholder="Đơn vị quản lý dữ liệu"
            className={`border p-2 rounded ${fieldErrors[`dataSources.${index}.owner`]? "border-red-500": ""}`}
            value={data.owner || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "owner", e.target.value)
            }
          />

          <input
            placeholder="Thời gian tích lũy (VD: 5 năm, 2020-2025)"
            className={`border p-2 rounded ${fieldErrors[`dataSources.${index}.duration`]? "border-red-500": ""}`}
            value={data.duration || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "duration", e.target.value)
            }
          />

          <div className="border p-2 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.exportable || false}
              onChange={(e) =>
                handleDataSourceChange(
                  index,
                  "exportable",
                  e.target.checked
                )
              }
            />
            Có thể trích xuất
          </div>

          <textarea
            placeholder="Ghi chú"
            className="border p-2 rounded col-span-2"
            value={data.note || ""}
            onChange={(e) =>
              handleDataSourceChange(index, "note", e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
}

export default function HospitalForm() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [focusField, setFocusField] = useState("");
  const [loading, setLoading] = useState(false);

  const createProblem = () => ({
    id: String(Date.now() + Math.random()),
    name: "",
    description: "",
    category: "",
    context: "",
    frequency: "",
    severity: "",
    impact: "",
    affected: "",
    decision: "",
    solution: "",
    limitation: "",
    value: "",
    metric: "",
    department: "",
    hasRealData: false,
    isFrequent: false,
    techImprovable: false,
    isPilotReady: false,
    isCityLevel: false,
  });

  //Tạo dữ liệu
  const createDataSource = (name: string) => ({
  id: crypto.randomUUID(),
  name,
  available: false,
  scale: "",
  frequency: "",
  type: "",
  system: "",
  owner: "",
  duration: "",
  exportable: false,
  note: "",
});

  const defaultDataSources = [
    "EMR",
    "HIS",
    "LIS / xét nghiệm",
    "Giải phẫu bệnh",
    "RIS",
    "PACS",
    "CT",
    "MRI",
    "X-ray",
    "Ultrasound",
    "ECG / EEG / monitoring",
    "ICU monitoring",
    "Đơn thuốc / dược lâm sàng",
    "Phẫu thuật / thủ thuật",
    "Khám ngoại trú",
    "Nội trú",
    "Cấp cứu",
    "Theo dõi bệnh mạn",
    "Tái khám / outcome",
    "Tài chính / BHYT / chi phí",
    "Vận hành bệnh viện",
    "Nhân lực / ca trực",
    "Sự cố / an toàn người bệnh",
    "Khảo sát hài lòng",
    "Thiết bị / IoT",
    "Dữ liệu đặc thù khác",
  ];

  const handleDataSourceChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...form.dataSources];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({
      ...form,
      dataSources: updated,
    });
};
 
  const [form, setForm] = useState({
    hospital: {
      hospitalName: "",
      hospitalType: "",
      managingOrg: "",
      mainSpecialty: "",
      keySpecialty: "",
      bedCount: "",
      outpatientPerYear: "",
      inpatientPerYear: "",
      surgeryPerYear: "",
      address: "",
      website: "",
    },
   contacts: [
  {
    id: "",
    leader: "",
    department: "",
    doctor: "",
    pharmacist: "",
    it: "",
    owner: "",
  },
],
    strengths: {
      mainSpecialty: "",
      topDiseases: "",
      strongDiseases: "",
      techniques: "",
      highlightTechniques: "",
      uniqueServices: "",
      mainPatientGroup: "",
      patientPerYear: "",
      specialCases: "",
      icuCases: "",
      dataDuration: "",
      techYears: "",
      longTermData: false,
      trackingTime: "",
      topTierSpecialty: "",
      representativeDiseases: "",
      highImpactProblem: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    problems: Array.from({ length: 5 }, createProblem),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataSources: defaultDataSources.map(createDataSource),

    dataHightLight:{
      uniqueData: "",
      largestScaleData: "",
      deepestData: "",
      longestFollowUpData: "",
      bestDigitalizedData: "",
      bestForDashboard: "",   
      caseStudyExample: "",   
      canLinkSources: false,    
      hasUnifiedID: false,      
      canTrackTime: false,      
      hasOutcomes: false,       
      hasFollowUp: false,       
      isMultimodal: false,      
    },

    readiness: {
      department: "",
      leader: "",
      expert: "",
      it: "",
      research: "",
      relatedClinicalDepartments: "",
      interdisciplinary: false,
      hasOwner: false,
      hasData: false,
      hasAccess: false,
      standardizable: false,
      pilot: false,
      readyDept: false,
      canPilot6to12Months: false,
      partner: false,
      cityProposal: false,
    },
  });

  const tabs = [
    "Thông tin chung",
    "Thế mạnh chuyên môn",
    "Bài toán/Vấn đề",
    "Lợi thế dữ liệu",
    "Mức độ sẵn sàng",
  ];

  const handleChange = (
    section: string,
    field: string,
    value: string | boolean
  ) => {
    setForm({
      ...form,
      [section]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(form as any)[section],
        [field]: value,
      },
    });
  };

  //thêm bài toán/vấn đề
    const handleProblemChange = (
      index: number,
      field: string,
      value: string | boolean
    ) => {
      setForm((prev) => {
        const updated = [...prev.problems];
        updated[index] = { ...updated[index], [field]: value };

        return {
          ...prev,
          problems: updated,
        };
      });
    };

    const addProblem = () => {
      setForm((prev) => ({
        ...prev,
        problems: [...prev.problems, createProblem()],
      }));
    };
    
    //Xóa bài toán/vấn đề
    const removeProblem = (index: number) => {
      setForm((prev) => {
        if (prev.problems.length <= 5) return prev;

        const updated = prev.problems.filter((_, i) => i !== index);

        return {
          ...prev,
          problems: updated,
        };
      });
    };  


const handleContactChange = (
  index: number,
  field: string,
  value: string
) => {
  const updated = [...form.contacts];
  updated[index] = { ...updated[index], [field]: value };

  setForm({
    ...form,
    contacts: updated,
  });
};

const addContact = () => {
  setForm({
    ...form,
    contacts: [
      ...form.contacts,
      {
        id: String(Date.now() + Math.random()),
        leader: "",
        department: "",
        doctor: "",
        pharmacist: "",
        it: "",
        owner: "",
      },
    ],
  });
};

const removeContact = (index: number) => {
  const updated = form.contacts.filter((_, i) => i !== index);

  setForm({
    ...form,
    contacts: updated,
  });
};


const validateHospitalForm = (form: any) => {
  const fieldErrors: any = {};
  const messages: string[] = [];

  //Thông tin bệnh viên
  if (!form.hospital?.hospitalName) {
    fieldErrors["hospital.hospitalName"] = true;
    messages.push("Tên bệnh viện đang trống");
  }

  if (!form.hospital?.hospitalType) {
    fieldErrors["hospital.hospitalType"] = true;
    messages.push("Loại bệnh viện đang trống");
  }

  if (!form.hospital?.managingOrg) {
    fieldErrors["hospital.managingOrg"] = true;
    messages.push("Cơ quan chủ quản đang trống");
  }

  if (!form.hospital?.mainSpecialty) {
    fieldErrors["hospital.mainSpecialty"] = true;
    messages.push("Chuyên khoa chính đang trống");
  }

  if (!form.hospital?.keySpecialty) {
    fieldErrors["hospital.keySpecialty"] = true;
    messages.push("Chuyên khoa mũi nhọn đang trống");
  }
   if (!form.hospital?.bedCount) {
    fieldErrors["hospital.bedCount"] = true;
    messages.push("Quy mô giường bệnh đang trống");
  }
   if (!form.hospital?.outpatientPerYear) {
    fieldErrors["hospital.outpatientPerYear"] = true;
    messages.push("Số lượt khám ngoại trú/năm đang trống");
  }
   if (!form.hospital?.inpatientPerYear) {
    fieldErrors["hospital.inpatientPerYear"] = true;
    messages.push("Số ca nội trú/năm đang trống");
  }
   if (!form.hospital?.surgeryPerYear) {
    fieldErrors["hospital.surgeryPerYear"] = true;
    messages.push("Số ca phẫu thuật/năm đang trống");
  }
   if (!form.hospital?.address) {
    fieldErrors["hospital.address"] = true;
    messages.push("Địa chỉ đang trống");
  }
   if (!form.hospital?.website) {
    fieldErrors["hospital.website"] = true;
    messages.push("Website đang trống");
  }
   if (!form.hospital?.keySpecialty) {
    fieldErrors["hospital.keySpecialty"] = true;
    messages.push("Chuyên khoa mũi nhọn đang trống");
  }
  if (!form.hospital?.bedCount) {
    fieldErrors["hospital.bedCount"] = true;
    messages.push("Quy mô giường bệnh đang trống");
  }
  if (!form.hospital?.outpatientPerYear) {
    fieldErrors["hospital.outpatientPerYear"] = true;
    messages.push("Số lượt khám ngoại trú/năm đang trống");
  }
  if (!form.hospital?.inpatientPerYear) {
    fieldErrors["hospital.inpatientPerYear"] = true;
    messages.push("Số ca nội trú/năm đang trống");
  }
  if (!form.hospital?.surgeryPerYear) {
    fieldErrors["hospital.surgeryPerYear"] = true;
    messages.push("Số ca phẫu thuật/năm đang trống");
  }
  if (!form.hospital?.address) {
    fieldErrors["hospital.address"] = true;
    messages.push("Địa chỉ đang trống");
  }
  if (!form.hospital?.website) {
    fieldErrors["hospital.website"] = true;
    messages.push("Website đang trống");
  }

  // Đầu mối tham gia workshop là thông tin quan trọng
  form.contacts?.forEach((c: any, i: number) => {
    if (!c.leader) {
      fieldErrors[`contacts.${i}.leader`] = true;
      messages.push(`Workshop #${i + 1}: thiếu lãnh đạo phụ trách`);
    }

    if (!c.department) {
      fieldErrors[`contacts.${i}.department`] = true;
      messages.push(`Workshop #${i + 1}: thiếu phòng KHTH`);
    }
    if (!c.doctor) {
      fieldErrors[`contacts.${i}.doctor`] = true;
      messages.push(`Workshop #${i + 1}: Bác sĩ/chuyên gia lâm sàng tham gia đang trống`);
    }
    if (!c.pharmacist) {
      fieldErrors[`contacts.${i}.pharmacist`] = true;
      messages.push(`Workshop #${i + 1}: Dược sĩ dược lâm sàng tham gia đang trống`);
    }
    if (!c.it) {
      fieldErrors[`contacts.${i}.it`] = true;
      messages.push(`Workshop #${i + 1}: Đầu mối CNTT / dữ liệu đang trống`);
    }
    if (!c.owner) {
      fieldErrors[`contacts.${i}.owner`] = true;
      messages.push(`Workshop #${i + 1}: Người tổng hợp biểu mẫu đang trống`);
    }
  });
  //Thế mạnh chuyên môn
  if (!form.strengths?.mainSpecialty) {
    fieldErrors["strengths.mainSpecialty"] = true;
    messages.push("Chuyên khoa chính đang trống");
  }
  if (!form.strengths?.topDiseases) {
    fieldErrors["strengths.topDiseases"] = true;
    messages.push("Nhóm bệnh phổ biến đang trống");
  }
  if (!form.strengths?.strongDiseases) {
    fieldErrors["strengths.strongDiseases"] = true;
    messages.push("Nhóm bệnh thuộc thế mạnh chuyên môn của bệnh viện đang trống");
  }
  if (!form.strengths?.techniques) {
    fieldErrors["strengths.techniques"] = true;
    messages.push("Kỹ thuật đặc thù đang trống");
  }
  if (!form.strengths?.highlightTechniques) {
    fieldErrors["strengths.highlightTechniques"] = true;
    messages.push("Kỹ thuật nổi bật đang trống");
  }
  if (!form.strengths?.uniqueServices) {
    fieldErrors["strengths.uniqueServices"] = true;
    messages.push("Dịch vụ hoặc quy trình chuyên môn khác biệt đang trống");
  }
  if (!form.strengths?.mainPatientGroup) {
    fieldErrors["strengths.mainPatientGroup"] = true;
    messages.push("Nhóm bệnh tiếp nhận nhiều nhất đang trống");
  }
  if (!form.strengths?.patientPerYear) {
    fieldErrors["strengths.patientPerYear"] = true;
    messages.push("Số lượng bệnh nhân/năm đang trống");
  }
  if (!form.strengths?.specialCases) {
    fieldErrors["strengths.specialCases"] = true;
    messages.push("Số ca bệnh đặc thù/năm đang trống");
  }
  if (form.strengths.specialCases> form.strengths.patientPerYear) {
    fieldErrors["strengths.specialCases"] = true;
    fieldErrors["strengths.patientPerYear"] = true;
    messages.push("Số ca bệnh đặc thù/năm không được lớn hơn số lượng bệnh nhân/năm  ");
  }
  if (!form.strengths?.icuCases) {
    fieldErrors["strengths.icuCases"] = true;
    messages.push("Số ca nặng / ICU / cấp cứu đang trống");
  }
   if (form.strengths.icuCases> form.strengths.patientPerYear) {
    fieldErrors["strengths.icuCases"] = true;
    fieldErrors["strengths.patientPerYear"] = true;
    messages.push("Số ca nặng / ICU / cấp cứu không được lớn hơn số lượng bệnh nhân/năm ");
  }
  if (!form.strengths?.dataDuration) {
    fieldErrors["strengths.dataDuration"] = true;
    messages.push("Thời gian tích lũy dữ liệu đang trống");
  }
  if (!form.strengths?.techYears) {
    fieldErrors["strengths.techYears"] = true;
    messages.push("Số năm triển khai kỹ thuật đặc thù đang trống");
  }
  if (!form.strengths?.topTierSpecialty) {
    fieldErrors["strengths.topTierSpecialty"] = true;
    messages.push("Chuyên khoa hàng đầu đang trống");
  }
  if (!form.strengths?.representativeDiseases) {
    fieldErrors["strengths.representativeDiseases"] = true;
    messages.push("Nhóm bệnh đại diện cho thế mạnh chuyên môn đang trống");
  }
   if (!form.strengths?.highImpactProblem) {
    fieldErrors["strengths.highImpactProblem"] = true;
    messages.push("Bài toán có tác động lớn nhất đang trống");
  }
  //Bài toán/vấn đề
  form.problems?.forEach((p: any, i: number) => {
    if (!p.name) {
      fieldErrors[`problems.${i}.name`] = true;
      messages.push(`Bài toán #${i + 1}: Tên đang trống`);
    }
    if (!p.description) {
      fieldErrors[`problems.${i}.description`] = true;
      messages.push(`Bài toán #${i + 1}: Mô tả đang trống`);
    }
    if (!p.category) {
      fieldErrors[`problems.${i}.category`] = true;
      messages.push(`Bài toán #${i + 1}: Nhóm bài toán đang trống`);
    }
    if (!p.context) {
      fieldErrors[`problems.${i}.context`] = true;
      messages.push(`Bài toán #${i + 1}: Bối cảnh xuất hiện đang trống`);
    }
    if (!p.frequency) {
      fieldErrors[`problems.${i}.frequency`] = true;
      messages.push(`Bài toán #${i + 1}: Tần suất biểu hiện đang trống`);
    }
    if (!p.severity) {
      fieldErrors[`problems.${i}.severity`] = true;
      messages.push(`Bài toán #${i + 1}: Mức độ nghiêm trọng đang trống`);
    }
    if (!p.impact) {
      fieldErrors[`problems.${i}.impact`] = true;
      messages.push(`Bài toán #${i + 1}: Quy mô ảnh hưởng đang trống`);
    }
    if (!p.affected) {
      fieldErrors[`problems.${i}.affected`] = true;
      messages.push(`Bài toán #${i + 1}: Ai chịu ảnh hưởng trực tiếp`);
    }
    if (!p.decision) {
      fieldErrors[`problems.${i}.decision`] = true;
      messages.push(`Bài toán #${i + 1}: Quyết định nào hiện đang cần được hỗ trợ đang trống`);
    }
    if (!p.solution) {
      fieldErrors[`problems.${i}.solution`] = true;
      messages.push(`Bài toán #${i + 1}: Giải pháp đang trống`);
    }
    if (!p.limitation) {
      fieldErrors[`problems.${i}.limitation`] = true;
      messages.push(`Bài toán #${i + 1}: Hạn chế của giải pháp đang trống`);
    }
    if (!p.value) {
      fieldErrors[`problems.${i}.value`] = true;
      messages.push(`Bài toán #${i + 1}: Giá trị mang lại đang trống`);
    }
    if (!p.metric) {
      fieldErrors[`problems.${i}.metric`] = true;
      messages.push(`Bài toán #${i + 1}:Chỉ số nào sẽ cải thiện nếu giải được đang trống`);
    }
    if (!p.department) {
      fieldErrors[`problems.${i}.department`] = true;
      messages.push(`Bài toán #${i + 1}: Đơn vị/khoa liên quan chính đang trống`);
    }
    
  });
  //Lợi thế dữ liệu
  form.dataSources.forEach((ds: any, i: number) => {
    // available bằng false thì bỏ qua
    if (!ds.available) return;

    if (!ds.scale) {
      fieldErrors[`dataSources.${i}.scale`] = true;
      messages.push(`${ds.name}: Quy mô dữ liệu đang trống`);
    }

    if (!ds.frequency) {
      fieldErrors[`dataSources.${i}.frequency`] = true;
      messages.push(`${ds.name}: Tần suất đang trống`);
    }

    if (!ds.type) {
      fieldErrors[`dataSources.${i}.type`] = true;
      messages.push(`${ds.name}: Loại dữ liệu đang trống`);
    }

    if (!ds.system) {
      fieldErrors[`dataSources.${i}.system`] = true;
      messages.push(`${ds.name}: Hệ thống lưu trữ đang trống`);
    }

    if (!ds.owner) {
      fieldErrors[`dataSources.${i}.owner`] = true;
      messages.push(`${ds.name}: Đơn vị quản lý đang trống`);
    }

    if (!ds.duration) {
      fieldErrors[`dataSources.${i}.duration`] = true;
      messages.push(`${ds.name}: Thời gian tích lũy đang trống`);
    }
  });
  // Dữ liệu đặc thù
  if (!form.dataHightLight?.uniqueData) {
    fieldErrors["dataHightLight.uniqueData"] = true;
    messages.push("Dữ liệu nơi khác ít có");
  }
  if (!form.dataHightLight?.largestScaleData) {
    fieldErrors["dataHightLight.largestScaleData"] = true;
    messages.push("Dữ liệu nào có quy mô lớn nhất đang trống");
  }
  if (!form.dataHightLight?.deepestData) {
    fieldErrors["dataHightLight.deepestData"] = true;
    messages.push("Dữ liệu có độ sâu nhất đang trống");
  }
  if (!form.dataHightLight?.longestFollowUpData) {
    fieldErrors["dataHightLight.longestFollowUpData"] = true;
    messages.push("Dữ liệu theo dõi dài hạn nhất đang trống");
  }
  if (!form.dataHightLight?.bestDigitalizedData) {
    fieldErrors["dataHightLight.bestDigitalizedData"] = true;
    messages.push(" Dữ liệu số hóa tốt nhất");
  }
  if (!form.dataHightLight?.bestForDashboard) {
    fieldErrors["dataHightLight.bestForDashboard"] = true;
    messages.push("Dữ liệu phù hợp làm quản trị đang trống");
  }

  //Mức độ sẵn sàng
  if (!form.readiness?.department) {
    fieldErrors["readiness.department"] = true;
    messages.push("Khoa/phòng đầu mối đang trống");
  }
  if (!form.readiness?.leader) {
    fieldErrors["readiness.leader"] = true;
    messages.push("Lãnh đạo bảo trợ đang trống");
  }
  if (!form.readiness?.expert) {
    fieldErrors["readiness.expert"] = true;
    messages.push("Chuyên gia lâm sàng phụ trách đang trống");
  }
  if (!form.readiness?.it) {
    fieldErrors["readiness.it"] = true;
    messages.push("Đầu mối dữ liệu/CNTT đang trống");
  }
  if (!form.readiness?.research) {
    fieldErrors["readiness.research"] = true;
    messages.push("Đầu mối nghiên cứu/KH&CN đang trống");
  }
  if (!form.readiness?.relatedClinicalDepartments) {
    fieldErrors["readiness.relatedClinicalDepartments"] = true;
    messages.push("Dược lâm sàng / quản trị / điều dưỡng liên quan đang trống");
  }


  return { fieldErrors, messages };
};

  //save button
  const handleSubmit = async() => {


    //validate dữ liệu

     const { fieldErrors, messages } = validateHospitalForm(form);

  if (messages.length > 0) {
    setFieldErrors(fieldErrors);

    alert("❌ Dữ liệu chưa hợp lệ:\n\n" + messages.join("\n"));
    return;
  }

  setFieldErrors({});


    //Tiến hành lưu dữ liệu
    try {
      //luu thong tin benh vien
      const hospitalRes = await axios.post(
        "http://localhost:8080/api/hospital",
        form.hospital
      );
       console.log(hospitalRes.data);

       //luu dau moi tham gia workshop
       const contacts = form.contacts.filter((contact) => {
          const { leader, department, doctor, pharmacist, it, owner } = contact;

          return (
            leader?.trim() ||
            department?.trim() ||
            doctor?.trim() ||
            pharmacist?.trim() ||
            it?.trim() ||
            owner?.trim()
          );
        });

       for(const contact of contacts) {
        await axios.post(
          "http://localhost:8080/api/hospital-contact",
          {
            ...contact,
            hospitalId: hospitalRes.data._id,
          }
        );
       }

       //luu the manh chuyen mon
        await axios.post(
          "http://localhost:8080/api/hospital-strength",
          {
            ...form.strengths,
            hospitalId: hospitalRes.data._id,
          }
        );
        //luu bai toan van de
        const problems = form.problems          
          .filter(
            (p) =>
              p.name?.trim() ||
              p.description?.trim() ||
              p.category?.trim() ||
              p.context?.trim() ||
              p.frequency?.trim() ||
              p.severity?.trim() ||
              p.impact?.trim() ||
              p.affected?.trim() ||
              p.decision?.trim() ||
              p.solution?.trim() ||
              p.solution?.trim() ||
              p.limitation?.trim() ||
              p.value?.trim() ||
              p.metric?.trim() ||
              p.department?.trim()
          )
          .map((p, index) => ({
            ...p,
            order: index + 1,
          }));

        for (const problem of problems) {
          await axios.post(
            "http://localhost:8080/api/hospital-problem",
            {
              ...problem,
              hospitalId: hospitalRes.data._id,
            }
          );
        }

        for (const dataSource of form.dataSources) {
          const payload =
            dataSource.available
              ? dataSource
              : {
                  ...dataSource,
                  scale: "Không có",
                  frequency: "Không có",
                  type: "Không có",
                  system: "Không có",
                  owner: "Không có",
                  duration: "Không có",
                  exportable: false,
                  note: "Không có hệ thống dữ liệu",
                };

          await axios.post(
            "http://localhost:8080/api/hospital-data-source",
            {
              ...payload,
              hospitalId: hospitalRes.data._id,
            }
          );
        }
        //Lưu dữ liệu đặc thù
        await axios.post(
          "http://localhost:8080/api/hospital-data-highlight",
          {
            ...form.dataHightLight,
            hospitalId: hospitalRes.data._id,
          }
        );


        // luu muc do san sang
        await axios.post(
          "http://localhost:8080/api/hospital-readiness",
          {
            ...form.readiness,
            hospitalId: hospitalRes.data._id,
          }
        );
        alert(`✅ Đã lưu thành công dữ liệu bệnh viện: ${hospitalRes.data.hospitalName}!`);
        router.push("/hospital_list");

    } catch (error: any) {
      if (error.response?.data?.message === "Tên bệnh viện đã tồn tại") {
          alert("❌ Bệnh viện này đã có tên trên hệ thống!");
          return;
        }
      console.log(error.response?.data); 
    }
  };

  //Chọn đối tượng cho nhóm chịu ảnh hưởng 
  const options = [
  "Bác sĩ",
  "Điều dưỡng",
  "Dược sĩ",
  "Bệnh nhân",
  "Quản lý",
  "Khác"
];


  

  return (
    <div className="p-6 max-w-6xl mx-auto">
       <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 flex items-center gap-1"
      >
      ← Quay lại
      </button>
      <h1 className="text-2xl font-bold mb-6">
       Nhập dữ liệu bệnh viện
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded ${
              activeTab === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1 */}
  {activeTab === 0 && (
    <div className="border p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        1. Thông tin đơn vị
      </h2>

      <div className={`grid grid-cols-2 gap-4 mb-6`}>
        <input
          placeholder="Tên bệnh viện"
          className={`border p-2 rounded ${ fieldErrors["hospital.hospitalName"]  ? "border-red-500" : ""}`}
          value={form.hospital.hospitalName || ""}
          onChange={(e) =>
            handleChange("hospital", "hospitalName", e.target.value)
          }
        />

        <select
          className={`border p-2 rounded ${ fieldErrors["hospital.hospitalType"]  ? "border-red-500" : ""}`}
         value={form.hospital.hospitalType || ""}
          onChange={(e) =>
            handleChange("hospital", "hospitalType", e.target.value)
          }
        >
          <option value="">Chọn loại bệnh viện</option>
          <option value="da-khoa">Đa khoa</option>
          <option value="chuyen-khoa">Chuyên khoa</option>
          <option value="tuyen-cuoi">Tuyến cuối</option>
          <option value="quan-huyen">Quận / Huyện</option>
          <option value="khac">Khác</option>
        </select>

        <input
          placeholder="Cơ quan chủ quản"
         className={`border p-2 rounded ${ fieldErrors["hospital.managingOrg"]  ? "border-red-500" : ""}`}
          value={form.hospital.managingOrg || ""}
          onChange={(e) =>
            handleChange("hospital", "managingOrg", e.target.value)
          }
        />

        <input
          placeholder="Chuyên khoa chính"
          className={`border p-2 rounded ${ fieldErrors["hospital.mainSpecialty"]  ? "border-red-500" : ""}`}
          value={form.hospital.mainSpecialty || ""}
          onChange={(e) =>
            handleChange("hospital", "mainSpecialty", e.target.value)
          }
        />

        <input
          placeholder="Chuyên khoa mũi nhọn"
          className={`border p-2 rounded ${ fieldErrors["hospital.keySpecialty"]  ? "border-red-500" : ""}`}
          value={form.hospital.keySpecialty || ""}
          onChange={(e) =>
            handleChange("hospital", "keySpecialty", e.target.value)
          }
        />

        <input
          placeholder="Quy mô giường bệnh"
          className={`border p-2 rounded ${ fieldErrors["hospital.bedCount"]  ? "border-red-500" : ""}`}
          value={form.hospital.bedCount || ""}
          type="number"
          min={0}
          onChange={(e) =>
            handleChange("hospital", "bedCount", e.target.value)
          }
        />

        <input
          placeholder="Số lượt khám ngoại trú/năm (Theo năm gần nhất)"
         className={`border p-2 rounded ${ fieldErrors["hospital.outpatientPerYear"]  ? "border-red-500" : ""}`}
          value={form.hospital.outpatientPerYear || ""}
          type="number"
          min={0}
          onChange={(e) =>
            handleChange("hospital", "outpatientPerYear", e.target.value)
          }
        />

        <input
          placeholder="Số ca nội trú/năm (Theo năm gần nhất)"
          className={`border p-2 rounded ${ fieldErrors["hospital.inpatientPerYear"]  ? "border-red-500" : ""}`}
          value={form.hospital.inpatientPerYear || ""}
          type="number"
          min={0}
          onChange={(e) =>
            handleChange("hospital", "inpatientPerYear", e.target.value)
          }
        />

        <input
          placeholder="Số ca phẫu thuật/năm (Theo năm gần nhất)"
          className={`border p-2 rounded ${ fieldErrors["hospital.surgeryPerYear"]  ? "border-red-500" : ""}`}
          value={form.hospital.surgeryPerYear || ""}
          type="number"
          min={0}
          onChange={(e) =>
            handleChange("hospital", "surgeryPerYear", e.target.value)
          }
        />

        <input
          placeholder="Website"
          className={`border p-2 rounded ${ fieldErrors["hospital.website"]  ? "border-red-500" : ""}`}
          value={form.hospital.website || ""}
          onChange={(e) =>
            handleChange("hospital", "website", e.target.value)
          }
        />

        <textarea
          placeholder="Địa chỉ"
          className={`border p-2 rounded col-span-2 ${ fieldErrors["hospital.address"]  ? "border-red-500" : ""}`}
          value={form.hospital.address || ""}
          onChange={(e) =>
            handleChange("hospital", "address", e.target.value)
          }
        />
      </div>

    {/* 0.2 Workshop */}
    <h2 className="text-xl font-semibold mb-4">
      2. Đầu mối tham gia workshop
    </h2>

    {form.contacts.map((contact, index) => (
      <div
        key={contact.id}
        className="grid grid-cols-2 gap-4 mb-6 border p-4 rounded-lg"
      >
        <input
          placeholder="Lãnh đạo phụ trách KH&CN"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.leader`]  ? "border-red-500" : ""}`}
          value={contact.leader || ""}
          onChange={(e) =>
            handleContactChange(index, "leader", e.target.value)
          }
        />

        <input
          placeholder="Phòng KHTH / phòng phụ trách"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.department`]  ? "border-red-500" : ""}`}
          value={contact.department || ""}
          onChange={(e) =>
            handleContactChange(index, "department", e.target.value)
          }
        />

        <input
          placeholder="Bác sĩ / chuyên gia lâm sàng"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.doctor`]  ? "border-red-500" : ""}`}
          value={contact.doctor || ""}
          onChange={(e) =>
            handleContactChange(index, "doctor", e.target.value)
          }
        />

        <input
          placeholder="Dược sĩ dược lâm sàng"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.pharmacist`]  ? "border-red-500" : ""}`}
          value={contact.pharmacist || ""}
          onChange={(e) =>
            handleContactChange(index, "pharmacist", e.target.value)
          }
        />

        <input
          placeholder="Đầu mối CNTT"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.it`]  ? "border-red-500" : ""}`}
          value={contact.it || ""}
          onChange={(e) =>
            handleContactChange(index, "it", e.target.value)
          }
        />

        <input
          placeholder="Người tổng hợp"
          className={`border p-2 rounded ${ fieldErrors[`contacts.${index}.owner`]  ? "border-red-500" : ""}`}
          value={contact.owner || ""}
          onChange={(e) =>
            handleContactChange(index, "owner", e.target.value)
          }
        />



        <button
          type="button"
          onClick={() => removeContact(index)}
          className="bg-red-500 text-white col-span-2 rounded py-2 hover:bg-red-600"
        >
          Xóa đầu mối
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={addContact}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      + Thêm đầu mối
    </button>
      </div>
    )}

      {/* Tab 2 */}
      {activeTab === 1 && (
        <div className="border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">
            1. Chuyên khoa mũi nhọn
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Chuyên khoa mũi nhọn"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.mainSpecialty"]  ? "border-red-500" : ""}`}
              value={form.strengths.mainSpecialty}
              onChange={(e) =>
                handleChange("strengths", "mainSpecialty", e.target.value)
              }
            />

            <input
              placeholder="Top 3 nhóm bệnh phổ biến nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.topDiseases"]  ? "border-red-500" : ""}`}
              value={form.strengths.topDiseases}
              onChange={(e) =>
                handleChange("strengths", "topDiseases", e.target.value)
              }
            />

            <input
              placeholder="Top 3 nhóm bệnh thế mạnh"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.strongDiseases"]  ? "border-red-500" : ""}`}
              value={form.strengths.strongDiseases}
              onChange={(e) =>
                handleChange("strengths", "strongDiseases", e.target.value)
              }
            />

            <input
              placeholder="Kỹ thuật đặc thù"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.techniques"]  ? "border-red-500" : ""}`}
              value={form.strengths.techniques}
              onChange={(e) =>
                handleChange("strengths", "techniques", e.target.value)
              }
            />

            <input
              placeholder="Kỹ thuật lợi thế nổi bật"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.highlightTechniques"]  ? "border-red-500" : ""}`}
              value={form.strengths.highlightTechniques}
              onChange={(e) =>
                handleChange("strengths", "highlightTechniques", e.target.value)
              }
            />

            <input
              placeholder="Dịch vụ / quy trình khác biệt"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.uniqueServices"]  ? "border-red-500" : ""}`}
              value={form.strengths.uniqueServices}
              onChange={(e) =>
                handleChange("strengths", "uniqueServices", e.target.value)
              }
            />

            <input
              placeholder="Nhóm bệnh tiếp nhận nhiều nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.mainPatientGroup"]  ? "border-red-500" : ""}`}
              value={form.strengths.mainPatientGroup}
              onChange={(e) =>
                handleChange("strengths", "mainPatientGroup", e.target.value)
              }
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            2. Quy mô hoạt động chuyên môn
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Số bệnh nhân/năm (Theo năm gần nhất)"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.patientPerYear"]  ? "border-red-500" : ""}`}
              value={form.strengths.patientPerYear}
              type="number"
              min={0}
              onChange={(e) =>
                handleChange("strengths", "patientPerYear", e.target.value)
              }
            />

            <input
              placeholder="Số ca bệnh đặc thù/năm (Theo năm gần nhất)"
             className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.specialCases"]  ? "border-red-500" : ""}`}
              value={form.strengths.specialCases}
               type="number"
               min={0}
              onChange={(e) =>
                handleChange("strengths", "specialCases", e.target.value)
              }
            />

            <input
              placeholder="Số ca nặng / ICU / cấp cứu"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.icuCases"]  ? "border-red-500" : ""}`}
              value={form.strengths.icuCases}
               type="number"
               min={0}
              onChange={(e) =>
                handleChange("strengths", "icuCases", e.target.value)
              }
            />

            <input
              placeholder="Thời gian tích lũy dữ liệu (VD: 5 năm, 2020-2025)"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.dataDuration"]  ? "border-red-500" : ""}`}
              value={form.strengths.dataDuration}
              onChange={(e) =>
                handleChange("strengths", "dataDuration", e.target.value)
              }
            />

            <input
              placeholder="Số năm triển khai kỹ thuật đặc thù (VD: 5 năm, 2020-2025)"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.techYears"]  ? "border-red-500" : ""}`}
              value={form.strengths.techYears}
              onChange={(e) =>
                handleChange("strengths", "techYears", e.target.value)
              }
            />

            <div className="border p-2 rounded flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.strengths.longTermData || false}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setForm((prev) => ({
                    ...prev,
                    strengths: {
                      ...prev.strengths,
                      longTermData: checked,
                      trackingTime: checked ? prev.strengths.trackingTime : "",
                    },
                  }));
                }}
              />
              Có dữ liệu theo dõi dài hạn
          </div>


            <input
              placeholder="Thời gian theo dõi (VD: 5 năm, 2020-2025)"
              className={`border p-2 rounded ${
                !form.strengths.longTermData
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
              value={form.strengths.trackingTime || ""}
              disabled={!form.strengths.longTermData} 
              onChange={(e) =>
                handleChange("strengths", "trackingTime", e.target.value)
              }
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            3. Nhận diện lợi thế chuyên môn
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Bệnh viện “giỏi nhất” ở lĩnh vực nào trong hệ thống y tế thành phố"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.topTierSpecialty"]  ? "border-red-500" : ""}`}
              value={form.strengths.topTierSpecialty}
              onChange={(e) =>
                handleChange("strengths", "topTierSpecialty", e.target.value)
              }
            />
             <input
              placeholder="Nhóm bệnh nào bệnh viện có thể đại diện tiêu biểu cho TP.HCM"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.representativeDiseases"]  ? "border-red-500" : ""}`}
              value={form.strengths.representativeDiseases}
              onChange={(e) =>
                handleChange("strengths", "representativeDiseases", e.target.value)
              }
            />
             <input
              placeholder="Bài toán (vấn đề) nào của bệnh viện nếu giải được sẽ tạo tác động lớn nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["strengths.highImpactProblem"]  ? "border-red-500" : ""}`}
              value={form.strengths.highImpactProblem}
              onChange={(e) =>
                handleChange("strengths", "highImpactProblem", e.target.value)
              }
            />
          </div>
          
        </div>
      )}

      {/* Tab 3 */}
      {activeTab === 2 && (
        <div className="border p-4 rounded-xl">
         <div><h2 className="text-xl font-semibold mb-4">(Liệt kê tối thiểu 5 bài toán cần giải quyết)</h2></div>
          {form.problems.map((p, i) => {
            const selected = p.affected ? p.affected.split(", ") : [];

            const options = [
              "Bác sĩ",
              "Điều dưỡng",
              "Dược sĩ",
              "Bệnh nhân",
              "Quản lý",
              "Khác"
            ];
          return (          
            <div key={p.id} className="border p-4 mb-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">
                  {i+1}.
                </h2>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  placeholder="Tên bài toán / vấn đề cần giải quyết" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.name`] ? "border-red-500" : ""}`}
                  value={p.name}
                  onChange={(e) => handleProblemChange(i, "name", e.target.value)}
                />
                
                <input 
                  placeholder="Mô tả bài toán / vấn đề"
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.description`] ? "border-red-500" : ""}`}
                  value={p.description}
                  onChange={(e) => handleProblemChange(i, "description", e.target.value)}
                 />

                <select 
                className={`border p-2 rounded ${fieldErrors[`problems.${i}.category`] ? "border-red-500" : ""}`}
                value={p.category}
                onChange={(e) => handleProblemChange(i, "category", e.target.value)}
                >
                  <option value={""}>Nhóm bài toán</option>
                  <option>Chẩn đoán</option>
                  <option>Điều trị</option>
                  <option>Dự phòng</option>
                  <option>Quản lý bệnh mạn</option>
                  <option>Vận hành bệnh viện</option>
                  <option>Chăm sóc bệnh nhân</option>
                  <option>Dược lâm sàng</option>
                  <option>Quản lý</option>
                  <option>Khác</option>
                </select>

                <input 
                  placeholder="Bối cảnh xuất hiện" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.context`] ? "border-red-500" : ""}`}
                  value={p.context}
                  onChange={(e) => handleProblemChange(i, "context", e.target.value)}
                />

                <select className={`border p-2 rounded ${fieldErrors[`problems.${i}.frequency`] ? "border-red-500" : ""}`}
                value={p.frequency}
                onChange={(e) => handleProblemChange(i, "frequency", e.target.value)}
                >
                  <option value={""}>Tần suất</option>
                  <option>Cao</option>
                  <option>Trung bình</option>
                  <option>Thấp</option>
                </select>

                <select className={`border p-2 rounded ${fieldErrors[`problems.${i}.severity`] ? "border-red-500" : ""}`}
                value={p.severity}
                onChange={(e) => handleProblemChange(i, "severity", e.target.value)}
                >
                  <option value={""}>Mức độ nghiêm trọng</option>
                  <option>Cao</option>
                  <option>Trung bình</option>
                  <option>Thấp</option>
                </select>

                <select 
                className={`border p-2 rounded ${fieldErrors[`problems.${i}.impact`] ? "border-red-500" : ""}`}
                value={p.impact}
                onChange={(e) => handleProblemChange(i, "impact", e.target.value)}
                >
                  <option value={""}>Quy mô ảnh hưởng</option>
                  <option>Một khoa</option>
                  <option>Nhiều khoa</option>
                  <option>Toàn bệnh viện</option>
                  <option>Toàn ngành</option>
                </select>
                
                <div className={`border p-2 rounded col-span-2 ${fieldErrors[`problems.${i}.affected`] ? "border-red-500" : ""}`}>
                  <div className="text-sm mb-1 ">
                    Đối tượng chịu ảnh hưởng :
                  </div>

                  {/* Selected Tags */}
                  <div className={`flex flex-wrap gap-2 mb-2 `}>
                    {selected.map((item: string) => (
                      <div
                        key={item}
                        className={`bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1 `}
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => {
                            const newValues = selected.filter(v => v !== item);
                            handleProblemChange(i, "affected", newValues.join(", "));
                          }}
                          className="text-blue-500 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Select */}
                  <select
                    className={`border p-2 rounded w-full ${fieldErrors[`problems.${i}.affected`] ? "border-red-500" : ""}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) return;

                      if (!selected.includes(value)) {
                        const newValues = [...selected, value];
                        handleProblemChange(i, "affected", newValues.join(", "));
                      }
                    }}
                  >
                    <option value="">Chọn đối tượng bị ảnh hưởng</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <input 
                placeholder="Quyết định nào hiện đang cần được hỗ trợ " 
                className={`border p-2 rounded ${fieldErrors[`problems.${i}.decision`] ? "border-red-500" : ""}`}
                value={p.decision}
                onChange={(e) => handleProblemChange(i, "decision", e.target.value)}
                />

                <select className={`border p-2 rounded ${fieldErrors[`problems.${i}.solution`] ? "border-red-500" : ""}`}
                value={p.solution}
                onChange={(e) => handleProblemChange(i, "solution", e.target.value)}
                >
                  <option value={""}>Hiện đã có giải pháp chưa</option>
                  <option>Có</option>
                  <option>Chưa</option>
                  <option>Có ở thế giới, chưa có ở Việt Nam</option>
                  <option>Có ở Việt Nam, chưa có ở bệnh viện</option>
                </select>

                <input 
                  placeholder="Hạn chế của giải pháp hiện có" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.limitation`] ? "border-red-500" : ""}`}
                  value={p.limitation}
                  onChange={(e) => handleProblemChange(i, "limitation", e.target.value)}
                />

                <input 
                  placeholder="Nếu giải được, giá trị mang lại là gì" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.value`] ? "border-red-500" : ""}`}
                  value={p.value}
                  onChange={(e) => handleProblemChange(i, "value", e.target.value)}
                />

                <input 
                  placeholder="Chỉ số nào sẽ cải thiện nếu giải được" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.metric`] ? "border-red-500" : ""}`}
                  value={p.metric}
                  onChange={(e) => handleProblemChange(i, "metric", e.target.value)}
                  onFocus={() => setFocusField("vd")}
                  onBlur={() => setFocusField("")}
                />
                

                <input 
                  placeholder="Đơn vị/khoa liên quan chính" 
                  className={`border p-2 rounded ${fieldErrors[`problems.${i}.department`] ? "border-red-500" : ""}`}
                  value={p.department}
                  onChange={(e) => handleProblemChange(i, "department", e.target.value)}
                />
                {focusField === "vd" && (
                  <label className="col-span-2 w-full text-sm rounded break-words whitespace-normal">
                    ví dụ: giảm thời gian chờ, giảm biến chứng, giảm tái nhập viện, tăng độ chính xác chẩn đoán, giảm chi phí, giảm quá tải
                  </label>
                )}
                
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="border p-2 rounded flex items-center gap-2 ">
                  <input type="checkbox" 
                    checked={p.hasRealData || false}
                    onChange={(e) =>
                      handleProblemChange(i, "hasRealData", e.target.checked)
                    }
                  />
                  Có dữ liệu thật
                </div>

                <div className="border p-2 rounded flex items-center gap-2">
                  <input type="checkbox" 
                    checked={p.isFrequent || false}
                    onChange={(e) =>
                      handleProblemChange(i, "isFrequent", e.target.checked)
                    }
                  />
                  Bài toán có xảy ra thường xuyên
                </div>

                <div className="border p-2 rounded flex items-center gap-2">
                  <input type="checkbox" 
                    checked={p.techImprovable || false}
                    onChange={(e) =>
                      handleProblemChange(i, "techImprovable", e.target.checked)
                    }
                  />
                  Có thể cải thiện bằng công nghệ
                </div>

                <div className="border p-2 rounded flex items-center gap-2">
                  <input type="checkbox" 
                    checked={p.isPilotReady || false}
                    onChange={(e) =>
                      handleProblemChange(i, "isPilotReady", e.target.checked)
                    }
                  />
                  Có thể triển khai pilot trong 6–12 tháng
                  </div>

                  <div className="border p-2 rounded flex items-center gap-2">
                    <input type="checkbox" 
                      checked={p.isCityLevel || false}
                      onChange={(e) =>
                        handleProblemChange(i, "isCityLevel", e.target.checked)
                      }
                    />
                    Có khả năng đề xuất cấp thành phố
                  </div>

              </div>

                {form.problems.length > 5 && (
                  <button
                    type="button"
                    onClick={() => removeProblem(i)}
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa bài toán
                  </button>
                )}
            </div>
         
          )})}

          <button
            onClick={addProblem}
            className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
          >
            Thêm bài toán
          </button>

          

        </div>
      )}

      {/* Tab 4 */}
      {activeTab === 3 && (
        <div className="border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">
            Danh mục dữ liệu
          </h2>

        {form.dataSources.map((item, index) => (
          <DataItem 
            key={item.id} 
            data={item} 
            index={index} 
            handleDataSourceChange={handleDataSourceChange}
            fieldErrors={fieldErrors}
          />
        ))}

          <h2 className="text-xl font-semibold mb-4">
            Dữ liệu đặc thù và vượt trội
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Dữ liệu nào của bệnh viện mà nơi khác ít có hoặc không có"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.uniqueData"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.uniqueData}
              onChange={(e) =>
                handleChange("dataHightLight", "uniqueData", e.target.value)
              }
            />
            <input
              placeholder="Dữ liệu nào có quy mô lớn nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.largestScaleData"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.largestScaleData}
              onChange={(e) =>
                handleChange("dataHightLight", "largestScaleData", e.target.value)
              }
            />
            <input
              placeholder="Dữ liệu nào có độ sâu nhất (Nhiều lớp thông tin có thể thu thập được cho 1 ca bệnh)"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.deepestData"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.deepestData}
              onChange={(e) =>
                handleChange("dataHightLight", "deepestData", e.target.value)
              }
            />
            <input
              placeholder="Dữ liệu nào theo dõi dài hạn nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.longestFollowUpData"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.longestFollowUpData}
              onChange={(e) =>
                handleChange("dataHightLight", "longestFollowUpData", e.target.value)
              }
            />
            <input
              placeholder="Dữ liệu nào đã được số hóa tốt nhất"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.bestDigitalizedData"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.bestDigitalizedData}
              onChange={(e) =>
                handleChange("dataHightLight", "bestDigitalizedData", e.target.value)
              }
            />
            <input
              placeholder="Dữ liệu nào phù hợp nhất để làm dashboard/quản trị"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.bestForDashboard"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.bestForDashboard}
              onChange={(e) =>
                handleChange("dataHightLight", "bestForDashboard", e.target.value)
              }
            />
            <input
              placeholder="Ví dụ minh họa cụ thể theo bệnh/chuyên khoa (nếu có)"
              className={`border p-2 rounded col-span-2 ${ fieldErrors["dataHightLight.caseStudyExample"]  ? "border-red-500" : ""}`}
              value={form.dataHightLight.caseStudyExample}
              onChange={(e) =>
                handleChange("dataHightLight", "caseStudyExample", e.target.value)
              }
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Khả năng liên kết dữ liệu
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.canLinkSources || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "canLinkSources", e.target.checked)
                }
              />
              <label className="ml-2">Có thể liên kết giữa các nguồn dữ liệu</label>
            </div>

            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.hasUnifiedID || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "hasUnifiedID", e.target.checked)
                }
              />
              <label className="ml-2">Có mã định danh để nối dữ liệu</label>
            </div>

            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.canTrackTime || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "canTrackTime", e.target.checked)
                }
              />
              <label className="ml-2">Có thể nối dữ liệu theo thời gian</label>
            </div>

            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.hasOutcomes || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "hasOutcomes", e.target.checked)
                }
              />
              <label className="ml-2">Có outcome/nhãn kết quả </label>
            </div>

            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.hasFollowUp || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "hasFollowUp", e.target.checked)
                }
              />
              <label className="ml-2">Có dữ liệu follow-up</label>
            </div>

            <div className="border p-2 rounded">
              <input
                type="checkbox"
                checked={form.dataHightLight.isMultimodal || false}
                onChange={(e) =>
                  handleChange("dataHightLight", "isMultimodal", e.target.checked)
                }
              />
              <label className="ml-2">Có dữ liệu đa phương thức</label>
            </div>
          </div>

        </div>
      )}

      {/* Tab 5 */}
      {activeTab === 4 && (
  <div className="border p-4 rounded-xl">
    <h2 className="text-xl font-semibold mb-4">
      1. Đầu mối triển khai nội bộ
    </h2>

    <div className="grid grid-cols-2 gap-3 mb-6">
      <input 
        placeholder="Khoa/phòng đầu mối" 
        className={`border p-2 rounded ${fieldErrors["readiness.department"] ? "border-red-500" : ""}`}
        value={form.readiness.department}
         onChange={(e) =>
          handleChange("readiness", "department", e.target.value)
        }
      />
      
      <input 
        placeholder="Lãnh đạo bảo trợ" 
         className={`border p-2 rounded ${fieldErrors["readiness.leader"] ? "border-red-500" : ""}`}
        value={form.readiness.leader}
        onChange={(e) =>
          handleChange("readiness", "leader", e.target.value)
        }
      />

      <input 
      placeholder="Chuyên gia lâm sàng" 
      className={`border p-2 rounded ${fieldErrors["readiness.expert"] ? "border-red-500" : ""}`} 
      value={form.readiness.expert}
      onChange={(e) =>
        handleChange("readiness", "expert", e.target.value)
      }
      />

      <input 
        placeholder="Đầu mối dữ liệu/CNTT" 
        className={`border p-2 rounded ${fieldErrors["readiness.it"] ? "border-red-500" : ""}`} 
        value={form.readiness.it}
        onChange={(e) =>
          handleChange("readiness", "it", e.target.value)
        }
      />

      <input 
        placeholder="Đầu mối nghiên cứu" 
        className={`border p-2 rounded ${fieldErrors["readiness.research"] ? "border-red-500" : ""}`}
        value={form.readiness.research}
          onChange={(e) =>
            handleChange("readiness", "research", e.target.value)
          }
      />

      <input 
      placeholder="Dược lâm sàng/quản trị/điều dưỡng liên quan" 
      className={`border p-2 rounded ${fieldErrors["readiness.relatedClinicalDepartments"] ? "border-red-500" : ""}`} 
      value={form.readiness.relatedClinicalDepartments}
          onChange={(e) =>
            handleChange("readiness", "relatedClinicalDepartments", e.target.value)
          }
      />

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.interdisciplinary || false}
          onChange={(e) =>
            handleChange("readiness", "interdisciplinary", e.target.checked)
          }
        />
        Có nhóm liên ngành nội bộ
      </div>
    </div>

    <h2 className="text-xl font-semibold mb-4">
      2. Mức sẵn sàng triển khai
    </h2>

    <div className="grid grid-cols-2 gap-3">

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.hasOwner || false}
          onChange={(e) =>
            handleChange("readiness", "hasOwner", e.target.checked)
          }
        />
        Có người chịu trách nhiệm
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.hasData || false}
          onChange={(e) =>
            handleChange("readiness", "hasData", e.target.checked)
          }
        />
        Có dữ liệu
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.hasAccess || false}
          onChange={(e) =>
            handleChange("readiness", "hasAccess", e.target.checked)
          }
        />
        Có quyền truy xuất
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.standardizable || false}
          onChange={(e) =>
            handleChange("readiness", "standardizable", e.target.checked)
          }
        />
        Có khả năng chuẩn hóa
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.pilot || false}
          onChange={(e) =>
            handleChange("readiness", "pilot", e.target.checked)
          }
        />
        Có thể làm pilot
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.readyDept || false}
          onChange={(e) =>
            handleChange("readiness", "readyDept", e.target.checked)
          }
        />
        Có khoa/phòng sẵn sàng phối hợp
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.canPilot6to12Months || false}
          onChange={(e) =>
            handleChange("readiness", "canPilot6to12Months", e.target.checked)
          }
        />
        Có thể làm trong 6–12 tháng
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.partner || false}
          onChange={(e) =>
            handleChange("readiness", "partner", e.target.checked)
          }
        />
        Có thể phối hợp với đối tác công nghệ
      </div>

      <div className="border p-2 rounded flex items-center gap-2">
        <input type="checkbox" 
          checked={form.readiness.cityProposal || false}
          onChange={(e) =>
            handleChange("readiness", "cityProposal", e.target.checked)
          }
        />
        Có thể đề xuất cấp thành phố
      </div>

    </div>
  </div>
)}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveTab(Math.max(activeTab - 1, 0))}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          // disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
