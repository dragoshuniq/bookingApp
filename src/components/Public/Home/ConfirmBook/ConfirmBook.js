import React, { useState, useRef } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { usePublicContext } from "../../../context/PublicContext";
import { ReactComponent as ConfirmImage } from "../../../../assets/svg/confirmed.svg";
import "./confirm-book.css";
import dayjs from "dayjs";
function ConfirmBook(props) {
  const { setIsConfirmBookShow, currentUserData, bookService } =
    usePublicContext();

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
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-company-modal-body ">
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <ConfirmImage style={{ width: 272, height: 272 }} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center align-items-center">
              <Modal.Title id="add-company-modal-header-label">
                Congratulations
              </Modal.Title>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <div className="text-center confirm-book-subtitle">
                Hi {currentUserData.firstName}, Appointment confirmed with
                company {bookService.companyName} on
                {dayjs(bookService.date).format(" dddd, DD/MM/YYYY")},at{" "}
                {dayjs(bookService.time).format("h:mm a")}. Please find the
                details below
              </div>
            </Col>
          </Row>
          <Row className="mt-4 mb-5">
            <Col>
              <button
                className="company-card-view-company-button"
                type="button"
                onClick={() => setIsConfirmBookShow(false)}
              >
                <div>Check email</div>
              </button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmBook;
