import React from "react";
import '../styles/styles.components/countDashboard.css'

export default function CountDashboard({title,count}) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="alert alert-primary  text-center fs-5 size"
      >
        {title}<p>{count}</p>
      </div>
    </div>
  );
}
