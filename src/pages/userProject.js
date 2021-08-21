import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";
import '../styles/styles.pages/userproject.css'

export default function UserProject() {
  let { pjID } = useParams();
  let { projectName } = useParams();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    Axios.get(`${base_url}/userproject/${pjID}`).then((res) => {
      setUserList(res.data);
    });
  }, [pjID]);

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อสมาชิก",
        accessor: "userName",
      },
      {
        Header: "หน่วยงาน",
        accessor: "userDepartment",
        // accessor is the "key" in the data
      },
      {
        Header: "วันที่ชำระค่าลงทะเบียน",
        accessor: "userPayDate", // accessor is the "key" in the data
        // accessor is the "key" in the data
      },
      {
        Header: "สถานะการชำระค่าลงทะเบียน",
        accessor: "userPayStatus",
      },
    ],
    []
  );

  userList.forEach((user) => {
    if (
      dayjs(user.userPayDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY") !== "Invalid Date"
    ) {
      user.userPayDate = dayjs(user.userPayDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YY - HH.mm น.");
    }
    user.userName =
      user.userPrefix + user.userFirstName + "   " + user.userLastName;
  });

  const data = useMemo(() => [...userList], [userList]);

  return (
    <>
      <div className="wrapper-userproject container">
        <Table
          title={`รายชื่อสมาชิก ${projectName}`}
          columns={columns}
          data={data}
          more={true}
          size={6}
        />
      </div>
    </>
  );
}
