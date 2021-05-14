import React, { useRef, useState } from "react";
import { Button, Card, Row, Col, Alert } from "react-bootstrap";
import AddCompany from "./AddCompany/AddCompany";
import { GoPlus } from "react-icons/go";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";
function Dashboard() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="mt-4 mb-4">
        <small id="overview-text" className="">
          Overview
        </small>
      </div>
      <Row>
        <AddCompany show={modalShow} onHide={() => setModalShow(false)} />
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
                <Button id="plus-button" onClick={() => setModalShow(true)}>
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
