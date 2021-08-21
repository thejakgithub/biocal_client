import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import base_url from "../../config/base_url";

export default function AddArticle() {
  const todayTypeDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  const today = todayTypeDate();

  const [artTopic, setArtTopic] = useState("");
  const [artDate, setArtDate] = useState(today);
  const [artFile, setArtFile] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onTextChange = (evt) => {
    setArtTopic(evt.target.value);
  };

  const onDateChange = (evt) => {
    setArtDate(evt.target.value);
  };

  const onTextClick = () => {
    setSuccess(false);
  };

  const onfileChange = (evt) => {
    setArtFile(evt.target.files[0]);
  };

  const addArticle = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("fileArt", artFile);
    formData.append("artTopic", artTopic);
    formData.append("artDate", artDate);
    formData.append("artFile", artFile.name);
    Axios.post(`${base_url}/articles`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setArtTopic("");
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        if (err) {
          setError(true);
        }
      });
  };

  return (
    <>
      <header className="bg-success text-white header-sidebar justify-content-between ">
        <h4 className="mx-3">เพิ่มบทความวิชาการ/วิจัย</h4>
      </header>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card " style={{ width: 500 }}>
          <div className="card-header bg-success fs-5  text-white">
            เพิ่มบทความวิชาการ/วิจัย
          </div>
          <div className="card-body">
            <form onSubmit={addArticle} encType="multipart/form-data">
              {success && (
                <Alert variant="success">
                  เพิ่มบทความวิชาการ/วิจัย เรียบร้อยแล้ว
                </Alert>
              )}
              {error && (
                <Alert variant="danger">รองรับไฟล์ .pdf เท่านั้น !</Alert>
              )}
              <div>
                <div className="mb-3">
                  <label htmlFor="topic_article" className="form-label">
                    บทความวิชาการ
                  </label>
                  <input
                    onChange={onTextChange}
                    onClick={onTextClick}
                    type="text"
                    className="form-control"
                    name="artTopic"
                    required
                    value={artTopic}
                    placeholder="ชื่อบทความวิชาการ"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="form-label">
                    วันที่
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="artDate"
                    value={artDate}
                    onChange={onDateChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={onfileChange}
                    name="artFile"
                    required
                  />
                  <div id="fileHelp" className="form-text">
                    เนื้อหาบทความวิชาการ ( .pdf )
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ width: 90 }}
                >
                  เพิ่ม
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
