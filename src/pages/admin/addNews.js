import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import base_url from "../../config/base_url";

export default function AddNews() {
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

  const [topicNews, setTopicNews] = useState("");
  const [date, setDate] = useState(today);
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onTextChange = (evt) => {
    setTopicNews(evt.target.value);
  };

  const onDateChange = (evt) => {
    setDate(evt.target.value);
  };

  const onTextClick = () => {
    setSuccess(false);
  };

  const fileChange = (evt) => {
    setFile(evt.target.files[0]);
  };

  const addNews = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("fileNews", file);
    formData.append("topicNews", topicNews);
    formData.append("date", date);
    Axios.post(`${base_url}/news`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setTopicNews("");
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
        <h4 className="mx-3">เพิ่มข่าว/ประชาสัมพันธ์</h4>
      </header>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card " style={{ width: 500 }}>
          <div className="card-header bg-success fs-5  text-white">
            เพิ่มข่าว/ประชาสัมพันธ์
          </div>
          <div className="card-body">
            <form onSubmit={addNews} encType="multipart/form-data">
              {success && (
                <Alert variant="success">
                  เพิ่มข่าว/ประชาสัมพันธ์ เรียบร้อยแล้ว
                </Alert>
              )}
              {error && (
                <Alert variant="danger">รองรับไฟล์ .pdf เท่านั้น !</Alert>
              )}
              <div>
                <div className="mb-3">
                  <label htmlFor="topic_news" className="form-label">
                    ข่าวประชาสัมพันธ์
                  </label>
                  <input
                    onChange={onTextChange}
                    type="text"
                    className="form-control"
                    name="topicNews"
                    placeholder="หัวข้อข่าวประชาสัมพันธ์"
                    value={topicNews}
                    required
                    onClick={onTextClick}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="form-label">
                    วันที่
                  </label>
                  <input
                    onChange={onDateChange}
                    type="date"
                    className="form-control"
                    name="date"
                    defaultValue={date}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={fileChange}
                    required
                  />
                  <div className="form-text">
                    เนื้อหาข่าวประชาสัมพันธ์ ( .pdf )
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
