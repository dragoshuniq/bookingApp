import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { usePublicContext } from "../../../context/PublicContext";
import firebase from "firebase";
import axios from "axios";
function UserInfo(props) {
  const {
    setCurrentUserData,
    setIsConfirmBookShow,
    setIsUserInfoShow,
    bookService,
  } = usePublicContext();
  const [validatedForm, setValidatedForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handleSubmitBooking = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidatedForm(true);
    if (form.checkValidity() === true) {
      addBooking();
    }
  };

  const addBooking = () => {
    const bookPerson = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
    };

    setCurrentUserData(bookPerson);
    firebase
      .firestore()
      .collection("bookings")
      .add({ ...bookService, bookPerson })
      .then(() => {
        setLoading(true);
        sendEmail(bookPerson);
      });
  };
  function sendEmail(bookPerson) {
    try {
      axios
        .post("http://localhost:5124/sendmail", {
          bookPerson,
          companyName: bookService.companyName,
          time: bookService.time,
          date: bookService.date,
          price: bookService.price,
          duration: bookService.duration,
          serviceName: bookService.serviceName,
        })
        .then(
          (response) => {
            console.log(response);
            setIsUserInfoShow(false);
            setIsConfirmBookShow(true);
            setLoading(false);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {}
  }
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
          <div>
            <div className="booking-company-title">User Information</div>
            <div className="booking-company-subtitle">
              Please fill this information to booking
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="px-5">
          <Form
            noValidate
            validated={validatedForm}
            onSubmit={handleSubmitBooking}
          >
            <Form.Group>
              <Form.Label className="add-company-form-text-label">
                First name
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                className="add-company-input"
                ref={firstNameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="add-company-form-text-label">
                Last name
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                className="add-company-input"
                ref={lastNameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="add-company-form-text-label">
                Phone
              </Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Phone"
                className="add-company-input"
                ref={phoneRef}
                pattern="\+[0-9]{11}"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="add-company-form-text-label">
                Email
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                className="add-company-input"
                ref={emailRef}
              />
            </Form.Group>

            <Button
              type="submit"
              className="add-company-submit-button mb-5 mt-4"
              disabled={loading}
            >
              Save profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserInfo;
