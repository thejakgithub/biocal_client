import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Link } from "react-router-dom";
import base_url from "../config/base_url";
export default function DetailProject() {
  let { pjID } = useParams();

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

  const { projectName, projectStart, projectEnd, projectPlace, projectFee } =
    input;
  const { projectReply, projectDes, projectSchedule } = file;

  useEffect(() => {
    Axios.get(`${base_url}/projects/${pjID}`).then((res) => {
      let start = dayjs(res.data[0].pjStartDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY");
      let end = dayjs(res.data[0].pjEndDate)
        .locale("th")
        .add(543, "year")
        .format(" DD MMM YYYY");
      setInput({
        projectName: res.data[0].pjName,
        projectStart: start,
        projectEnd: end,
        projectPlace: res.data[0].pjPlace,
        projectFee: res.data[0].pjRegisterFee,
      });
      setFile({
        projectDes: res.data[0].pjDescription,
        projectReply: res.data[0].pjReply,
        projectSchedule: res.data[0].pjSchedule,
      });
    });
  }, [pjID]);

  return (
    <>
      <div className="container d-flex justify-content-center ">
        <div className="card my-4" >
          <div className="card-header bg-success fs-5 text-center  text-white">
            {projectName}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="mb-3 ">
                <label htmlFor="topic_news" className="form-label">
                  สถานที่จัด
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="projectPlace"
                  placeholder="ที่อยู่สถานที่จัด"
                  value={projectPlace}
                  disabled
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    วันที่อบรม
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="projectStart"
                    value={projectStart}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="projectEnd"
                    value={projectEnd}
                    disabled
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="fee" className="form-label">
                    ค่าลงทะเบียน
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    name="projectFee"
                    placeholder="ค่าลงทะเบียนต่อ 1 ท่าน"
                    value={projectFee}
                    disabled
                  />
                </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label w-100">กำหนดการ</label>
                    <label className="form-control cut-text  ">
                      <a
                        href={`/file/project/${projectSchedule}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectSchedule}
                      </a>
                    </label>
                  </div>
                
                <div className="mb-3 ">
                  <label className="form-label">แบบตอบรับ</label>
                  <label className="form-control cut-text ">
                    <a href={`/file/project/${projectReply}`}>{projectReply}</a>
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    รายละเอียดโครงการ/กิจกรรม
                  </label>
                  <label className="form-control cut-text ">
                    <a
                      href={`/file/project/${projectDes}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {projectDes}
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link to={`/registerProject/${pjID}`}>
                <button type="submit" className="btn btn-success me-3">
                  สมัครเข้าร่วม
                </button>
              </Link>
              <Link to={`/userProject/${pjID}/${projectName}`}>
                <button type="button" className="btn btn-success ">
                  รายชื่อสมาชิก
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
