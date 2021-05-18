import React, { useRef, useState } from "react";
import { Button, Card, Row, Col, Alert } from "react-bootstrap";
import AddCompany from "./AddCompany/AddCompany";
import { GoPlus } from "react-icons/go";
import EditTime from "./EditTime/EditTime";
import SelectTime from "./Time/SelectTime";
import { useAuth } from "../context/AuthContext";
import { useAddContext } from "./AddCompanyContext";
import "./dashboard.css";
function Dashboard(props) {
  const {
    isAddCompany,
    isEditTime,
    isSelectTime,
    setIsAddCompany,
    setIsEditTime,
    setIsSelectTime,
  } = useAddContext();
  return (
    <>
      <div className="mt-4 mb-4">
        <small id="overview-text" className="">
          Overview
        </small>
      </div>
      <Row>
        <AddCompany
          show={isAddCompany}
          onHide={() => setIsAddCompany(false)}
          style={{ zIndex: isEditTime ? 0 : 1500 }}
        />
        <EditTime
          show={isEditTime}
          onHide={() => {setIsEditTime(false)}}
          id="edit-time-modal"
          style={{ zIndex: isSelectTime ? 1000 : 1500 }}
        />
        <SelectTime
          show={isSelectTime}
          onHide={() => setIsSelectTime(false)}
          id="edit-time-modal"
          backdrop="static"

        />
        <Col md={6}>
          <Card id="add-company-card">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <small id="add-company-text-header">Add company</small>
                <small id="add-compnay-text-description">
                  Click button to add new company
                </small>
              </div>
              <div>
                <Button id="plus-button" onClick={() => setIsAddCompany(true)}>
                  <GoPlus />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
