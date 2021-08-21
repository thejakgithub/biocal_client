import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../../config/base_url";

export default function ProjectManage() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    Axios.get(`${base_url}/projects`).then((res) => {
      setProjectList(res.data);
    });
  }, []);

  const onDeleteProject = (id) => {
    Axios.delete(`${base_url}/projects/${id}`)
      .then((res) => {
        if (!res.data.err) {
          setProjectList(
            projectList.filter((val) => {
              return val.pjID !== id;
            })
          );
          alert("ลบโครงการ/กิจกรรม เรียบร้อยแล้ว");
        } else {
          alert("ไม่สามารถลบโครงการ/กิจกรรมนี้ได้ !");
        }
      })
      .catch((err) => {
        if (err) alert(err);
      });
  };


  const columns = useMemo(
    () => [
      {
        Header: "รหัสโครงการ",
        accessor: "pjID", // accessor is the "key" in the data
      },
      {
        Header: "ชื่อโครงการ",
        accessor: "pjName",
      },
      {
        Header: "วันที่เริ่มต้น",
        accessor: "pjStartDate",
        // accessor is the "key" in the data
      },
      {
        Header: "วันที่สิ้นสุด",
        accessor: "pjEndDate",
        // accessor is the "key" in the data
      },
      {
        Header: "สถานที่",
        accessor: "pjPlace", // accessor is the "key" in the data
      },
      {
        Header: "ค่าลงทะเบียน",
        accessor: "pjRegisterFee",
      },
      {
        Header: "แบบต้อนรับ",
        accessor: "pjReply",
      },
      {
        Header: "กำหนดการ",
        accessor: "pjSchedule",
      },
      {
        Header: "รายละเอียด",
        accessor: "pjDescription",
      },
      {
        Header: "แก้ไข",
        accessor: "edit",
      },
      {
        Header: "ลบ",
        accessor: "delete",
      },
    ],
    []
  );

  projectList.forEach((project) => {
    if (
      dayjs(project.pjStartDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY") !== "Invalid Date"
    ) {
      project.pjStartDate = dayjs(project.pjStartDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY");
    }
    if (
      dayjs(project.pjEndDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY") !== "Invalid Date"
    ) {
      project.pjEndDate = dayjs(project.pjEndDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY");
    }

    project.pjReply = (
      <Link to={`/file/projects/${project.pjReply}`}>{project.pjReply}</Link>
    );
    project.pjSchedule = (
      <Link
        to={`/file/projects/${project.pjSchedule}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.pjSchedule}
      </Link>
    );
    project.pjDescription = (
      <Link
        to={`/file/projects/${project.pjDescription}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.pjDescription}
      </Link>
    );
    project["edit"] = (
      <Link to={`./projectManage/editProject/${project.pjID}`}>
        <i className="fas fa-edit"></i>
      </Link>
    );
    project["delete"] = (
      <Link to="#">
        <i
          className="fas fa-trash"
          onClick={() => {
            if (window.confirm("ต้องการลบโครงการ/กิจกรรมนี้หรือไม่ ?")) {
              onDeleteProject(project.pjID);
            }
          }}
        ></i>
      </Link>
    );
  });

  const data = useMemo(() => [...projectList], [projectList]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        title="จัดการโครงการ/กิจกรรม"
        routeAdd="/admin/projectManage/addProject"
        add={true}
        size={5}
      />
    </>
  );
}
