import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../../config/base_url";

export default function UserManage() {
  const [userList, setUserList] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "รหัสสมาชิก",
        accessor: "userID", // accessor is the "key" in the data
      },
      {
        Header: "รหัสโครงการ",
        accessor: "pjID",
      },
      {
        Header: "ชื่อผู้สมัคร",
        accessor: "userName", // accessor is the "key" in the data
      },
      {
        Header: "หน่วยงาน",
        accessor: "userDepartment",
      },
      {
        Header: "Email",
        accessor: "userEmail", // accessor is the "key" in the data
      },
      {
        Header: "เบอร์โทร",
        accessor: "userTel", // accessor is the "key" in the data
      },
      {
        Header: "รับประทานอาหาร",
        accessor: "userMealType", // accessor is the "key" in the data
      },
      {
        Header: "ที่อยู่(สำหรับส่งใบเสร็จ)",
        accessor: "userBillAddress", // accessor is the "key" in the data
      },
      {
        Header: "วันที่ชำระ",
        accessor: "userPayDate", // accessor is the "key" in the data
      },
      {
        Header: "สถานะการชำระ",
        accessor: "userPayStatus", // accessor is the "key" in the data
      },
      {
        Header: "ใบเสร็จชำระเงิน",
        accessor: "userReceipt", // accessor is the "key" in the data
      },
      {
        Header: "แก้ไข",
        accessor: "edit", // accessor is the "key" in the data
      },
      {
        Header: "ลบ",
        accessor: "delete", // accessor is the "key" in the data
      },
    ],
    []
  );

  useEffect(() => {
    Axios.get(`${base_url}/userproject`).then((res) => {
      setUserList(res.data);
    });
  }, []);

  const onUserDelete = (pjID, userID) => {
    Axios.delete(`${base_url}/userproject/${pjID}/${userID}`)
      .then((res) => {
        alert("ลบสมาชิกเรียบร้อยแล้ว !");
        setUserList(
          userList.filter((val) => val.pjID !== pjID || val.userID !== userID)
        );
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  };

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
        .format("DD MMM YYYY  HH.mm น.");
    }
    user.userName =
      user.userPrefix + user.userFirstName + " " + user.userLastName;
    user.userReceipt = (
      <Link
        to={`/file/receipts/${user.userReceipt}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {user.userReceipt}
      </Link>
    );
    user["edit"] = (
      <Link to={`./userManage/editUser/${user.pjID}/${user.userID}`}>
        <i className="fas fa-edit"></i>
      </Link>
    );
    user["delete"] = (
      <Link to="#">
        <i
          className="fas fa-trash"
          onClick={() => {
            if (window.confirm("ต้องการลบสมาชิกคนนี้หรือไม่ ?")) {
              onUserDelete(user.pjID, user.userID);
            }
          }}
        ></i>
      </Link>
    );
  });

  const data = useMemo(() => [...userList], [userList]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        title="รายชื่อสมาชิก"
        add={false}
        size={5}
      />
    </>
  );
}
