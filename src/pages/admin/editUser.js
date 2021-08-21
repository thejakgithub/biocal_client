import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import base_url from "../../config/base_url";

export default function EditUser() {
  let { pjID, userID } = useParams();
  const [fileImg, setFileImg] = useState(null);
  const [receiptName, setReceiptName] = useState("");
  const [firstReceiptName, setFirstReceiptName] = useState("");
  const [success, setSuccess] = useState(false);

  const schema = yup.object().shape({
    fileImg: yup
      .mixed()
      .test(
        "type",
        "เป็นไฟล์รูปภาพนามสกุล .jpg/.jpeg/.png เท่านั้น !",
        (value) => {
          if (!value.length) return true;
          return (
            (value && value[0].type === "image/png") ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/jpeg"
          );
        }
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm(firstReceiptName !== "" && { resolver: yupResolver(schema) });

  const handleChange = (e) => {
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        clearErrors("fileImg");
        setReceiptName(e.target.files[0].name);
        setFileImg(URL.createObjectURL(e.target.files[0]));
      } else {
        setFileImg(null);
        setError("fileImg", {
          type: "manual",
          message: "เป็นไฟล์รูปภาพนามสกุล .jpg/.jpeg/.png เท่านั้น !",
        });
      }
    } else {
      setFileImg("/file/receipts/" + firstReceiptName);
      setReceiptName(firstReceiptName);
      clearErrors("fileImg");
    }
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
    Axios.get(`${base_url}/userproject/${pjID}/${userID}`).then((res) => {
      let payDate = dayjs(res.data[0].payDate).format("YYYY-MM-DDTHH:mm");
      setValue("payDate", payDate);
      setValue("prefix", res.data[0].userPrefix);
      setValue("firstName", res.data[0].userFirstName);
      setValue("lastName", res.data[0].userLastName);
      setValue("department", res.data[0].userDepartment);
      setValue("email", res.data[0].userEmail);
      setValue("mealType", res.data[0].userMealType);
      setValue("billAdress", res.data[0].userBillAddress);
      setFirstReceiptName(res.data[0].userReceipt);
      setValue("tel", res.data[0].userTel);
      setValue("payStatus", res.data[0].userPayStatus);
    });

    setInputFilter(document.getElementById("inputTel"), function (value) {
      return /^\d*$/.test(value);
    });
  }, [pjID, userID, setValue]);

  useEffect(() => {
    setReceiptName(firstReceiptName);
    setFileImg("/file/receipts/" + firstReceiptName);
  }, [firstReceiptName]);

  const updateUser = (data) => {
    const formData = new FormData();

    formData.append("userPrefix", data.prefix);
    formData.append("userFirstName", data.firstName);
    formData.append("userLastName", data.lastName);
    formData.append("userDepartment", data.department);
    formData.append("userEmail", data.email);
    formData.append("userTel", data.tel);
    formData.append("userMealType", data.mealType);
    formData.append("userBillAddress", data.billAdress);
    formData.append("userPayDate", data.payDate);
    formData.append("userPayStatus", data.payStatus);

    if (firstReceiptName !== "") {
      if (data.fileImg.length > 0) {
        formData.append("userReceipt", data.fileImg[0]);
      } else {
        formData.append("userReceipt", firstReceiptName);
      }
    } else {
      formData.append("userReceipt", "");
    }

    Axios.put(`${base_url}/userproject/${pjID}/${userID}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setSuccess(true);
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  };

  return (
    <>
      <header className="bg-success text-white header-sidebar justify-content-between ">
        <h4 className="mx-3">แก้ไขรายชื่อสมาชิก</h4>
      </header>
      <div className="container d-flex justify-content-center my-4">
        <div className="card" style={{ width: 700 }}>
          <div className="card-header bg-success fs-5  text-white">
            แก้ไขรายชื่อสมาชิก
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(updateUser)}>
              {success && (
                <div className="alert alert-success">
                  แก้ไขรายชื่อสมาชิกเรียบร้อยแล้ว
                </div>
              )}
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 d-flex">
                    <label className="form-label me-3" htmlFor="prefix">
                      คำนำหน้า
                    </label>
                    <div className="form-check me-3">
                      <input
                        {...register("prefix")}
                        className="form-check-input"
                        type="radio"
                        value="นาย"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        นาย
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        {...register("prefix")}
                        className="form-check-input"
                        type="radio"
                        value="นางสาว"
                      />
                      <label className="form-check-label">นางสาว</label>
                    </div>
                    <div className="form-check">
                      <input
                        {...register("prefix")}
                        className="form-check-input"
                        type="radio"
                        value="นาง"
                      />
                      <label className="form-check-label">นาง</label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      ชื่อ
                    </label>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="form-control"
                      placeholder="ชื่อ"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      นามสกุล
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="form-control"
                      placeholder="นามสกุล"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">หน่วยงาน</label>
                    <input
                      {...register("department")}
                      type="text"
                      className="form-control"
                      placeholder="หน่วยงาน"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="form-control"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">เบอร์โทร</label>
                    <input
                      id="inputTel"
                      type="tel"
                      className="form-control"
                      placeholder="เบอร์โทร"
                      maxLength="10"
                      pattern="[0]{1}[0-9]{9}"
                      required
                      {...register("tel")}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <label className="form-label me-3" htmlFor="prefix">
                      รับประทานอาหาร
                    </label>
                    <div className="form-check me-3">
                      <input
                        {...register("mealType")}
                        className="form-check-input"
                        type="radio"
                        value="ปกติ"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        ปกติ
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        {...register("mealType")}
                        className="form-check-input"
                        type="radio"
                        value="อิสลาม"
                      />
                      <label className="form-check-label">อิสลาม</label>
                    </div>
                    <div className="form-check">
                      <input
                        {...register("mealType")}
                        className="form-check-input"
                        type="radio"
                        value="มังสวิรัติ"
                      />
                      <label className="form-check-label">มังสวิรัติ</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      ที่อยู่ (สำหรับออกใบเสร็จ)
                    </label>
                    <textarea
                      {...register("billAdress")}
                      type="text"
                      className="form-control"
                      placeholder="ที่อยู่ (สำหรับออกใบเสร็จ)"
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="payDate" className="form-label">
                          วันที่/เวลา ชำระค่าลงทะเบียน
                        </label>
                        <input
                          {...register("payDate")}
                          className="form-control"
                          type="datetime-local"
                          id="payDate"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">สถานะการชำระเงิน</label>
                        <select
                          {...register("payStatus")}
                          className="form-select"
                          aria-label="payStatus"
                        >
                          <option Value="รอการยืนยัน">รอการยืนยัน</option>
                          <option value="ชำระแล้ว">ชำระแล้ว</option>
                          <option value="ไม่ต้องชำระ">ไม่ต้องชำระ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      {fileImg && firstReceiptName !== "" && (
                        <div className="text-center mb-2">
                          <img
                            className="w-50"
                            src={fileImg}
                            alt="fileImg"
                            height="500"
                          />
                        </div>
                      )}
                      <label htmlFor="slip" className="form-label w-100">
                        {errors.fileImg ? (
                          <div className="alert alert-danger ">
                            {errors.fileImg.message}
                          </div>
                        ) : (
                          receiptName
                        )}
                      </label>
                      {firstReceiptName !== "" && (
                        <>
                          <input
                            {...register("fileImg")}
                            onChange={handleChange}
                            type="file"
                            accept="image/*"
                            className="form-control"
                          />
                          <div className="form-text">
                            ใบเสร็จชำระค่าลงทะเบียน ( .jpg/.jpeg/.png )
                          </div>
                        </>
                      )}
                    </div>
                    <button type="submit" className="btn btn-success">
                      แก้ไขรายชื่อสมาชิก
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
