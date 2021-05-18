import React, { useState, useCallback } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormFile,
  InputGroup,
} from "react-bootstrap";
import "./edittime.css";
import dayjs from "dayjs";
import * as BIcons from "react-icons/bi";
import { useAddContext } from "../AddCompanyContext";

function EditTime(props) {
  const { setIsSelectTime, currentTimeTable, onClickSwitch } = useAddContext();

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const renderDays = daysOfWeek.map((day,index) => {
    return (
        <div className="render-day-container" key={index}>
          <Row className="mb-3 d-flex justify-content-center align-items-center">
            <Col
              className="service-availability-text"
              style={{
                textTransform: "uppercase",
              }}
            >
              {day}
            </Col>
            <Col>
              <Row>
                <Col>
                  <Row className="daily-time-text-info d-flex justify-content-center">
                    {currentTimeTable[day] ? "Working" : "Closed"}
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Form.Check
                      type="switch"
                      id={"custom-switch" + day}
                      onChange={() => onClickSwitch(day)}
                      checked={currentTimeTable[day]}
                    />
                  </Row>
                </Col>
                <Col style={{ height: 60 }}>
                  {currentTimeTable[day] && (
                    <>
                      <Row className="daily-time-text-info d-flex justify-content-center">
                        Open
                      </Row>
                      <Row className="d-flex justify-content-center open-close-time-text align-items-center">
                        <button
                          onClick={() => setIsSelectTime(true)}
                          className="transparent-button"
                        >
                          {dayjs().format("HH.mm")}{" "}
                          <BIcons.BiChevronDown size={18} color="#200E32" />
                        </button>
                      </Row>
                    </>
                  )}
                </Col>
                <Col>
                  {currentTimeTable[day] && (
                    <>
                      <Row className="daily-time-text-info d-flex justify-content-center">
                        Close
                      </Row>
                      <Row className="d-flex justify-content-center open-close-time-text align-items-center">
                        <button
                          onClick={() => setIsSelectTime(true)}
                          className="transparent-button"
                        >
                          {dayjs().format("HH.mm")}{" "}
                          <BIcons.BiChevronDown size={18} color="#200E32" />
                        </button>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
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
        <Modal.Header closeButton>
          <Modal.Title id="add-company-modal-header-label">
            Edit Time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{renderDays} </div>
        </Modal.Body>
        <Modal.Footer style={{ borderWidth: 0 }}>
          <button className="save-time-button mr-4">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTime;
