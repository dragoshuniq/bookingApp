import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
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
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      //   event.stopPropagation();
    }
    setValidated(true);
    try {
      setIsLoadingForm(true);
      signUp(emailRef.current.value, passwordRef.current.value);
    } catch (error) {}
    setIsLoadingForm(false);
  };

  const { signUp } = useAuth();

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
              <h2
                className="text-center"
                id="signFormText"
                style={{ fontSize: 40 }}
              >
                Let's grow your business!
              </h2>
              <h2 id="signUpAboveImageText">
                Viverra gravida parturient pharetra amet, lorem lacinia.
              </h2>
              <SignUpImage style={{ width: 516, height: 516 }} />
            </Row>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Card
              id="cardSign"
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Body>
                <h2 className="text-center mb-4" id="signFormText">
                  Create account
                </h2>
                <Button className="w-100 googleSignButton mb-4">
                  <GoogleIcon style={{ height: 16 }} className="mr-3" />
                  <small id="signUpSocialText"> sign up with google </small>
                </Button>
                <Button className="w-100 facebookSignButton mb-4">
                  <FaFacebookF style={{ height: 16 }} className="mr-3" />
                  <small id="signUpSocialText"> sign up with facebook </small>
                </Button>
                <div className="separator">or</div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group id="firstName">
                    <Form.Label className="formText">First name</Form.Label>
                    <Form.Control
                      type="text"
                      ref={firstNameRef}
                      required
                      placeholder="John"
                      className="formInput"
                      name="firstName"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid first name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group id="lastName">
                    <Form.Label className="formText">Last name</Form.Label>
                    <Form.Control
                      type="text"
                      ref={lastNameRef}
                      required
                      className="formInput"
                      placeholder="Doe"
                      name="lastName"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid last name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label className="formText">Email</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      className="formInput"
                      placeholder="yourmail@mail.com"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email adress.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label className="formText">Password</Form.Label>
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Control
                        type={isPassword ? "password" : "text"}
                        minLength={6}
                        ref={passwordRef}
                        required
                        className="formInput"
                        placeholder="+6 character"
                      />
                      {!isPassword && (
                        <AIcons.AiOutlineEyeInvisible
                          id="eyeIcon"
                          size={26}
                          color="#BDBDBD"
                          style={{ position: "absolute", right: "22%" }}
                          onClick={() => setIsPassword(!isPassword)}
                        />
                      )}
                      {isPassword && (
                        <AIcons.AiOutlineEye
                          id="eyeIcon"
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
                      <Form.Check.Label id="termsText">
                        I agree with terms and services
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        You must agree before submitting.
                      </Form.Control.Feedback>
                    </Form.Check>
                  </Form.Group>
                  <Button
                    className="w-100"
                    type="submit"
                    style={{ borderRadius: 10 }}
                    id="submitForm"
                    disabled={isLoadingForm}
                  >
                    <small className="submitFormText">Create account</small>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
