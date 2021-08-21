import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";
import '../styles/styles.pages/more.css'

export default function MoreNews() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    Axios.get(`${base_url}/news`).then((res) => {
      setNewsList(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อข่าว/ประชาสัมพันธ์",
        accessor: "newsTopic",
      },
      {
        Header: "วันที่",
        accessor: "newsDate",
        // accessor is the "key" in the data
      },
      {
        Header: "รายละเอียดข่าว",
        accessor: "newsFile",
        // accessor is the "key" in the data
      },
    ],
    []
  );

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
  });

  const data = useMemo(() => [...newsList], [newsList]);

  return (
    <div className="wrapper-table container">
      <Table
        title="ข่าว/ประชาสัมพันธ์"
        columns={columns}
        data={data}
        more={true}
        size={7}
      />
    </div>
  );
}
