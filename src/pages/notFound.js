import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container d-flex flex-column justify-content-center  align-items-center " style={{height:500}}>

    <h1 >404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;