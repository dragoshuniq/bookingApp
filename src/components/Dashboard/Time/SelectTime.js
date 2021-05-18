import React, { useState, useCallback } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.scss';

import "./time.css";

const hours = () => {
  var times = [];
  for (var i = 0; i < 24; i++) {
    times.push(("0" + i).slice(-2));
  }
  return times;
};

const minutes = () => {
  var times = [];
  for (var i = 0; i < 60; i++) {
    times.push(("0" + i).slice(-2));
  }
  return times;
};

function SelectTime(props) {
  var settings = {
    slidesPerView: 3,
    loop: true,
    loopAdditionalSlides: 20,
    direction: "vertical",
    mousewheelControl: true,
    centeredSlides: true,
    slideToClickedSlide: true,
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-company-modal-header-label">
            Open Time
          </Modal.Title>
        </Modal.Header>
        <div className="picker">
          <Swiper
            spaceBetween={20}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            {...settings}
            initialSlide={0}
            className="swiper-container hours"
          >
            {hours().map((hour, index) => {
              return (
                <SwiperSlide key={index}>
                  <small>{hour}</small>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            spaceBetween={20}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            {...settings}
            className="swiper-container minutes"

          >
            {minutes().map((min, index) => {
              return (
                <SwiperSlide key={index}>
                  <small>{min}</small>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div class="vizor"></div>
        <Modal.Footer style={{ borderWidth: 0 }}>
          <button className="save-time-button mr-4">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectTime;
