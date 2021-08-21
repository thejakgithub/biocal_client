import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../../config/base_url";
import emailjs from "emailjs-com";

export default function PaymentManage() {
  const [paymentList, setPaymentList] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อโครงการ",
        accessor: "pjName", // accessor is the "key" in the data
      },
      {
        Header: "ชื่อผู้สมัคร",
        accessor: "userName",
      },
      {
        Header: "วันที่ชำระ",
        accessor: "userPayDate",
      },
      {
        Header: "สถานะการชำระ",
        accessor: "userPayStatus", // accessor is the "key" in the data
      },
      {
        Header: "ค่าลงทะเบียน",
        accessor: "pjRegisterFee",
      },
      {
        Header: "สลีปการชำระ",
        accessor: "userReceipt",
      },
      {
        Header: "ยืนยันการชำระ",
        accessor: "confirm", // accessor is the "key" in the data
      },
    ],
    []
  );

  useEffect(() => {
    Axios.get(`${base_url}/payment`).then((res) => {
      setPaymentList(res.data);
    });
  }, []);

  const onConfirmPayment = (pjID, userID) => {
    Axios.put(`${base_url}/payment/${pjID}/${userID}`)
      .then((res) => {
        alert("ยืนยันการชำระค่าลงทะเบียนเรียบร้อย !");

        const payList = paymentList.filter(
          (val) => val.pjID !== pjID || val.userID !== userID
        );
        setPaymentList(payList);

        const payment = paymentList.filter(
          (val) => val.pjID === pjID && val.userID === userID
        );
        emailjs
          .send(
            "biocal",
            "Biocal_Template",
            {
              from_name: "jak171646167@gmail.com",
              to_name: payment[0].userEmail,
              message: `การชำระเงินโครงการ ${payment[0].pjName} ได้รับการยืนยันแล้ว`,
            },
            "user_yHpxbPsDBqUWKxqNzZYeR"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  };

  paymentList.forEach((pay) => {
    if (
      dayjs(pay.userPayDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY") !== "Invalid Date"
    ) {
      pay.userPayDate = dayjs(pay.userPayDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY  HH.mm น.");
    }
    pay.userName = pay.userPrefix + pay.userFirstName + " " + pay.userLastName;
    pay.userReceipt = (
      <Link
        to={`/file/receipts/${pay.userReceipt}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {pay.userReceipt}
      </Link>
    );
    pay["confirm"] = (
      <Link to="#">
        <i
          className="fas fa-money-check"
          onClick={() => {
            if (window.confirm("ต้องการยืนยันการชำระค่าลงทะเบียน ?")) {
              onConfirmPayment(pay.pjID, pay.userID);
            }
          }}
        ></i>
      </Link>
    );
  });

  const data = useMemo(() => [...paymentList], [paymentList]);

  return (
    <Table
      columns={columns}
      data={data}
      title="ตรวจสอบชำระเงินค่าลงทะเบียน"
      add={false}
      size={5}
    />
  );
}
