import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import base_url from "../../config/base_url";

export default function EditProject() {
  let { id } = useParams();

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
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const emptyInput = {
    projectName: "",
    projectStart: "",
    projectEnd: "",
    projectPlace: "",
    projectFee: "",
  };

  const [input, setInput] = useState(emptyInput);
  const [file, setFile] = useState({
    projectReply: "",
    projectDes: "",
    projectSchedule: "",
  });
  const [success, setSuccess] = useState(false);
  const { projectName, projectStart, projectEnd, projectPlace, projectFee } =
    input;
  const { projectReply, projectDes, projectSchedule } = file;

  useEffect(() => {
    Axios.get(`${base_url}/projects/${id}`).then((res) => {
      let start = dayjs(res.data[0].pjStartDate).format().substr(0, 10);
      let end = dayjs(res.data[0].pjEndDate).format().substr(0, 10);

      setValue("projectName", res.data[0].pjName);
      setValue("projectPlace", res.data[0].pjPlace);
      setValue("projectFee", res.data[0].pjRegisterFee);
      setValue("projectStart", start);
      setValue("projectEnd", end);
      setFile({
        projectDes: res.data[0].pjDescription,
        projectReply: res.data[0].pjReply,
        projectSchedule: res.data[0].pjSchedule,
      });
    });
  }, [id, setValue]);

  const onTextClick = () => {
    setSuccess(false);
  };
  const updateProject = (data) => {
    const formData = new FormData();
    if (!!data.projectDes[0]) {
      formData.append("fileDes", data.projectDes[0]);
    } else {
      formData.append("projectDes", projectDes);
    }
    if (!!data.projectReply[0]) {
      formData.append("fileReply", data.projectReply[0]);
    } else {
      formData.append("projectReply", projectReply);
    }
    if (!!data.projectSchedule[0]) {
      formData.append("fileSchedule", data.projectSchedule[0]);
    } else {
      formData.append("projectSchedule", projectSchedule);
    }
    formData.append("projectName", data.projectName);
    formData.append("projectStart", data.projectStart);
    formData.append("projectEnd", data.projectEnd);
    formData.append("projectPlace", data.projectPlace);
    formData.append("projectFee", data.projectFee);

    Axios.put(`${base_url}/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setSuccess(true);
        setInput({
          projectName: data.projectName,
          projectStart: data.projectStart,
          projectEnd: data.projectEnd,
          projectPlace: data.projectPlace,
          projectFee: data.projectFee,
        });
        setFile({
          projectDes: data.projectDes[0].name,
          projectReply: data.projectReply[0].name,
          projectSchedule: data.projectSchedule[0].name,
        });
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
        <h4 className="mx-3">แก้ไขโครงการ/กิจกรรม</h4>
      </header>
      <div className="container d-flex justify-content-center mt-4">
        <div className="card " style={{ width: 700 }}>
          <div className="card-header bg-success fs-5  text-white">
            แก้ไขโครงการ/กิจกรรม
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(updateProject)}>
              {success && (
                <Alert variant="success">
                  แก้ไขโครงการ/กิจกรรม เรียบร้อยแล้ว
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
                    <label htmlFor="date" className="form-label">
                      วันที่อบรม
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="projectStart"
                      defaultValue={projectStart}
                      required
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
                      defaultvalue={projectFee}
                      required
                      {...register("projectFee")}
                    />
                    <div className="form-text">
                      ค่าลงทะเบียนต่อ 1 ท่าน ( บาท )
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <Link
                        to={`/file/projects/${projectSchedule}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectSchedule}{" "}
                      </Link>
                    </label>
                    <input
                      {...register("projectSchedule")}
                      type="file"
                      className="form-control"
                      name="projectSchedule"
                    />
                    <div className="form-text">กำหนดการ ( .pdf )</div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-1"
                    style={{ width: 90 }}
                  >
                    แก้ไข
                  </button>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="topic_news" className="form-label">
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
                      defaultValue={projectEnd}
                      {...register("projectEnd")}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <Link to={`/file/projects/${projectReply}`}>
                        {projectReply}
                      </Link>
                    </label>
                    <input
                      {...register("projectReply")}
                      type="file"
                      className="form-control"
                      name="projectReply"
                    />
                    <div className="form-text">แบบตอบรับ ( .docx )</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <Link
                        to={`/file/projects/${projectDes}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectDes}
                      </Link>
                    </label>
                    <input
                      {...register("projectDes")}
                      type="file"
                      className="form-control"
                      name="projectDes"
                    />
                    <div className="form-text">
                      รายละเอียดโครงการ/กิจกรรม ( .pdf )
                    </div>
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
