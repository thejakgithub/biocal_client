import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";
import '../styles/styles.pages/more.css'

export default function MoreProject() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    Axios.get(`${base_url}/projects`).then((res) => {
      setProjectList(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
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
        Header: "รายละเอียด",
        accessor: "detail",
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
    project["detail"] = (
      <Link to={`./detailProject/${project.pjID}`}>
        <i className="fas fa-info-circle"></i>
      </Link>
    );
  });

  const data = useMemo(() => [...projectList], [projectList]);

  return (
    <div className="wrapper-userproject container">
      <Table
        title="โครงการ/กิจกรรม"
        columns={columns}
        data={data}
        more={true}
        size={5}
      />
    </div>
  );
}
