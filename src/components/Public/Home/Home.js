import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { ReactComponent as Booking } from "../../../assets/svg/flightBooking.svg";
import { ReactComponent as Elipse1 } from "../../../assets/svg/elipse1.svg";
import { ReactComponent as Elipse2 } from "../../../assets/svg/elipse2.svg";
import { ReactComponent as Elipse3 } from "../../../assets/svg/elipse3.svg";
import { ReactComponent as Elipse4 } from "../../../assets/svg/elipse4.svg";
import { CgBriefcase, CgCalendarDates } from "react-icons/cg";
import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { usePublicContext } from "../../context/PublicContext";
import BookCompany from "./BookCompany/BookCompany";
import UserInfo from "./UserInfo/UserInfo";
import ConfirmBook from "./ConfirmBook/ConfirmBook";

import "./home.css";
function Home() {
  var history = useHistory();
  const bookRef = useRef();
  const {
    companies,
    setCurrentBookCompany,
    isBookingCompany,
    setIsBookingCompany,
    isUserInfoShow,
    setIsUserInfoShow,
    isConfirmBookShow,
    setIsConfirmBookShow,
  } = usePublicContext();

  const renderCompanyServices =
    companies &&
    companies.map((company, compIndex) => {
      return company.services.map((service, servIndex) => {
        return (
          <Col
            md={4}
            className="mt-5 d-flex justify-content-center align-items-center"
            key={compIndex.toString() + servIndex.toString()}
          >
            <Card className="view-company-container">
              <Card.Img
                variant="top"
                src={company.photo}
                className="view-company-image"
              />

              <Card.Body>
                <div>
                  <small className="mt-2 view-company-title">
                    {company.companyName}
                  </small>
                  <div className="home-card-description ">
                    {service.description.slice(0, 150)}
                  </div>
                </div>
                <Container className="mt-2">
                  <Row>
                    <div className="d-flex justify-content-center align-items-center">
                      <CgBriefcase className="mr-2" color="#200E32" />
                      <small className="view-company-description">
                        {service.name}
                      </small>
                    </div>
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-center align-items-center">
                      <AiOutlineClockCircle className="mr-2" color="#200E32" />
                      <small className="view-company-description">
                        {" "}
                        08.00 - 19.00
                      </small>
                    </div>
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-center align-items-center">
                      <AiOutlineDollarCircle className="mr-2" color="#200E32" />
                      <small className="view-company-description">
                        {service.price} RON
                      </small>
                    </div>
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-center align-items-center">
                      <CgCalendarDates className="" color="#200E32" />
                      <div className="view-company-description d-flex ml-2">
                        {Object.keys(service.availability).map((k, i) => {
                          return (
                            <div key={k}>
                              {service.availability[k].isOpen && (
                                <div className="d-block text-capitalize mr-2">
                                  {service.availability[k].isOpen &&
                                    k.slice(0, 3)}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Row>
                </Container>
                <button
                  className="company-card-view-company-button mt-3"
                  type="button"
                  onClick={() => {
                    setIsBookingCompany(true);
                    setCurrentBookCompany({
                      ...company,
                      selectedIndex: servIndex,
                    });
                  }}
                >
                  <div>Book service</div>
                </button>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    });

  return (
    <Container fluid className="home-container py-5 px-5">
      <Row>
        {isBookingCompany && (
          <BookCompany
            show={isBookingCompany}
            onHide={() => {
              setIsBookingCompany(false);
              setCurrentBookCompany({});
            }}
            animation={false}
            backdrop="static"
          />
        )}

        {isUserInfoShow && (
          <UserInfo
            show={isUserInfoShow}
            onHide={() => {
              setIsUserInfoShow(false);
            }}
            animation={false}
            backdrop="static"
          />
        )}
        {isConfirmBookShow && (
          <ConfirmBook
            show={isConfirmBookShow}
            onHide={() => {
              setIsConfirmBookShow(false);
            }}
            animation={false}
            backdrop="static"
          />
        )}
      </Row>
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
            <button
              type="button"
              className="home-button mt-3"
              onClick={() =>
                window.scrollTo({
                  behavior: "smooth",
                  top: bookRef.current.offsetTop,
                })
              }
            >
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
      <Row ref={bookRef}>{renderCompanyServices}</Row>
    </Container>
  );
}

export default Home;
