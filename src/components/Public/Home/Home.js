import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ReactComponent as Booking } from "../../../assets/svg/flightBooking.svg";
import { ReactComponent as Elipse1 } from "../../../assets/svg/elipse1.svg";
import { ReactComponent as Elipse2 } from "../../../assets/svg/elipse2.svg";
import { ReactComponent as Elipse3 } from "../../../assets/svg/elipse3.svg";
import { ReactComponent as Elipse4 } from "../../../assets/svg/elipse4.svg";

import { useHistory } from "react-router-dom";

import "./home.css";
function Home() {
  var history = useHistory();

  return (
    <Container fluid className="home-container py-5 px-5">
      <Row>
        <Col className="d-flex justify-content-end align-items-center mr-3">
          <button
            type="button"
            className="home-button mt-3"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Login
          </button>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col className="d-flex align-items-center">
          <div className="mx-5">
            <div className="home-title-text">
              Book Service As Easy As One Click
            </div>
            <div className="home-undertitle-text mt-3">
              Welcome to Booking.app the web based app that make your live much
              easier
            </div>
            <button type="button" className="home-button mt-3">
              Book now
            </button>
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Booking
            style={{
              width: "50%",
              height: "auto",
            }}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="">
          <Row className="d-flex justify-content-center align-items-center">
            <div className="home-title-text" style={{ fontSize: 32 }}>
              Simple and easy steps to booking
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <div className="home-undertitle-text mt-3 d-block">
              A few simple steps to booking a service, see how easy to booking
            </div>
          </Row>
        </Col>
      </Row>
      <Row className="my-5 position-relative d-flex justify-content-center align-items-center">
        <div id="border-icons" />
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-wrapper d-flex justify-content-center align-items-center">
            <Elipse1 />
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-wrapper">
            <Elipse2 />
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-wrapper">
            <Elipse3 />
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-wrapper">
            <Elipse4 />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-text-bottom">Choose Company</div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-text-bottom">Select service</div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-text-bottom">Select the date</div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-text-bottom">Book Service</div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-subtext-bottom">
            Amet quisque eleifend justo, duis
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-subtext-bottom">
            Lectus nisi suspendisse sit euismod
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-subtext-bottom">
            Consequat lacinia molestie nisl sit
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="home-icon-subtext-bottom">
            Dignissim sit malesuada ut lectus
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col className="">
          <Row className="d-flex justify-content-center align-items-center">
            <div className="home-title-text" style={{ fontSize: 32 }}>
              Company List
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <div className="home-undertitle-text mt-3 d-block">
              Let’s book a service from our company list
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
