import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper";
import "./time.css";
import { useAddContext } from "../AddCompanyContext";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);

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
    loopAdditionalSlides: 0,
    direction: "vertical",
    centeredSlides: true,
    slideToClickedSlide: true,
  };
  const {
    currentTimeEdit,
    currentTimeTable,
    setCurrentTimeTable,
    setIsSelectTime,
  } = useAddContext();
  const [hour, setHour] = useState(currentTimeEdit.hour);
  const [min, setMin] = useState(currentTimeEdit.min);

  const onSaveTime = () => {
    var minutes = min < 0 ? min + 60 : min;
    var hours = hour < 0 ? hour + 24 : hour;

    var changeType = currentTimeEdit.type === "open" ? "openTime" : "closeTime";
    setCurrentTimeTable({
      ...currentTimeTable,
      [currentTimeEdit.day]: {
        ...currentTimeTable[currentTimeEdit.day],
        [changeType]:
          ("0" + hours.toString()).slice(-2) +
          "." +
          ("0" + minutes.toString()).slice(-2),
      },
    });

    setIsSelectTime(false);
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
          <Modal.Title style={{ textTransform: "capitalize" }}>
            {currentTimeEdit.type} Time
          </Modal.Title>
        </Modal.Header>
        <div className="picker">
          <Swiper
            spaceBetween={20}
            onSlideChange={(slider) => setHour(slider.activeIndex - 3)}
            onSwiper={(swiper) => console.log(swiper)}
            {...settings}
            initialSlide={currentTimeEdit.hour}
            className="swiper-container hours"
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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
            onSlideChange={(slider) => setMin(slider.activeIndex - 3)}
            onSwiper={(swiper) => console.log(swiper)}
            {...settings}
            className="swiper-container minutes"
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            initialSlide={currentTimeEdit.min}
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
        <div className="vizor"></div>
        <Modal.Footer style={{ borderWidth: 0 }}>
          <button className="save-time-button mr-4" onClick={onSaveTime}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectTime;
