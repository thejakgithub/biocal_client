import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../../config/base_url";

export default function ArticleManage() {
  const [articleList, setArticleList] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "รหัสบทความ",
        accessor: "artID", // accessor is the "key" in the data
      },
      {
        Header: "หัวข้อบทความ",
        accessor: "artTopic",
      },
      {
        Header: "วันที่",
        accessor: "artDate",
      },
      {
        Header: "รายละเอียดบทความ",
        accessor: "artFile",
      },
      {
        Header: "แก้ไข",
        accessor: "edit", // accessor is the "key" in the data
      },
      {
        Header: "ลบ",
        accessor: "delete",
      },
    ],
    []
  );

  useEffect(() => {
    Axios.get(`${base_url}/articles`).then((res) => {
      setArticleList(res.data);
    });
  }, []);

  const onDeleteArticle = (id) => {
    Axios.delete(`${base_url}/articles/${id}`)
      .then((res) => {
        if (!res.data.err) {
          setArticleList(
            articleList.filter((val) => {
              return val.artID !== id;
            })
          );
          alert("ลบบทความวิชาการ/วิจัย เรียบร้อยแล้ว !");
        } else {
          alert("บทความวิชาการ/วิจัย ไม่สมารถลบได้");
        }
      })
      .catch((err) => {
        if (err) alert(err);
      });
  };

  articleList.forEach((art) => {
    if (
      dayjs(art.artDate).locale("th").add(543, "year").format("DD MMM YYYY") !==
      "Invalid Date"
    ) {
      art.artDate = dayjs(art.artDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY");
    }
    art.artFile = (
      <Link
        to={`/file/articles/${art.artFile}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {art.artFile}
      </Link>
    );
    art["edit"] = (
      <Link to={`./articleManage/editArticle/${art.artID}`}>
        <i className="fas fa-edit"></i>
      </Link>
    );
    art["delete"] = (
      <Link to="#">
        <i
          className="fas fa-trash"
          onClick={() => {
            if (window.confirm("ต้องการลบบทความวิชาการ/วิจัยนี้หรือไม่ ?")) {
              onDeleteArticle(art.artID);
            }
          }}
        ></i>
      </Link>
    );
  });

  const data = useMemo(() => [...articleList], [articleList]);

  return (
    <Table
      columns={columns}
      data={data}
      title="จัดการบทความวิชาการ/วิจัย"
      routeAdd="/admin/articleManage/addArticle"
      add={true}
      size={5}
    />
  );
}
