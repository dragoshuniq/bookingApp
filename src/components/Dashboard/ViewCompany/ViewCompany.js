import React, { useState, useRef } from "react";
import { Modal, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useAddContext } from "../AddCompanyContext";
import { CgBriefcase, CgCalendarDates } from "react-icons/cg";
import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";

import firebase from "firebase";
import "./view-company.css";
function ViewCompany(props) {
  const { isViewCompanyShow, setIsViewCompanyShow } = useAddContext();
  const serviceTest = [
    {
      label: "Trimming",
      time: "08.00 19.00",
      priceMin: 10,
      priceMax: 80,
      days: "Sun, Mon, Tue, Wed, Thu, Fri",
    },
  ];

  const renderServices = serviceTest.map((serv,ind) => {
    return (
      <Container key={ind}>
        <Row>
          <div className="d-flex justify-content-center align-items-center">
            <CgBriefcase className="mr-2" color="#200E32" />
            <small className="view-company-description"> {serv.label}</small>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center">
            <AiOutlineClockCircle className="mr-2" color="#200E32" />
            <small className="view-company-description"> {serv.time}</small>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center">
            <AiOutlineDollarCircle className="mr-2" color="#200E32" />
            <small className="view-company-description">
              {" "}
              {serv.priceMin} - {serv.priceMax} RON
            </small>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center align-items-center">
            <CgCalendarDates className="mr-2" color="#200E32" />
            <small className="view-company-description"> {serv.days}</small>
          </div>
        </Row>
      </Container>
    );
  });
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
          <Modal.Title id="add-company-modal-header-label">
            View Company
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Card className="view-company-container">
            <Card.Img
              variant="top"
              src={isViewCompanyShow.company.photo}
              className="view-company-image"
            />

            <Card.Body className="">
              <div>
                <small className="mt-2 view-company-title">
                  {isViewCompanyShow.company.companyName}
                </small>
                <small className="view-company-description d-block">
                  {isViewCompanyShow.company.companyDescription}
                </small>
              </div>
              <div className="mt-3">{renderServices}</div>
              <button
                className="company-card-view-company-button mt-3"
                type="button"
                onClick={() =>
                  setIsViewCompanyShow({ show: false, company: {} })
                }
              >
                <div>Book service</div>
              </button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCompany;
