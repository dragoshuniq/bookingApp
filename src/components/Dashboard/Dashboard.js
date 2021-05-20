import React, { useRef, useState } from "react";
import { Button, Card, Row, Col, Alert, Image, Spinner } from "react-bootstrap";
import AddCompany from "./AddCompany/AddCompany";
import EditTime from "./EditTime/EditTime";
import SelectTime from "./Time/SelectTime";
import DeleteCompany from "./DeleteCompany/DeleteCompany";
import ViewCompany from "./ViewCompany/ViewCompany";
import EditCompany from "./EditCompany/EditCompany";

import { useAuth } from "../context/AuthContext";
import { useAdminContext } from "../context/AdminContext";
import { HiOutlinePencil } from "react-icons//hi";
import { FiTrash } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

import "./dashboard.css";
function Dashboard(props) {
  const {
    isAddCompany,
    isEditTime,
    isSelectTime,
    setIsAddCompany,
    setIsEditTime,
    setIsSelectTime,
    companies,
    setIsDeleteConfirmShow,
    isDeleteConfirmShow,
    setIsViewCompanyShow,
    isViewCompanyShow,
    isEditCompany,
    setIsEditCompany,
    setCompanyToEdit,
    setServices,
  } = useAdminContext();

  const renderCompanies = companies && companies.map((comp) => {
    return (
      <Col md={6} className="mt-5 d-flex align-items-center" key={comp.id}>
        <Card className="company-card">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Image src={comp.photo} className="company-card-logo" />
              </Col>
              <Col>
                <small className="company-card-title">{comp.companyName}</small>

                <div>
                  <small className="company-card-description">Status: </small>
                  <small
                    className="company-card-description ml-1"
                    style={{ color: comp.status ? "green" : "red" }}
                  >
                    {comp.status ? "Active" : "Inactive"}
                  </small>
                </div>

                <div className="mt-3" style={{ height: 100 }}>
                  <small className="company-card-description">
                    {comp.companyDescription.slice(0, 150)}
                    {comp.companyDescription.length > 150 ? "..." : ""}
                  </small>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <button
                  className="company-card-crud-buttons d-flex justify-content-center align-items-center"
                  type="button"
                  onClick={() => {
                    setIsEditCompany(true);
                    setCompanyToEdit(comp);
                    setServices(comp.services);
                  }}
                >
                  <HiOutlinePencil className="mr-1" size={14} color="#828282" />
                  <small>Edit</small>
                </button>
              </Col>
              <Col>
                <button
                  className="company-card-crud-buttons d-flex justify-content-center align-items-center"
                  type="button"
                  onClick={() =>
                    setIsDeleteConfirmShow({ show: true, id: comp.id })
                  }
                >
                  <FiTrash className="mr-1" size={14} color="#828282" />
                  <small>Delete</small>
                </button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <button
                  className="company-card-view-company-button"
                  type="button"
                  onClick={() => {
                    setIsViewCompanyShow({ show: true, company: comp });
                  }}
                >
                  <div>View company</div>
                </button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <div className="admin-panel-children">
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
          animation={false}
        />

        <EditTime
          show={isEditTime}
          onHide={() => {
            setIsEditTime(false);
          }}
          id="edit-time-modal"
          style={{ zIndex: isSelectTime ? 1000 : 1500 }}
          animation={false}
          backdrop="static"
        />
        <SelectTime
          show={isSelectTime}
          onHide={() => setIsSelectTime(false)}
          id="edit-time-modal"
          backdrop="static"
          animation={false}
        />
        <DeleteCompany
          show={isDeleteConfirmShow.show}
          onHide={() => setIsDeleteConfirmShow({ show: false, id: "" })}
        />
        <ViewCompany
          show={isViewCompanyShow.show}
          onHide={() => setIsViewCompanyShow({ show: false, company: {} })}
          animation={false}
        />
        <EditCompany show={isEditCompany} backdrop="static" animation={false} />
        <Col md={6} className="d-flex align-items-center">
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
      <Row>{renderCompanies}</Row>
    </div>
  );
}

export default Dashboard;
