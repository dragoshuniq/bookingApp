import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./add-company.css";
function AddCompany(props) {
  const [activeButton, setActiveButton] = useState("profile");

  const onClickActiveButton = (button) => {
    setActiveButton(button);
  };

  const activeButtonProps = {
    textDecoration: "underline",
    textUnderlineOffset: 4,
    color: "#EF6313",
    textDecorationThickness: 2,
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-0">
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Add Company
        </Modal.Title> */}
        <div
          className="d-flex justify-content-around align-items-center "
          style={{ width: "100%" }}
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
      </Modal.Header>
      <Modal.Body className="add-company-modal-body ">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Company logo</Form.Label>
            <Form.File id="custom-file" label="+" custom />
          </Form.Group>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Company Name</Form.Label>
            <Form.Control required type="text" placeholder="Lorem company" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCompany;
