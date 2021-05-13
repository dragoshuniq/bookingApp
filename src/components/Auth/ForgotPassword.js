import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as ResetPasswordImage } from "../../assets/svg/resetPassword.svg";

import "./sign.css";

export default function ForgotPassword() {
  const history = useHistory();
  const emailRef = useRef();
  const [validated, setValidated] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        resetPassword(emailRef.current.value)
          .then(() => {
            setError("");
            handleShow();
          })
          .catch((err) => setError(err.message));
        setIsLoadingForm(true);
      } catch (error) {}
    }
    setValidated(true);
    setIsLoadingForm(false);
  };

  const { resetPassword } = useAuth();

  return (
    <>
      <Container fluid>
        <Row
          style={{
            backgroundColor: "#E5E5E5",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <Modal
            show={show}
            onHide={handleClose}
            centered
            style={{ borderRadius: 20 }}
          >
            <Modal.Header closeButton>
              <Modal.Title>SUCCESS</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              An email was send to {emailRef.current && emailRef.current.value}.
              Please check your inbox
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  history.push("/signin");
                }}
                id="modal-confirm-button"
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="d-flex align-items-center card-sign">
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <ResetPasswordImage style={{ width: 300, height: 300 }} />

                  <h2 className="text-center mb-4 sign-form-text">
                    Reset password
                  </h2>
                  {error && (
                    <Alert variant="danger" className="alert-error ">
                      {" "}
                      {error}
                    </Alert>
                  )}
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group id="email" className="mb-5">
                      <Form.Label className="form-text">Email</Form.Label>
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        className="form-input"
                        placeholder="yourmail@mail.com"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email adress.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      className="w-100 submit-form"
                      type="submit"
                      style={{ borderRadius: 10 }}
                      disabled={isLoadingForm}
                    >
                      <small className="submit-form-text">Reset Password</small>
                    </Button>
                  </Form>
                  <div className="w-100 mt-4 terms-text">
                    Go back to{" "}
                    <Link to="/signin">
                      <strong style={{ color: "#2798C6" }}>Login</strong>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
