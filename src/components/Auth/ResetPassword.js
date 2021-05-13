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
import * as AIcons from "react-icons/ai";
import firebase from "firebase";

import "./sign.css";

export default function ResetPassword(props) {
  const { confirmPasswordReset } = useAuth();

  const history = useHistory();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const [validated, setValidated] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(props.location.search);
    const code = params.get("oobCode");
    const form = event.currentTarget;
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password doesn't match!");
      return;
    }
    if (!checkPassword(passwordRef.current.value)) {
      setError(
        "The new password must contain one or more: uppercase and lowercase letters, numerical digits, special characters, and length should have at least 12 symbols."
      );
      return;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setIsLoadingForm(true);
        confirmPasswordReset(code, passwordRef.current.value)
          .then(() => {
            setError("");
            handleShow();
          })
          .catch((err) => {
            setError(err.message);
          });
      } catch (error) {}
    }
    setValidated(true);
    setIsLoadingForm(false);
  };

  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,}$/;
    return re.test(str);
  }

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
              The password was successfully changed!
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
              <Card.Body className="d-flex align-items-center">
                <div>
                  <div className="d-flex justify-content-center align-items-center">
                    <ResetPasswordImage style={{ width: 200, height: 200 }} />
                  </div>
                  <h2 className="text-center mb-4 sign-form-text">
                    Change Password
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
                    <Form.Group id="password">
                      <Form.Label className="form-text">Password</Form.Label>
                      <div className="d-flex justify-content-center align-items-center">
                        <Form.Control
                          type={isPassword ? "password" : "text"}
                          minLength={12}
                          ref={passwordRef}
                          required
                          className="form-input"
                          placeholder="+12 character"
                        />
                        {!isPassword && (
                          <AIcons.AiOutlineEyeInvisible
                            className="eye-icon"
                            size={26}
                            color="#BDBDBD"
                            style={{ position: "absolute", right: "22%" }}
                            onClick={() => setIsPassword(!isPassword)}
                          />
                        )}
                        {isPassword && (
                          <AIcons.AiOutlineEye
                            className="eye-icon"
                            size={26}
                            color="#BDBDBD"
                            style={{ position: "absolute", right: "22%" }}
                            onClick={() => setIsPassword(!isPassword)}
                          />
                        )}
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                      <Form.Label className="form-text">Confirm</Form.Label>
                      <div className="d-flex justify-content-center align-items-center">
                        <Form.Control
                          type={isConfirmPassword ? "password" : "text"}
                          minLength={12}
                          ref={passwordConfirmRef}
                          required
                          className="form-input"
                          placeholder="+12 character"
                        />
                        {!isConfirmPassword && (
                          <AIcons.AiOutlineEyeInvisible
                            className="eye-icon"
                            size={26}
                            color="#BDBDBD"
                            style={{ position: "absolute", right: "22%" }}
                            onClick={() =>
                              setIsConfirmPassword(!isConfirmPassword)
                            }
                          />
                        )}
                        {isConfirmPassword && (
                          <AIcons.AiOutlineEye
                            className="eye-icon"
                            size={26}
                            color="#BDBDBD"
                            style={{ position: "absolute", right: "22%" }}
                            onClick={() =>
                              setIsConfirmPassword(!isConfirmPassword)
                            }
                          />
                        )}
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      className="w-100 submit-form"
                      type="submit"
                      style={{ borderRadius: 10 }}
                      disabled={isLoadingForm}
                    >
                      <small className="submit-form-text">
                        Change Password
                      </small>
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
