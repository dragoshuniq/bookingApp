import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { ReactComponent as SignInImage } from "../../assets/svg/signIn.svg";
import * as AIcons from "react-icons/ai";
import "./sign.css";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isPassword, setIsPassword] = useState(true);
  const [validated, setValidated] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setIsLoadingForm(true);
        signIn(emailRef.current.value, passwordRef.current.value);
      } catch (error) {}
    }

    setValidated(true);

    setIsLoadingForm(false);
  };

  const { signIn, error } = useAuth();

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
          <Col>
            <Row className="d-flex justify-content-center align-items-center">
              <div>
                <h2
                  className="text-center sign-form-text"
                  style={{ fontSize: 40 }}
                >
                  Hello, Welcome Back !
                </h2>
                <h2 className="text-center sign-above-image-text">
                  Quis sagittis, velit est vitae.
                </h2>
              </div>
              <SignInImage style={{ width: 516, height: 516 }} />
            </Row>
          </Col>
          <Col className="d-flex justify-content-center align-items-center card-sign">
            <Card className="d-flex align-items-center card-sign">
              <Card.Body className="d-flex align-items-center">
                <div>
                  <h2 className="text-center mb-4 sign-form-text">Login</h2>
                  {error.message && error.type === "signin" && (
                    <Alert variant="danger" className="alert-error">
                      {" "}
                      {error.message}
                    </Alert>
                  )}

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group id="email">
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
                    <Form.Group id="password">
                      <Form.Label className="form-text">Password</Form.Label>
                      <div className="d-flex justify-content-center align-items-center">
                        <Form.Control
                          type={isPassword ? "password" : "text"}
                          minLength={6}
                          ref={passwordRef}
                          required
                          className="form-input"
                          placeholder="+6 character"
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
                    <div className="mb-3 mt-3">
                      <Link to="/forgot-password">
                        <strong style={{ color: "#2798C6" }}>
                          Forgot password?
                        </strong>
                      </Link>
                    </div>
                    <Button
                      className="w-100 submit-form"
                      type="submit"
                      style={{ borderRadius: 10 }}
                      disabled={isLoadingForm}
                    >
                      <small className="submit-form-text">Login</small>
                    </Button>
                  </Form>
                  <div className="w-100 mt-4 terms-text">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <strong style={{ color: "#2798C6" }}>Register</strong>
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
