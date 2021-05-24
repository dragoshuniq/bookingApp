import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";
import { useAdminContext } from "../../context/AdminContext";

import "./filter-modal.css";
function FilterModal(props) {
  const { allServices } = useAdminContext();
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(10);
  const [name, setName] = useState(allServices[0]);
  const { animation, show, onHide, backdrop, centered, size } = props;
  return (
    <Modal
      animation={animation}
      show={show}
      onHide={onHide}
      backdrop={backdrop}
      centered={centered}
      size={size}
    >
      <Modal.Header closeButton style={{ borderWidth: "0px" }}>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group id="input-filter2">
            <Form.Label className="filter-modal-label">Service</Form.Label>
            <Form.Control
              as="select"
              className="filter-modal-input"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}

            >
              {allServices.map((name, ind) => {
                return (
                  <option k={ind.toString() + Math.random()}>{name}</option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group id="input-filter2">
            <Form.Label className="filter-modal-label">Booking time</Form.Label>
            <DatePicker
              className="filter-modal-input d-block"
              defaultValue={moment(new Date(), "DD/MM/YYYY")}
              format="DD/MM/YYYY"
              onChange={(date) => {
                setTime(date);
              }}
            />
          </Form.Group>

          <Form.Group id="input-filter3">
            <Form.Label className="filter-modal-label">Duration</Form.Label>
            <Form.Control
              as="select"
              className="filter-modal-input"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              value={duration}
            >
              {Array.from({ length: 20 }, (_, i) => (i + 1) * 10).map(
                (val, ind) => {
                  return <option key={ind + Math.random()}>{val} </option>;
                }
              )}
            </Form.Control>
          </Form.Group>
        </Form>

        <button
          className="company-card-view-company-button"
          type="button"
          onClick={() => props.applyFilter(name, time, duration)}
        >
          <div>Apply filter</div>
        </button>
        <Button type="button" variant="outline-danger" className="clear-filters-button mt-2" onClick={props.clearFilters}>
          Clear filters
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default FilterModal;
