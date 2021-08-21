import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import base_url from "../config/base_url";
import '../styles/styles.components/Content.css'

export default function Content() {
  const [projectList, setProjectList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [articleList, setArticleList] = useState([]);

  let projectCount = 0;
  let newsCount = 0;
  let articleCount = 0;

  useEffect(() => {
    Axios.get(`${base_url}/projectContent`).then((res) => {
      setProjectList(res.data);
    });
    Axios.get(`${base_url}/newsContent`).then((res) => {
      setNewsList(res.data);
    });
    Axios.get(`${base_url}/articleContent`).then((res) => {
      setArticleList(res.data);
    });
  }, []);

  return (
    <div className="container-fluid d-xxl-flex  wrapper-content  justify-content-evenly mb-4">
      <div className="card card-content mx-auto">
        <div className="card-header text-white text-center bg-success">
          โครงการ/กิจกรรม
        </div>
        <ul className="list-group list-group-flush">
          {projectList.map((project) => {
            projectCount++;
            return (
              <Link
                to={`/detailProject/${project.pjID}`}
                key={project.pjID}
                className="list-group-item list-group-item-action cut-text"
              >
                {project.pjName}
              </Link>
            );
          })}
          {projectCount >= 4 ? (
            <Link
              to="/moreProject"
              className="list-group-item list-group-item-action text-center"
            >
              ดูเพิ่มเติม
            </Link>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
      <div className="card card-content mx-auto" >
        <div className="card-header text-white text-center bg-success">
          ปฎิทินกิจกรรม
        </div>
        <iframe
          title="calendar"
          className="calendar-content"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&src=c3U5MHJjdm1yNWw0MXZ2cnVkYnJzMWYydHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%239E69AF&showPrint=0&showTabs=0&showCalendars=0&showTz=0&showNav=1&showTitle=1"
          width="100%"
          frameBorder={0}
        ></iframe>
      </div>
      <div className="card card-content  mx-auto">
        <div className="card-header text-white text-center bg-success">
          ข่าว/ประชาสัมพันธ์
        </div>
        <ul className="list-group list-group-flush ">
          {newsList.map((news) => {
            newsCount++;
            return (
              <Link
                to={`/file/news/${news.newsFile}`}
                key={news.newsID}
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action cut-text"
              >{`${dayjs(news.newsDate)
                .locale("th")
                .add(543, "year")
                .format("DD MMM YY")} - ${news.newsTopic}`}</Link>
            );
          })}
          {newsCount >= 4 ? (
            <Link
              to="/moreNews"
              className="list-group-item list-group-item-action text-center"
            >
              ดูเพิ่มเติม
            </Link>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
      <div className="card card-content mx-auto" >
        <div className="card-header text-white text-center bg-success">
          บทความวิชาการ/วิจัย
        </div>
        <ul className="list-group list-group-flush ">
          {articleList.map((art) => {
            articleCount++;
            return (
              <Link
                key={art.artID}
                to={`/file/articles/${art.artFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action cut-text"
              >{`${dayjs(art.artDate)
                .locale("th")
                .add(543, "year")
                .format("DD MMM YY")} - ${art.artTopic}`}</Link>
            );
          })}
          {articleCount >= 4 ? (
            <Link
              to="/moreArticle"
              className="list-group-item list-group-item-action text-center"
            >
              ดูเพิ่มเติม
            </Link>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  );
}
