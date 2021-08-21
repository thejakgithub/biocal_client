import React, { useState, useEffect } from "react";
import "../styles/styles.pages/registerProject.css";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";

export default function RegisterProject() {
  let { pjID } = useParams();
  let history = useHistory();

  const [userRegister, setUserRegister] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [receipt, setReceipt] = useState(null);

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

  const schema = yup.object().shape({
    fileImg: yup
      .mixed()
      .test("type", "รองรับไฟล์รูปภาพ .png/.jpg/.jpeg เท่านั้น !", (value) => {
        if (!value.length) return true;
        return (
          (value && value[0].type === "image/png") ||
          value[0].type === "image/jpg" ||
          value[0].type === "image/jpeg"
        );
      }),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm(projectFee > 0 && { resolver: yupResolver(schema) });

  const handleChange = (e) => {
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        clearErrors("fileImg");
        setFileImg(URL.createObjectURL(e.target.files[0]));
        setReceipt(e.target.files[0]);
      } else {
        setFileImg(null);
        setReceipt(null);
        setError("fileImg", {
          type: "manual",
          message: "รองรับไฟล์รูปภาพ .png/.jpg/.jpeg เท่านั้น !",
        });
      }
    } else {
      setFileImg(null);
      setReceipt(null);
    }
  };

  const editUser = () => {
    setUserRegister(false);
    setFileImg(false);
  };

  function setInputFilter(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      if (textbox) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        });
      }
    });
  }

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

    setInputFilter(document.getElementById("inputTel"), function (value) {
      return /^\d*$/.test(value);
    });
  }, [pjID]);

  const onSubmitUser = (evt) => {
    evt.preventDefault();
    setUserRegister(true);
  };
  const onSubmitPayment = (data) => {
    const formData = new FormData();
    formData.append("pjID", pjID);
    formData.append("userPrefix", data.prefix);
    formData.append("userFirstName", data.firstName);
    formData.append("userLastName", data.lastName);
    formData.append("userDepartment", data.department);
    formData.append("userEmail", data.email);
    formData.append("userTel", data.tel);
    formData.append("userMealType", data.mealType);
    formData.append("userBillAddress", data.billAdress);
    formData.append(
      "userPayDate",
      dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    );
    if (projectFee !== 0) {
      formData.append("userPayStatus", "รอการยืนยัน");
      formData.append("userReceipt", receipt);
    } else {
      formData.append("userPayStatus", "ไม่ต้องชำระ");
      formData.append("userReceipt", "");
    }
    Axios.post(`${base_url}/userproject`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("ชำระค่าลงทะเบียนเรียบร้อย !!");
        history.push(`/userProject/${pjID}/${projectName}`);
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  };

  return (
    <>
      {!userRegister ? (
        <div className="d-flex justify-content-center">
          <img
            src="/img/pencil-treeg-concept-logo.jpg"
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
            alt="pencil-tree"
          />
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <form onSubmit={onSubmitUser}>
                    <div className="col-md-9 col-lg-9 mx-auto  ">
                      <div className="text-center">
                        <h3 className="login-heading ">สมัครเข้าร่วมโครงการ</h3>
                        <h3 className="login-heading2 mb-5">{projectName}</h3>
                      </div>

                      <div className="form-group " require>
                        <div className="d-inline-flex mb-3">
                          <div className="d-flex mx-4 ">
                            <label>คำนำหน้า</label>
                          </div>
                        </div>
                        <div className="d-inline-flex">
                          <div className="d-flex">
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                defaultValue="นาย"
                                defaultChecked="checked"
                                {...register("prefix")}
                              />
                              <label
                                className="custom-control-label me-3 ps-1"
                                htmlFor="title1"
                              >
                                นาย
                              </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="title2"
                                defaultValue="นางสาว"
                                {...register("prefix")}
                              />
                              <label
                                className="custom-control-label me-3 ps-1"
                                htmlFor="title2"
                              >
                                นางสาว
                              </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                defaultValue="นาง"
                                {...register("prefix")}
                              />
                              <label
                                className="custom-control-label ps-1"
                                htmlFor="title3"
                              >
                                นาง
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputFName"
                          className="form-control"
                          name="firstName"
                          placeholder="ชื่อ"
                          defaultValue=""
                          {...register("firstName")}
                          required
                          maxLength="30"
                        />
                        <label htmlFor="inputFName">ชื่อ</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputLName"
                          className="form-control"
                          name="lastName"
                          placeholder="นามสกุล"
                          maxLength="30"
                          {...register("lastName")}
                          required
                        />
                        <label htmlFor="inputLName">นามสกุล</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="inputDepartment"
                          className="form-control"
                          name="department"
                          placeholder="หน่วยงาน"
                          defaultValue=""
                          {...register("department")}
                          required
                        />
                        <label htmlFor="inputDepartment">หน่วยงาน</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          type="email"
                          id="inputEmail"
                          className="form-control"
                          name="email"
                          defaultValue=""
                          placeholder="Email"
                          {...register("email")}
                          required
                        />
                        <label htmlFor="inputEmail">Email</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          type="tel"
                          id="inputTel"
                          className="form-control"
                          name="number"
                          placeholder="เบอร์โทร"
                          defaultValue=""
                          maxLength="10"
                          required
                          pattern="[0]{1}[0-9]{9}"
                          {...register("tel")}
                        />
                        <label htmlFor="inputTel">เบอร์โทร</label>
                      </div>
                      <div className="form-group " require>
                        <div className="d-inline-flex mx-4">
                          <div className="d-flex">
                            <label>รับประทานอาหาร</label>
                          </div>
                        </div>
                        <div className="d-inline-flex mb-3">
                          <div className="d-flex">
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input ms-md-3 ms-5"
                                id="customRadio"
                                defaultValue="ปกติ"
                                defaultChecked="checked"
                                {...register("mealType")}
                              />
                              <label
                                className="custom-control-label me-3 ps-1"
                                htmlFor="customRadio"
                              >
                                ปกติ
                              </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio2"
                                defaultValue="อิสลาม"
                                {...register("mealType")}
                              />
                              <label
                                className="custom-control-label me-3 ps-1"
                                htmlFor="customRadio2"
                              >
                                อิสลาม
                              </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="customRadio3"
                                {...register("mealType")}
                                defaultValue="มังสวิรัติ"
                              />
                              <label
                                className="custom-control-label ps-1"
                                htmlFor="customRadio3"
                              >
                                มังสวิรัติ
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-label-group">
                        <textarea
                          id="inputAddress"
                          className="form-control "
                          rows={2}
                          defaultValue=""
                          placeholder="ที่อยู่ (สำหรับออกใบเสร็จ)"
                          {...register("billAdress")}
                          required
                        />
                        <label htmlFor="inputAddress">
                          ที่อยู่ (สำหรับออกใบเสร็จ)
                        </label>
                      </div>
                      <button
                        className="btn btn-success btn-block btn-login mt-2 mb-3"
                        type="submit"
                      >
                        เข้าร่วมโครงการ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center pt-4">
          <div className="card mb-4" style={{ width: 700 }}>
            <div className="card-header bg-success fs-5 text-center  text-white">
              {projectName}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    ชื่อ - นามสกุล
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ที่อยู่สถานที่จัด"
                    value={
                      getValues("prefix") +
                      " " +
                      getValues("firstName") +
                      "   " +
                      getValues("lastName")
                    }
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    หน่วยงาน
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="หน่วยงาน"
                    value={getValues("department")}
                    disabled
                  />
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={getValues("email")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      เบอร์โทร
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={getValues("tel")}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="fee" className="form-label">
                  รับประทานอาหาร
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={getValues("mealType")}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fee" className="form-label">
                  ที่อยู่ (สำหรับออกใบเสร็จ)
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={getValues("billAdress")}
                  disabled
                />
              </div>

              {/* Detail Project */}
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="place" className="form-label">
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
                <div className="col-6">
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
                </div>
                <div className="col-6">
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
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="mb-3">
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
                    <label className="form-control cut-text">
                      <a
                        href={`/file/projects/${projectSchedule}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectSchedule}
                      </a>
                    </label>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="mb-3 ">
                    <label className="form-label">แบบตอบรับ</label>
                    <label className="form-control cut-text">
                      <a href={`/file/projects/${projectReply}`}>
                        {projectReply}
                      </a>
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="mb-3">
                    <label className="form-label">
                      รายละเอียดโครงการ/กิจกรรม
                    </label>
                    <label className="form-control cut-text">
                      <a
                        href={`/file/projects/${projectDes}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {projectDes}
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmitPayment)}>
                {projectFee > 0 && (
                  <>
                    <label className="form-label">
                      ใบเสร็จชำระค่าลงทะเบียน ( .jpg/.png )
                    </label>
                    <input
                      {...register("fileImg")}
                      onChange={handleChange}
                      accept="image/*"
                      id="imgInp"
                      type="file"
                      className="form-control"
                      required
                    />
                  </>
                )}
                {errors.fileImg && (
                  <div className="alert alert-danger mt-3">
                    {errors.fileImg.message}
                  </div>
                )}
                {fileImg ? (
                  <div className="text-center mt-4">
                    <img
                      className="w-md-50 "
                      src={fileImg}
                      height="500"
                      alt="fileImg"
                    />
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-success me-3">
                    ชำระค่าลงทะเบียน
                  </button>
                  <button onClick={editUser} className="btn btn-success">
                    แก้ไขสมาชิก
                  </button>
                </div>
              </form>
              {projectFee !== 0 && (
                <div className="text-danger mt-3">
                  *หมายเหตุ สำหรับโครงการที่มีการชำระเงินค่าลงทะเบียน
                  ขอให้ผู้สนใจโอนเงินเข้า ชื่อบัญชี มูลนิธิความหลากหลาย
                  ทางชีวภาพ วัฒนธรรมและภูมิปัญญาท้องถิ่น ธนาคารไทยพาณิชย์
                  สาขารามาธิบดี เลขที่บัญชี 026-464404-4
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
