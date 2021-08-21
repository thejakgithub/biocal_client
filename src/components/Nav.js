import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ModalAdmin from "./ModalAdmin";
import base_url from "../config/base_url";
import '../styles/styles.components/Nav.css'

export default function Nav() {
  let history = useHistory();

  Axios.defaults.withCredentials = true;

  const [modalShow, setModalShow] = useState(false);

  const onAdmin = () => {
    Axios.get(`${base_url}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        history.push("/admin/dashboard");
      } else {
        setModalShow(true);
      }
    });
  };

  return (
    <div className="wrapper-navbar">
    <nav className="navbar navbar-head  navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-none">
          Biocal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" aria-current="page">
                หน้าแรก
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle ms-2"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                เกี่ยวกับ
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/origin" className="dropdown-item">
                    ที่มาการจัดตั้งมูลนิธิ
                  </Link>
                </li>
                <li>
                  <Link to="/objective" className="dropdown-item">
                    วัตถุประสงค์
                  </Link>
                </li>
                <li>
                  <Link to="/activity" className="dropdown-item">
                    กิจกรรมของมูลนิธิ
                  </Link>
                </li>
                <li>
                  <Link to="/board" className="dropdown-item">
                    คณะกรรมการดำเนินงาน
                  </Link>
                </li>
                <li>
                  <a
                    href="/file/brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    แผ่นพับมูลนิธิ
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                href="https://www.facebook.com/%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%99%E0%B8%B4%E0%B8%98%E0%B8%B4%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%A0%E0%B8%B2%E0%B8%9E-%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A0%E0%B8%B9%E0%B8%A1%E0%B8%B4%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%96%E0%B8%B4%E0%B9%88%E0%B8%99-1866934273338063/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link ms-2"
              >
                ภาพกิจกรรม
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/support" className="nav-link ms-2">
                การสนับสนุน
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/agency" className="nav-link ms-2">
                หน่วยงานที่เกี่ยวข้อง
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/contract"
                className="nav-link dropdown-toggle ms-2"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ติดต่อเรา
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/contract" className="dropdown-item">
                    ติดต่อเรา
                  </Link>
                </li>
                <li>
                  <Link onClick={onAdmin} to="#" className="dropdown-item">
                    ผู้ดูแลระบบ
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <ModalAdmin show={modalShow} onHide={() => setModalShow(false)} />
    </nav>
    </div>
  );
}
