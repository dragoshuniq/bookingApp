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
import { Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";

import { ReactComponent as SignUpImage } from "../../assets/svg/signUp.svg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";
import { FaFacebookF } from "react-icons/fa";
import * as AIcons from "react-icons/ai";
import "./sign.css";
export default function SignUp() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
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
        signUp(emailRef.current.value, passwordRef.current.value, {
          displayName:
            firstNameRef.current.value + " " + lastNameRef.current.value,
        });
      } catch (error) {}
    }

    setValidated(true);

    setIsLoadingForm(false);
  };

  const { signUp, socialMediaSign, error, setUserDB } = useAuth();

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
                  Let's grow your business!
                </h2>
                <h2 className="text-center sign-above-image-text">
                  Viverra gravida parturient pharetra amet, lorem lacinia.
                </h2>
              </div>
              <SignUpImage style={{ width: 516, height: 516 }} />
            </Row>
          </Col>
          <Col className="d-flex justify-content-center align-items-center card-sign">
            <Card className="d-flex justify-content-center align-items-center card-sign">
              <Card.Body className="d-flex align-items-center">
                <div>
                  <h2 className="text-center mb-4 sign-form-text">
                    Create account
                  </h2>
                  <Button
                    className="w-100 google-sign-button mb-3 d-flex justify-content-center align-items-center"
                    onClick={() => socialMediaSign("google")}
                  >
                    <GoogleIcon style={{ height: 16 }} className="mr-3" />
                    <small className="sign-social-text">
                      {" "}
                      sign up with google{" "}
                    </small>
                  </Button>
                  <Button
                    className="w-100 facebook-sign-button mb-3 d-flex justify-content-center align-items-center"
                    onClick={() => socialMediaSign("facebook")}
                  >
                    <FaFacebookF style={{ height: 16 }} className="mr-3" />
                    <small className="sign-social-text">
                      {" "}
                      sign up with facebook{" "}
                    </small>
                  </Button>
                  <div className="separator">or</div>
                  {error.message && error.type === "signup" && (
                    <Alert variant="danger" className="alert-error ">
                      {" "}
                      {error.message}
                    </Alert>
                  )}
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group id="firstName" className="mb-1">
                      <Form.Label className="form-text">First name</Form.Label>
                      <Form.Control
                        type="text"
                        ref={firstNameRef}
                        required
                        placeholder="John"
                        className="form-input"
                        name="firstName"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id="lastName" className="mb-1">
                      <Form.Label className="form-text">Last name</Form.Label>
                      <Form.Control
                        type="text"
                        ref={lastNameRef}
                        required
                        className="form-input"
                        placeholder="Doe"
                        name="lastName"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id="email" className="mb-1">
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
                    <Form.Group id="password" className="mb-1">
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
                    <Form.Group>
                      <Form.Check name="terms">
                        <Form.Check.Input type="checkbox" required />
                        <Form.Check.Label className="terms-text">
                          I agree with terms and services
                        </Form.Check.Label>
                        <Form.Control.Feedback type="invalid">
                          You must agree before submitting.
                        </Form.Control.Feedback>
                      </Form.Check>
                    </Form.Group>
                    <Button
                      className="w-100 submit-form"
                      type="submit"
                      disabled={isLoadingForm}
                    >
                      <small className="submit-form-text">Create account</small>
                    </Button>
                  </Form>
                  <div className="w-100 mt-2 terms-text">
                    Have an account?{" "}
                    <Link to="/signin" className="text-danger">
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
