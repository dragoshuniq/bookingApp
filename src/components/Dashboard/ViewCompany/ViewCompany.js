import React, { useState, useRef } from "react";
import { Modal, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useAdminContext } from "../../context/AdminContext";
import { CgBriefcase, CgCalendarDates } from "react-icons/cg";
import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";

import firebase from "firebase";
import "./view-company.css";
function ViewCompany(props) {
  const { isViewCompanyShow, setIsViewCompanyShow } = useAdminContext();

  const renderServices =
    isViewCompanyShow.show &&
    Object.keys(isViewCompanyShow.company.services).map((key, ind) => {
      return (
        <Container key={ind} className="mt-2">
          <Row>
            <div className="d-flex justify-content-center align-items-center">
              <CgBriefcase className="mr-2" color="#200E32" />
              <small className="view-company-description">
                {isViewCompanyShow.company.services[ind].name}
              </small>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-center align-items-center">
              <AiOutlineClockCircle className="mr-2" color="#200E32" />
              <small className="view-company-description"> 08.00 - 19.00</small>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-center align-items-center">
              <AiOutlineDollarCircle className="mr-2" color="#200E32" />
              <small className="view-company-description">
                {" "}
                {isViewCompanyShow.company.services[ind].price} RON
              </small>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-center align-items-center">
              <CgCalendarDates className="" color="#200E32" />
              <div className="view-company-description d-flex ml-2">
                {Object.keys(
                  isViewCompanyShow.company.services[ind].availability
                ).map((k, i) => {
                  return (
                    <div key={k}>
                      {isViewCompanyShow.company.services[ind].availability[k]
                        .isOpen && (
                        <div className="d-block text-capitalize mr-2">
                          {isViewCompanyShow.show &&
                            isViewCompanyShow.company.services[ind]
                              .availability[k].isOpen &&
                            k.slice(0, 3)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
