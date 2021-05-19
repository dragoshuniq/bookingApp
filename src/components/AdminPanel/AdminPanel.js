import React from "react";
import { Container, Navbar, Button, Row, Col, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as BookingLogo } from "../../assets/svg/bookingLogo.svg";
import Sidebar from "../SideBar/Sidebar";
import "./admin-panel.css";

function AdminPanel({ children }) {
  const { userData, signOut } = useAuth();
  return (
    <div className="admin-panel">
      <Navbar expand="lg" style={{ backgroundColor: "white",height:"10vh" }}>
        <Navbar.Brand
          href="#home"
          className="d-flex justify-content-center align-items-center"
        >
          <BookingLogo
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-top ml-2 mr-3"
          />{" "}
          <small id="logo-text">Booking App </small>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <div className="mr-5" id="admin-info-container">
          <Image
            src={
              userData
                ? userData.photo
                : "https://filmfare.wwmindia.com/content/2018/feb/1_1519025892.jpg"
            }
            // roundedCircle
            id="user-image"
          />
          <div>
            <small id="admin-name-text">
              {userData ? userData.displayName : "Joe Doel"}
            </small>
            <small id="admin-status-text">Admin</small>
          </div>

          <Button
            onClick={signOut}
            id="sign-out-button"
            className="d-flex justify-content-center align-items-center"
          >
            Log out
          </Button>
        </div>
      </Navbar>
      <Container
        fluid
        id="admin-container"
        className="remove-all-margin remove-all-padding"
      >
        <Row>
          <Col style={{ backgroundColor: "red" }}></Col>
        </Row>
        <Row>
          {/* admin */}
          <Col
            xs={2}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            style={{ backgroundColor: "white", height: "90vh" }}
          >
            {/* <Sidebar /> */}
          </Col>
          {/* children content  */}
          <Col className="admin-panel-children ">{children}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminPanel;
