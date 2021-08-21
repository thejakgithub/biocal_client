import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "../styles/styles.components/ModalAdmin.css";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import base_url from "../config/base_url";


export default function Modal_Admin(props) {
  let history = useHistory();

  Axios.defaults.withCredentials = true;

  const emptyInput = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState(emptyInput);
  const [loginStatus, setLoginStatus] = useState("");
  const { username, password } = input;

  const onChange = (evt) => {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value,
    });
  };

  const login = (evt) => {
    evt.preventDefault();

    Axios.post(`${base_url}/login`, {
      username: username,
      password: password,
    }).then((res) => {
      if (res.data.message) {
        setLoginStatus(res.data.message);
      } else {
        setInput(emptyInput);
        history.push("/admin/dashboard");
        props.onHide();
      }
    });
  };

  return (
    <Modal {...props} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>ผู้ดูแลระบบ</Modal.Title>
      </Modal.Header>
      <form onSubmit={login}>
        <Modal.Body>
          {loginStatus !== "" && <Alert variant="danger">{loginStatus}</Alert>}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-user-tie" />
            </InputGroup.Text>
            <FormControl
              className="form-admin"
              placeholder="Username"
              aria-label="Username"
              name="username"
              aria-describedby="basic-addon1"
              onChange={onChange}
              value={username}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text id="basic-addon2">
              <i className="fas fa-lock" />
            </InputGroup.Text>
            <FormControl
              className="form-admin"
              type="password"
              aria-label="Password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              aria-describedby="basic-addon2"
              onChange={onChange}
              value={password}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
