import React, { useState, useEffect } from "react";
import CalendarEvent from "../../components/CalendarEvent";
import CountDashboard from "../../components/CountDashboard";
import Axios from "axios";
import base_url from "../../config/base_url";
import '../../styles/styles.pages/dashboard.css'

export default function Dashboard() {
  const [countProject, setCountProject] = useState(0);
  const [countNews, setCountNews] = useState(0);
  const [countArticle, setCountArticle] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countPayment, setCountPayment] = useState(0);

  useEffect(() => {
    let isMounted = true;
    Axios.get(`${base_url}/countProject`).then((res) => {
      isMounted && setCountProject(res.data[0].countProject);
    });
    Axios.get(`${base_url}/countNews`).then((res) => {
      isMounted && setCountNews(res.data[0].countNews);
    });
    Axios.get(`${base_url}/countArticle`).then((res) => {
      isMounted && setCountArticle(res.data[0].countArticle);
    });
    Axios.get(`${base_url}/countUser`).then((res) => {
      isMounted && setCountUser(res.data[0].countUser);
    });
    Axios.get(`${base_url}/countPayment`).then((res) => {
      isMounted && setCountPayment(res.data[0].countPayment);
    });

    return () => { isMounted = false };
  }, [countProject, countNews, countArticle, countUser, countPayment]);

  return (
    <>
        <div className=" container d-md-flex  mt-3 ">
          <div className="me-md-4">
            <CountDashboard title="โครงการ/กิจกรรม" count={countProject} />
            <CountDashboard title="ข่าว/ประชาสัมพันธ์" count={countNews} />
            <CountDashboard title="บทความวิชาการ/วิจัย" count={countArticle} />
            <CountDashboard title="รายชื่อสมาชิก" count={countUser} />
            <CountDashboard title="ชำระเงินค่าลงทะเบียน" count={countPayment} />
          </div>
          <CalendarEvent />
      </div>
    </>
  );
}
