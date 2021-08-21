import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../../config/base_url";

export default function NewsManage() {
  const [newsList, setNewsList] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "รหัสข่าว",
        accessor: "newsID", // accessor is the "key" in the data
      },
      {
        Header: "หัวข้อข่าว",
        accessor: "newsTopic",
      },
      {
        Header: "วันที่",
        accessor: "newsDate", // accessor is the "key" in the data
      },
      {
        Header: "รายละเอียดข่าว",
        accessor: "newsFile",
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
    Axios.get(`${base_url}/news`).then((res) => {
      setNewsList(res.data);
    });
  }, []);

  const onDeleteNews = (id) => {
    Axios.delete(`${base_url}/news/${id}`)
      .then((res) => {
        if (!res.data.err) {
          setNewsList(
            newsList.filter((val) => {
              return val.newsID !== id;
            })
          );
          alert("ลบข่าว/ประชาสัมพันธ์ เรียบร้อยแล้ว");
        } 
      })
      .catch((err) => {
        if (err) alert(err);
      });
  };

  newsList.forEach((news) => {
    if (
      dayjs(news.newsDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY") !== "Invalid Date"
    ) {
      news.newsDate = dayjs(news.newsDate)
        .locale("th")
        .add(543, "year")
        .format("DD MMM YYYY");
    }

    news.newsFile = (
      <Link
        to={`/file/news/${news.newsFile}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {news.newsFile}
      </Link>
    );
    news["edit"] = (
      <Link to={`./newsManage/editNews/${news.newsID}`}>
        {" "}
        <i className="fas fa-edit"></i>
      </Link>
    );
    news["delete"] = (
      <Link to="#">
        <i
          className="fas fa-trash"
          onClick={() => {
            if (window.confirm("ต้องการลบข่าว/ประชาสัมพันธ์นี้หรือไม่ ?")) {
              onDeleteNews(news.newsID);
            }
          }}
        ></i>
      </Link>
    );
  });

  const data = useMemo(() => [...newsList], [newsList]);

  return (
    <Table
      columns={columns}
      data={data}
      title="จัดการข่าว/ประชาสัมพันธ์"
      routeAdd="/admin/newsManage/addNews"
      add={true}
      size={5}
    />
  );
}
