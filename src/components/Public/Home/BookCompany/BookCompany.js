import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { usePublicContext } from "../../../context/PublicContext";
import { TimePicker, DatePicker } from "antd";
import moment from "moment";

import "antd/dist/antd.css";
import "./book-company.css";

function BookCompany(props) {
  const {
    currentBookCompany,
    buttonSelectedStyle,
    setBookService,
    setIsUserInfoShow,
    setIsBookingCompany,
  } = usePublicContext();
  const [selectedService, setSelectedService] = useState({
    ...currentBookCompany.services[currentBookCompany.selectedIndex],
    selectedIndex: currentBookCompany.selectedIndex,
  });

  const [closedDays, setClosedDays] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  function onChangeTime(time) {
    setTime(new Date(time));
  }
  function onChangeDate(date) {
    setDate(new Date(date));
  }

  const duration = Array.from(
    {
      length: parseInt(
        currentBookCompany.services[selectedService.selectedIndex].duration / 30
      ),
    },
    (_, i) => (i + 1) * 30
  );
  duration[duration.length - 1] !==
    currentBookCompany.services[selectedService.selectedIndex].duration &&
    duration.push(
      currentBookCompany.services[selectedService.selectedIndex].duration
    );

  const capacity = Array.from(
    {
      length: parseInt(
        currentBookCompany.services[selectedService.selectedIndex].capacity
      ),
    },
    (_, i) => i + 1
  );
  capacity[capacity.length - 1] !==
    currentBookCompany.services[selectedService.selectedIndex].capacity &&
    capacity.push(
      currentBookCompany.services[selectedService.selectedIndex].capacity
    );

  const updateBookingService = (value, type) => {
    setSelectedService({ ...selectedService, [type]: value });
  };

  const renderExtraDateFooter = () => {
    return (
      <div className="d-flex align-items-center">
        <div className="closed-circle" />
        <div className="d-block ml-2">Closed </div>
        <div className="full-booked-circle ml-2" />
        <div className="ml-2">Full Booked</div>
      </div>
    );
  };

  function disabledDate(current) {
    return (
      current &&
      (current.valueOf() < Date.now() ||
        closedDays.includes(dayjs(current).format("dddd").toLowerCase()))
    );
  }

  function checkClosedDays() {
    var avail = selectedService.availability;
    var closedDays = [];
    Object.keys(avail).forEach((k, i) => {
      !avail[k].isOpen && closedDays.push(k);
    });
    return setClosedDays(closedDays);
  }
  useEffect(() => {
    var unsubscribe = checkClosedDays();
    return unsubscribe;
  }, [selectedService]);

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
            <div className="booking-company-title">
              {currentBookCompany.companyName}
            </div>
            <div className="booking-company-subtitle">booking Service</div>
          </div>
        </Modal.Header>
        <Modal.Body className="px-5">
          <div className="booking-company-service-title">Choose service</div>
          {currentBookCompany.services &&
            currentBookCompany.services.map((service, index) => {
              return (
                <button
                  type="button"
                  className="service-select-value-button mr-2 mb-2"
                  key={index}
                  style={
                    service.name === selectedService.name
                      ? buttonSelectedStyle
                      : null
                  }
                  onClick={() => {
                    setSelectedService({
                      ...currentBookCompany.services[index],
                      selectedIndex: index,
                    });
                  }}
                >
                  {service.name}
                </button>
              );
            })}
          <div className="booking-company-service-title">Duration</div>
          {duration.map((durat, index) => {
            return (
              <button
                type="button"
                className="service-select-value-button mr-2 mb-2"
                key={index}
                style={
                  selectedService.duration === durat
                    ? buttonSelectedStyle
                    : null
                }
                onClick={() => {
                  updateBookingService(durat, "duration");
                }}
              >
                {durat}
              </button>
            );
          })}
          <div className="booking-company-service-title">Capacity (person)</div>
          {capacity.map((cap, index) => {
            return (
              <button
                type="button"
                className="service-select-value-button mr-2 mb-2"
                key={index}
                style={
                  selectedService.capacity === cap ? buttonSelectedStyle : null
                }
                onClick={() => {
                  updateBookingService(cap, "capacity");
                }}
              >
                {cap}
              </button>
            );
          })}
          <div className="booking-company-service-title">Time and date</div>
          <div className="d-flex align-items-center">
            <TimePicker
              onChange={onChangeTime}
              format="HH 00"
              showNow={false}
              className="date-time-picker"
              showToday={false}
              defaultValue={moment("12", "HH")}
            />
            <DatePicker
              className="date-time-picker ml-3"
              showTime={false}
              style={{ width: 140 }}
              showToday={false}
              dateRender={(current) => {
                const style = {};
                if (
                  closedDays.includes(
                    dayjs(current).format("dddd").toLowerCase()
                  )
                ) {
                  style.border = "1px solid #EB5757";
                  style.borderRadius = "50%";
                  style.color = "#EB5757";
                }

                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
              renderExtraFooter={renderExtraDateFooter}
              disabledDate={disabledDate}
              format="DD/MM/yyyy"
              defaultValue={moment(moment().add(1, "days"), "ddd/mm/yyyy")}
              onChange={onChangeDate}
            />
          </div>
          <button
            className="company-card-view-company-button mt-3"
            type="button"
            onClick={() => {
              setBookService({
                capacity: selectedService.capacity,
                price: selectedService.price,
                duration: selectedService.duration,
                time: time,
                date: date,
                companyID: currentBookCompany.id,
                companyName: currentBookCompany.companyName,
                isConfirmed: false,
              });
              setIsUserInfoShow(true);
              setIsBookingCompany(false);
            }}
          >
            <div>Book service</div>
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookCompany;
