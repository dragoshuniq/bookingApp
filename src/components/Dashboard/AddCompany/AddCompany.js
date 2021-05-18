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
import { useAddContext } from "../AddCompanyContext";
import { auth } from "../../../firebase";

import firebase from "firebase";

import { GoPlus } from "react-icons/go";
import dayjs from "dayjs";
import "./add-company.css";

function AddCompany(props) {
  const [validatedProfile, setValidatedProfile] = useState(false);
  const [validatedServices, setValidatedServices] = useState(false);

  const [activeButton, setActiveButton] = useState("profile");

  const [file, setFile] = React.useState(null);
  const [fileUrl, setFileUrl] = React.useState(null);
  const companyNameRef = useRef();
  const companyDescriptionRef = useRef();

  const { setIsEditTime } = useAddContext();

  const activeButtonProps = {
    textDecoration: "underline",
    textUnderlineOffset: 4,
    color: "#EF6313",
    textDecorationThickness: 2,
  };

  const onClickActiveButton = (button) => {
    setActiveButton(button);
  };

  const onFileChange = async (e) => {
    var file = e.target.files[0];
    setFile(file);
  };

  const uploadImageCloud = () => {
    try {
      const fileRef = firebase.storage().ref().child(file.name);
      fileRef.put(file);
      setFileUrl(fileRef.getDownloadURL());
      console.log(fileUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const addCompany = () => {
    uploadImageCloud();
    firebase
      .firestore()
      .collection("companies")
      .doc()
      .set({
        photo: fileUrl,
        companyName: companyNameRef.current.value,
        companyDescription: companyDescriptionRef.current.value,
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitProfile = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedProfile(true);
    addCompany();
  };
  const handleSubmitServices = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidatedServices(true);
    uploadImageCloud();
    addCompany();
  };

  const Profile = () => {
    return (
      <Form
        noValidate
        validated={validatedProfile}
        onSubmit={handleSubmitProfile}
      >
        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Company logo
          </Form.Label>

          <FormFile required className="add-company-logo">
            {/* <GoPlus id="add-image-logo" /> */}

            <Form.File.Input
              accept="image/x-png,image/gif,image/jpeg"
              required
              onChange={onFileChange}
            />
          </FormFile>
        </Form.Group>

        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Company Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Lorem company"
            className="add-company-input"
            ref={companyNameRef}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="add-company-form-text-label">
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Company description"
            className="add-company-input"
            required
            ref={companyDescriptionRef}
          />
        </Form.Group>

        <Button type="submit" className="add-company-submit-button mb-5 mt-4">
          Save profile
        </Button>
      </Form>
    );
  };

  const Services = () => {
    const [services, setServices] = useState([
      {
        duration: 30,
        price: 10,
        name: "",
        description: "",
        capacity: 1,
      },
    ]);

    const buttonSelectedStyle = {
      color: "#EF6313",
      borderColor: "#EF6313",
    };

    const addService = () => {
      setServices([
        ...services,
        { duration: 30, price: 10, name: "", description: "", capacity: 1 },
      ]);
    };

    const updateService = (val, ind, type) => {
      const srvs = JSON.parse(JSON.stringify(services));
      srvs[ind][type] = val;
      setServices(srvs);
      // console.log(services[ind]);
    };

    const myDynamicForm = services.map((val, ind) => {
      const priceButtons = Array.from({ length: 7 }, (_, i) => i + 1).map(
        (value, index) => {
          return (
            <button
              type="button"
              className="service-select-value-button mr-3 mb-2"
              key={index}
              style={
                services[ind].price === value * 10 ? buttonSelectedStyle : null
              }
              onClick={() => updateService(value * 10, ind, "price")}
            >
              {value * 10}
            </button>
          );
        }
      );

      const durationButtons = Array.from({ length: 7 }, (_, i) => i + 1).map(
        (value, index) => {
          return (
            <button
              type="button"
              className="service-select-value-button mr-2 mb-2"
              key={index}
              style={
                services[ind].duration === value * 30
                  ? buttonSelectedStyle
                  : null
              }
              onClick={() => updateService(value * 30, ind, "duration")}
            >
              {value * 30}
            </button>
          );
        }
      );

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
              onChange={(e) =>
                updateService(e.target.value, ind, "description")
              }
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
                    onClick={() => setIsEditTime(true)}
                  >
                    EDIT
                  </button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> SUNDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> MONDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> TUESDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> WEDNESDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> THUESDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> FRIDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="service-availability-text"> SATURDAY</Col>
                <Col className="d-flex justify-content-end service-availability-text">
                  08.00 - 18.00
                </Col>
              </Row>
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
              />

              <button className="service-add-manually-button" type="button">
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
              />
              <button className="service-add-manually-button" type="button">
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
  };

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
            Add Company
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-company-modal-body ">
          <div
            className="d-flex justify-content-around align-items-center mb-3 mt-2"
            style={{ width: "100%", borderBottom: "1px solid #dee2e6" }}
          >
            <button
              onClick={() => onClickActiveButton("profile")}
              className="button-group-add-modal"
              style={activeButton === "profile" ? activeButtonProps : null}
            >
              Profile
            </button>
            <button
              onClick={() => onClickActiveButton("services")}
              className="button-group-add-modal"
              style={activeButton === "services" ? activeButtonProps : null}
            >
              Services
            </button>
            <button
              onClick={() => onClickActiveButton("payment")}
              className="button-group-add-modal"
              style={activeButton === "payment" ? activeButtonProps : null}
            >
              Payment
            </button>
          </div>
          {activeButton === "profile" && <Profile />}
          {activeButton === "services" && <Services />}
          {activeButton === "payment" && <div />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCompany;
