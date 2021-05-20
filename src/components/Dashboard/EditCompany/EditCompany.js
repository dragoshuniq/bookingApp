import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useAdminContext } from "../../context/AdminContext";
import firebase from "firebase";
import EditProfile from "./EditProfile";
import EditCompanyServices from "./EditCompanyServices";
function EditCompany(props) {
  const {
    activeButton,
    setActiveButton,
    setIsAddCompany,
    setFile,
    defaultService,
    setServices,
    setIsEditCompany,
    setCompanyToEdit,
    companyToEdit,
  } = useAdminContext();

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
          setIsEditCompany(false);
          setCompanyToEdit();
          setActiveButton("profile");
          setServices();
        }}
      >
        <Modal.Header
          closeButton
          className="pb-0"
          style={{ borderBottom: "0px" }}
        >
          <Modal.Title id="add-company-modal-header-label">
            Edit Company
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
          </div>
          {activeButton === "profile" && <EditProfile />}
          {activeButton === "services" && <EditCompanyServices />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCompany;
