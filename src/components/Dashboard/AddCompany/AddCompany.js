import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormFile,
  InputGroup,
} from "react-bootstrap";
import { useAddContext } from "../AddCompanyContext";
import Profile from "./Profile";
import Services from "./Services";
import firebase from "firebase";

import "./add-company.css";

function AddCompany(props) {
  const {
    activeButton,
    setActiveButton,
    setIsAddCompany,
    setFile,
    defaultService,
    setServices,
  } = useAddContext();

  const activeButtonProps = {
    textDecoration: "underline",
    textUnderlineOffset: 4,
    color: "#EF6313",
    textDecorationThickness: 2,
  };

  const onClickActiveButton = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setIsAddCompany(false);
          setActiveButton("profile");
          setFile(null);
          setServices([defaultService]);
        }}
      >
        <Modal.Header
          closeButton
          className="pb-0"
          style={{ borderBottom: "0px" }}
        >
          <Modal.Title id="add-company-modal-header-label">
            Add Company
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-company-modal-body ">
          <div
            className="d-flex justify-content-around align-items-center mb-3 mt-2"
            style={{ width: "100%", borderBottom: "1px solid #dee2e6" }}
          >
            <button
              onClick={() => onClickActiveButton("profile")}
              className="button-group-add-modal"
              style={activeButton === "profile" ? activeButtonProps : null}
            >
              Profile
            </button>
            <button
              onClick={() => onClickActiveButton("services")}
              className="button-group-add-modal"
              style={activeButton === "services" ? activeButtonProps : null}
            >
              Services
            </button>
            <button
              onClick={() => onClickActiveButton("payment")}
              className="button-group-add-modal"
              style={activeButton === "payment" ? activeButtonProps : null}
            >
              Payment
            </button>
          </div>
          {activeButton === "profile" && <Profile />}
          {activeButton === "services" && <Services />}
          {activeButton === "payment" && <div />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCompany;
