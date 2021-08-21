import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import dayjs from "dayjs";
import base_url from "../../config/base_url";

export default function EditArticle() {
  let { id } = useParams();

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
  const [date, setDate] = useState(today);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [firstFileName, setFirstFileName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onTextChange = (evt) => {
    setArtTopic(evt.target.value);
  };

  const onDateChange = (evt) => {
    setDate(evt.target.value);
  };

  const onTextClick = () => {
    setSuccess(false);
  };

  const onfileChange = (evt) => {
    setFile(evt.target.files[0]);
    if (evt.target.files[0]) {
      setFileName(evt.target.files[0].name);
    } else {
      setFileName(firstFileName);
    }
  };

  useEffect(() => {
    Axios.get(`${base_url}/articles/${id}`).then((res) => {
      let dateRes = dayjs(res.data[0].artDate).format().substr(0, 10);
      setDate(dateRes);
      setArtTopic(res.data[0].artTopic);
      setFileName(res.data[0].artFile);
      setFirstFileName(res.data[0].artFile);
    });
  }, [id]);

  const updateArticle = (evt) => {
    evt.preventDefault();

    const formData = new FormData();

    if (!!file) {
      formData.append("fileArticle", file);
    } else {
      formData.append("fileName", fileName);
    }

    formData.append("artTopic", artTopic);
    formData.append("date", date);
    Axios.put(`${base_url}/articles/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
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
        <h4 className="mx-3">แก้ไขบทความวิชาการ/วิจัย</h4>
      </header>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card " style={{ width: 500 }}>
          <div className="card-header bg-success fs-5  text-white">
            แก้ไขบทความวิชาการ/วิจัย
          </div>
          <div className="card-body">
            <form onSubmit={updateArticle} encType="multipart/form-data">
              {success && (
                <Alert variant="success">
                  แก้ไขบทความวิชาการ/วจัย เรียบร้อยแล้ว
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
                    value={date}
                    onChange={onDateChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    <Link
                      to={`/file/articles/${fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fileName}
                    </Link>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={onfileChange}
                    name="fileArticle"
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
                  แก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
