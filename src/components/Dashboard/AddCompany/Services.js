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
import { useAdminContext } from "../../context/AdminContext";

import firebase from "firebase";

import "./add-company.css";

function Services() {
  const [duration, setDuration] = useState(
    Array.from({ length: 7 }, (_, i) => (i + 1) * 30)
  );
  const [price, setPrice] = useState(
    Array.from({ length: 7 }, (_, i) => (i + 1) * 10)
  );

  const [customDuration, setCustomDuration] = useState();
  const [customPrice, setCustomPrice] = useState();

  const {
    setIsEditTime,
    setCurrentTimeTable,
    addService,
    updateService,
    services,
    setCurrentTimeTableIndex,
    currentDocID,
    setIsAddCompany,
  } = useAdminContext();
  const [validatedServices, setValidatedServices] = useState(false);

  const buttonSelectedStyle = {
    color: "#EF6313",
    borderColor: "#EF6313",
  };
  const handleSubmitServices = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    addServices();
    setValidatedServices(true);
  };

  const addServices = () => {
    firebase
      .firestore()
      .collection("companies")
      .doc(currentDocID)
      .set({ services: services }, { merge: true })
      .then(() => setIsAddCompany(false));
  };

  const myDynamicForm = services.map((val, ind) => {
    const priceButtons = price.map((value, index) => {
      return (
        <button
          type="button"
          className="service-select-value-button mr-3 mb-2"
          key={index}
          style={services[ind].price === value ? buttonSelectedStyle : null}
          onClick={() => updateService(value, ind, "price")}
        >
          {value}
        </button>
      );
    });

    const durationButtons = duration.map((value, index) => {
      return (
        <button
          type="button"
          className="service-select-value-button mr-2 mb-2"
          key={index}
          style={services[ind].duration === value ? buttonSelectedStyle : null}
          onClick={() => updateService(value, ind, "duration")}
        >
          {value}
        </button>
      );
    });

    const capacityButtons = Array.from({ length: 9 }, (_, i) => i + 1).map(
      (value, index) => {
        return (
          <button
            type="button"
            className="service-select-value-button mr-2 mb-2"
            key={index}
            style={
              services[ind].capacity === value ? buttonSelectedStyle : null
            }
            onClick={() => updateService(value, ind, "capacity")}
          >
            {value}
          </button>
        );
      }
    );
    const renderAvailability = Object.keys(val.availability).map(
      (key, index) => {
        return (
          <Row className="mb-2" key={index}>
            <Col className="service-availability-text">
              {Object.keys(val.availability)[index]}
            </Col>
            <Col className="d-flex justify-content-end service-availability-text">
              {val.availability[key].isOpen
                ? val.availability[key].openTime +
                  " - " +
                  val.availability[key].closeTime
                : "CLOSED"}
            </Col>
          </Row>
        );
      }
    );
    return (
      <div key={ind}>
        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Service Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Lorem service"
            className="add-company-input"
            onChange={(e) => updateService(e.target.value, ind, "name")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Service description"
            className="add-company-input"
            required
            onChange={(e) => updateService(e.target.value, ind, "description")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Availibility
          </Form.Label>
          <div className="service-availability-container">
            <Row className="mb-2">
              <Col className="d-flex justify-content-end service-availability-text">
                <button
                  className="service-availability-edit-button"
                  type="button"
                  onClick={() => {
                    setIsEditTime(true);
                    setCurrentTimeTable(val.availability);
                    setCurrentTimeTableIndex(ind);
                  }}
                >
                  EDIT
                </button>
              </Col>
            </Row>
            {renderAvailability}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Duration (min)
          </Form.Label>
          <div className="d-block">{durationButtons}</div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Control
              // disabled
              type="text"
              placeholder="220 min"
              className="service-add-manually-input"
              onChange={(e) => setCustomDuration(e.target.value)}
              value={customDuration && customDuration}
            />

            <button
              className="service-add-manually-button"
              type="button"
              onClick={() => {
                setDuration([...duration, customDuration]);
                setCustomDuration("");
              }}
            >
              Add duration
            </button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Price (RON)
          </Form.Label>
          <div className="d-block">{priceButtons}</div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Control
              type="text"
              placeholder="80 RON"
              className="service-add-manually-input"
              onChange={(e) => setCustomPrice(e.target.value)}
              value={customPrice && customPrice}
            />
            <button
              className="service-add-manually-button"
              type="button"
              onClick={() => {
                setPrice([...price, customPrice]);
                setCustomPrice("");
              }}
            >
              Add price
            </button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Capacity (person)
          </Form.Label>
          <div className="d-block">{capacityButtons}</div>
        </Form.Group>
      </div>
    );
  });

  return (
    <Form
      noValidate
      validated={validatedServices}
      onSubmit={handleSubmitServices}
    >
      {myDynamicForm}
      <Button type="submit" className="add-company-submit-button mt-4">
        Save services
      </Button>
      <button
        type="button"
        onClick={addService}
        className="mt-4 mb-5 add-company-add-service-button"
      >
        Add other services
      </button>
    </Form>
  );
}

export default Services;
