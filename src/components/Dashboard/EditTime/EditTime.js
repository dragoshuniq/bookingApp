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
function EditTime(props) {
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
          <div>
            <Row className="mb-3 d-flex justify-content-center align-items-center">
              <Col
                className="service-availability-text"
                style={{ fontSize: 20 }}
              >
                SUNDAY
              </Col>
              <Col className="">
                <Row>
                  <Col>
                    <Row className="daily-time-text-info d-flex justify-content-center">
                      Working
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Form.Check type="switch" id="custom-switch" />
                    </Row>
                  </Col>
                  <Col>
                    <Row className="daily-time-text-info d-flex justify-content-center">
                      Open
                    </Row>
                    <Row className="d-flex justify-content-center">adad</Row>
                  </Col>
                  <Col>
                    <Row className="daily-time-text-info d-flex justify-content-center">
                      Close
                    </Row>
                    <Row className="d-flex justify-content-center">dada</Row>
                  </Col>
                </Row>
                <Row></Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> MONDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> TUESDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> WEDNESDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> THUESDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> FRIDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="service-availability-text"> SATURDAY</Col>
              <Col className="d-flex justify-content-end service-availability-text">
                08.00 - 18.00
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTime;
