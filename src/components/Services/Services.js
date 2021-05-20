import React, { useRef, useState } from "react";
import { Button, Card, Row, Col, Alert, Image, Spinner } from "react-bootstrap";

import EditService from "./EditService/EditService";
import { useAdminContext } from "../context/AdminContext";
import { HiOutlinePencil } from "react-icons//hi";
import { FiTrash } from "react-icons/fi";

import "./services.css";
function Services(props) {
  const {
    companies,
    isEditServiceShow,
    setIsEditServiceShow,
    setCompanyToEdit,
    setServices,
  } = useAdminContext();

  const renderServices = companies.map((comp) => {
    return (
      <Col md={6} className="mt-5 d-flex align-items-center" key={comp.id}>
        <Card className="company-card">
          <Card.Body>
            <Row>
              <Col>
                <div className="services-card-title">{comp.companyName}</div>
              </Col>
            </Row>
            {comp.services &&
              comp.services.map((serv, servInd) => {
                return (
                  <Row
                    key={servInd}
                    className={
                      comp.services.length !== servInd + 1 &&
                      "services-row-border"
                    }
                  >
                    <Col>
                      <div className="services-card-field-key mt-4">
                        Service name
                      </div>
                      <div className="services-card-field-value">
                        {serv.name}
                      </div>

                      <div className="services-card-field-key">Description</div>
                      <div className="services-card-field-value">
                        {serv.description.slice(0, 150)}
                      </div>

                      <div className="services-card-field-key">
                        Availibility
                      </div>
                      <div className="services-card-field-value d-flex">
                        {Object.keys(comp.services[servInd].availability).map(
                          (k, i) => {
                            return (
                              <div key={k}>
                                {comp.services[servInd].availability[k]
                                  .isOpen && (
                                  <div className="d-block text-capitalize mr-2">
                                    {comp.services[servInd].availability[k]
                                      .isOpen && k.slice(0, 3)}
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>

                      <div className="services-card-field-key">Capacity</div>
                      <div className="services-card-field-value">
                        {serv.capacity}{" "}
                        {serv.capacity > 1 ? "persons" : "person"}
                      </div>

                      <div className="services-card-field-key">Duration</div>
                      <div className="services-card-field-value">
                        {serv.duration} min
                      </div>

                      <div className="services-card-field-key">Price</div>
                      <div className="services-card-field-value">
                        {serv.price} RON
                      </div>
                    </Col>
                  </Row>
                );
              })}

            <Row className="mt-3">
              <Col>
                <button
                  className="company-card-crud-buttons d-flex justify-content-center align-items-center"
                  type="button"
                  onClick={() => {
                    setIsEditServiceShow(true);
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
                  onClick={() => {}}
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
                  onClick={() => {}}
                >
                  <div>Add service</div>
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
          Services
        </small>
      </div>
      <Row>
        <EditService
          show={isEditServiceShow}
          onHide={() => setIsEditServiceShow(false)}
          animation={false}
          backdrop="static"
        />
      </Row>
      <Row>{renderServices}</Row>
    </div>
  );
}

export default Services;
