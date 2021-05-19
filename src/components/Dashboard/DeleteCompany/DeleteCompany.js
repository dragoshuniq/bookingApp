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
import { ReactComponent as TrashImage } from "../../../assets/svg/deleteTrash.svg";
import "./delete-company.css";
import firebase from "firebase";

function DeleteCompany(props) {
  const { deleteCompany, isDeleteConfirmShow } = useAddContext();

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className="pb-0"
          style={{ borderBottom: "0px" }}
        >
          <Modal.Title id="add-company-modal-header-label">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-company-modal-body ">
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <TrashImage style={{ width: 272, height: 272 }} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center align-items-center">
              <Modal.Title id="add-company-modal-header-label">
                Delete Company
              </Modal.Title>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <div className="text-center" id="delete-company-confirm-text">
                Are you sure want to delete company ? It can’t be restored after
                take delete action
              </div>
            </Col>
          </Row>
          <Row className="mt-4 mb-5">
            <Col>
              <button
                className="company-card-view-company-button"
                type="button"
                onClick={() => deleteCompany(isDeleteConfirmShow.id)}
              >
                <div>Yes, Delete</div>
              </button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteCompany;
