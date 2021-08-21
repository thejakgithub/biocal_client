import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";
import '../styles/styles.pages/more.css'

export default function MoreArticle() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    Axios.get(`${base_url}/articles`).then((res) => {
      setArticleList(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ชื่อบทความวิชาการ/วิจัย",
        accessor: "artTopic",
      },
      {
        Header: "วันที่",
        accessor: "artDate",
        // accessor is the "key" in the data
      },
      {
        Header: "รายละเอียดบทความวิชาการ/วิจัย",
        accessor: "artFile",
        // accessor is the "key" in the data
      },
    ],
    []
  );

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
  });

  const data = useMemo(() => [...articleList], [articleList]);

  return (
    <div className="container wrapper-table">
      <Table
        title="บทความวิชาการ/วิจัย"
        columns={columns}
        data={data}
        more={true}
        size={7}
      />
    </div>
  );
}
