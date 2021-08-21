import React, { useEffect, useState } from "react";
import Axios from "axios";
import ProjectManage from "./admin/projectManage";
import NewsManage from "./admin/newsManage";
import ArticleManage from "./admin/articleManage";
import PaymentManage from "./admin/paymentManage";
import { Route, Switch, useHistory, NavLink, Link } from "react-router-dom";
import AddNews from "./admin/addNews";
import AddArticle from "./admin/addArticle";
import AddProject from "./admin/addProject";
import EditProject from "./admin/editProject";
import EditNews from "./admin/editNews";
import EditArticle from "./admin/editArticle";
import UserManage from "./admin/userManage";
import EditUser from "./admin/editUser";
import base_url from "../config/base_url";
import Dashboard from "./admin/dashboard";
import HeaderSidebar from "../components/HeaderSidebar";
import "../styles/styles.pages/admin.css";

export default function Admin() {
  let history = useHistory();
  Axios.defaults.withCredentials = true;

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`${base_url}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setIsLoading(true);
        setUser(response.data.user);
      } else {
        history.push("/");
        setIsLoading(false);
      }
    });
    return () => setIsLoading(false);
  }, [history]);

  const logout = (evt) => {
    evt.preventDefault();

    Axios.get(`${base_url}/logout`).then((response) => {
      if (response) {
        history.push("/");
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
              <div className="col-12 col-sm-3 col-xl-2  px-0 bg-dark d-flex sticky-top w-sidebar">
                <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-md-3 px-1 py-2 mt-md-2  text-white  ">
                  <Link
                    to="/"
                    className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none mb-md-4  border-bottom-sidebar w-100"
                  >
                    <img
                      className="d-none d-sm-inline mx-1"
                      src="/img/logo.png"
                      alt="logo"
                      width={40}
                      height={40}
                    />
                    <span className="fs-4  ms-2 ">B</span>
                    <span className="fs-4 d-none d-sm-inline ">
                      IOCAL 
                    </span>
                  </Link>
                  <ul
                    className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                    id="menu"
                  >
                    <li className="w-100">
                      <NavLink
                        to="/admin/dashboard"
                        className="nav-link text-white   px-sm-0 px-2"
                      >
                        <i className="fas fa-home px-md-2 "></i>
                        <span className="ms-md-1 d-none d-sm-inline ">
                          หน้าแรก
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/projectManage"
                        className="nav-link px-sm-0 px-2 text-white"
                      >
                        <i className="fab fa-product-hunt px-md-2"></i>
                        <span className="ms-md-1 d-none d-sm-inline">
                          โครงการ/กิจกรรม
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/newsManage"
                        className="nav-link px-sm-0 px-2 text-white"
                      >
                        <i className="fas fa-newspaper px-md-2"></i>
                        <span className="ms-md-1 d-none d-sm-inline">
                          ข่าว/ประชาสัมพันธ์
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/articleManage"
                        className="nav-link px-sm-0 px-2 text-white"
                      >
                        <i className="far fa-newspaper px-md-2"></i>
                        <span className="ms-md-1 d-none d-sm-inline">
                          บทความวิชาการ/วิจัย
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100">
                      <NavLink
                        to="/admin/userManage"
                        className="nav-link px-sm-0 px-2 text-white"
                      >
                        <i className="fas fa-users px-md-2"></i>
                        <span className="ms-md-1 d-none d-sm-inline">
                          รายชื่อสมาชิก
                        </span>
                      </NavLink>
                    </li>
                    <li className="w-100 mb-md-3">
                      <NavLink
                        to="/admin/paymentManage"
                        className="nav-link px-sm-0 px-2 text-white"
                      >
                        <i className="fas fa-money-check px-md-2"></i>
                        <span className="ms-md-1 me-md-2 d-none d-sm-inline">
                          ชำระเงินค่าลงทะเบียน
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                  <div className="d-md-flex justify-content-between w-100 py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1 text-end me-2 border-top-sidebar">
                    <div className="d-none  d-sm-inline mx-1">
                      ADMIN : {user.toUpperCase()}
                    </div>
                    <Link to="#">
                      <i className="fas fa-sign-out-alt" onClick={logout}></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col d-flex flex-column h-sm-100">
                <main className="row overflow-auto">
               
                  <Switch>
                    <Route path="/admin/dashboard">
                    <HeaderSidebar />
                      <Dashboard />
                    </Route>
                    <Route path="/admin/projectManage" exact>
                      <ProjectManage />
                    </Route>
                    <Route path="/admin/newsManage" exact>
                      <NewsManage />
                    </Route>
                    <Route path="/admin/articleManage" exact>
                      <ArticleManage />
                    </Route>
                    <Route path="/admin/userManage" exact>
                      <UserManage />
                    </Route>
                    <Route path="/admin/paymentManage" exact>
                      <PaymentManage />
                    </Route>
                    <Route path="/admin/newsManage/addNews">
                      <AddNews />
                    </Route>
                    <Route path="/admin/newsManage/editNews/:id">
                      <EditNews />
                    </Route>
                    <Route path="/admin/articleManage/addArticle">
                      <AddArticle />
                    </Route>
                    <Route path="/admin/articleManage/editArticle/:id">
                      <EditArticle />
                    </Route>
                    <Route path="/admin/projectManage/addProject">
                      <AddProject />
                    </Route>
                    <Route path="/admin/projectManage/editProject/:id">
                      <EditProject />
                    </Route>
                    <Route path="/admin/userManage/editUser/:pjID/:userID">
                      <EditUser />
                    </Route>
                  </Switch>
                </main>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
