import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import base_url from "../../config/base_url";

export default function AddProject() {
  const todayTypeDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };
  const today = todayTypeDate();

  const schema = yup.object().shape({
    projectSchedule: yup
      .mixed()
      .test("type", "Invalid file format!", (value) => {
        if (!value.length) return true;
        return value && value[0].type === "application/pdf";
      }),
    projectDes: yup.mixed().test("type", "Invalid file format!", (value) => {
      if (!value.length) return true;
      return value && value[0].type === "application/pdf";
    }),
    projectReply: yup.mixed().test("type", "Invalid file format!", (value) => {
      if (!value.length) return true;
      return (
        (value && value[0].type === "application/msword") ||
        value[0].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const emptyInput = {
    projectName: "",
    projectStart: today,
    projectEnd: today,
    projectPlace: "",
    projectFee: "",
  };

  const [input, setInput] = useState(emptyInput);

  const [success, setSuccess] = useState(false);
  const { projectName, projectPlace, projectFee } = input;

  const onTextClick = () => {
    setSuccess(false);
  };
  const addProject = (data) => {
    const formData = new FormData();
    formData.append("fileDes", data.projectDes[0]);
    formData.append("fileReply", data.projectReply[0]);
    formData.append("fileSchedule", data.projectSchedule[0]);
    formData.append("projectName", data.projectName);
    formData.append("projectStart", data.projectStart);
    formData.append("projectEnd", data.projectEnd);
    formData.append("projectPlace", data.projectPlace);
    formData.append("projectFee", data.projectFee);
    formData.append("projectReply", data.projectReply[0].name);
    formData.append("projectDes", data.projectDes[0].name);
    formData.append("projectSchedule", data.projectSchedule[0].name);
    Axios.post(`${base_url}/projects`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setInput(emptyInput);
        setSuccess(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <>
    
        <header className="bg-success text-white header-sidebar justify-content-between ">
          <h4 className="mx-3">เพิ่มโครงการ/กิจกรรม</h4>
        </header>
        <div className="container d-flex justify-content-center mt-4">
          <div className="card " style={{ width: 700 }}>
            <div className="card-header bg-success fs-5  text-white">
              เพิ่มโครงการ/กิจกรรม
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(addProject)}>
                {success && (
                  <Alert variant="success">
                    เพิ่มโครงการ/กิจกรรม เรียบร้อยแล้ว
                  </Alert>
                )}
                {(errors.projectReply ||
                  errors.projectDes ||
                  errors.projectSchedule) && (
                  <Alert variant="danger">รูปแบบไฟล์ไม่ถูกต้อง !</Alert>
                )}
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="topic_news" className="form-label">
                        โครงการ/กิจกรรม
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="projectName"
                        placeholder="ชื่อโครงการ/กิจกรรม"
                        defaultValue={projectName}
                        required
                        onClick={onTextClick}
                        {...register("projectName")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label ">
                        วันที่อบรม
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="projectStart"
                        defaultValue={today}
                        {...register("projectStart")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        ค่าลงทะเบียน
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        name="projectFee"
                        placeholder="ค่าลงทะเบียนต่อ 1 ท่าน"
                        defaultValue={projectFee}
                        required
                        {...register("projectFee")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        กำหนดการ ( .pdf )
                      </label>
                      <input
                        {...register("projectSchedule")}
                        type="file"
                        className="form-control"
                        name="projectSchedule"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success mt-1"
                      style={{ width: 90 }}
                    >
                      เพิ่ม
                    </button>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="topic_project" className="form-label">
                        สถานที่จัด
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="projectPlace"
                        placeholder="ที่อยู่สถานที่จัด"
                        defaultValue={projectPlace}
                        required
                        {...register("projectPlace")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        วันที่สิ้นสุด
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="projectEnd"
                        defaultValue={today}
                        {...register("projectEnd")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="file" className="form-label">
                        แบบตอบรับ ( .docx )
                      </label>
                      <input
                        {...register("projectReply")}
                        type="file"
                        className="form-control"
                        name="projectReply"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        รายละเอียดโครงการ/กิจกรรม ( .pdf )
                      </label>
                      <input
                        {...register("projectDes")}
                        type="file"
                        className="form-control"
                        name="projectDes"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
     
    </>
  );
}
