import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import firebase from "firebase";
import dayjs from "dayjs";
import { BiFilterAlt } from "react-icons/bi";
import FilterModal from "./FilterModal/FilterModal";
import { useAdminContext } from "../context/AdminContext";

import "./bookings.css";
function Bookings() {
  const [bookings, setBookings] = useState(new Map());
  const [defaultBookings, setDefaultBookings] = useState(new Map());

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { allServices } = useAdminContext();
  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = (bookings) => {
    firebase
      .firestore()
      .collection("bookings")
      .get()
      .then((snapshot) => {
        var bookings = new Map();
        snapshot.forEach((doc) => {
          var data = doc.data();
          data.id = doc.id;

          if (!bookings.has(data.companyID)) {
            var arr = [];
            arr.push(data);
            bookings.set(data.companyID, arr);
          } else {
            var getArr = bookings.get(data.companyID);
            getArr.push(data);
            bookings.set(data.companyID, getArr);
          }
        });
        setBookings(bookings);
        setDefaultBookings(bookings);
      });
  };

  const renderTables = Array.from(bookings).map(([key, value]) => {
    return (
      <Row key={key + Math.random() + Math.random()}>
        <Card className="bookings-card">
          <div className="bookings-company-name">
            {bookings.get(key)[0].companyName}
          </div>
          <div className="bookings-company-subtitle">BOOKING APPOINTMENT</div>
          <Table responsive>
            <thead className="bookings-thead">
              <tr>
                <th>
                  Customer name
                  <div> </div>
                </th>
                <th>Service</th>
                <th>Booking time</th>
                <th>Duration</th>
                <th>Total Price</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {value.map((k, v) => {
                return (
                  <tr key={k + Math.random() + Math.random()}>
                    <td>
                      <div className="table-td-text">
                        {k.bookPerson.firstName + " " + k.bookPerson.lastName}
                      </div>
                      <div className="table-td-text-bottom ">
                        {k.bookPerson.email}
                      </div>
                      <div className="table-td-text-bottom ">
                        {k.bookPerson.phone}
                      </div>
                    </td>
                    <td>
                      <div className="table-td-text"> {k.serviceName}</div>
                    </td>
                    <td>
                      <div className="table-td-text">
                        {dayjs(k.date.toDate()).format("DD/MM/YYYY")}
                      </div>
                      <div className="table-td-text-bottom ">
                        {dayjs(k.time.toDate()).format("HH.mm")} -
                        {dayjs(k.time.toDate())
                          .add(k.duration, "m")
                          .format("HH.mm")}
                      </div>
                    </td>
                    <td>
                      <div className="table-td-text">{k.duration} minutes</div>
                    </td>
                    <td>
                      <div className="table-td-text">{k.price} RON</div>
                    </td>
                    <td>
                      <div className="table-td-text">{k.capacity} Person</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </Row>
    );
  });

  const applyFilter = (name, time, duration) => {
    var myFilteredMap = new Map();

    for (let [key, value] of defaultBookings) {
      value.map((val, ind) => {
        if (
          name === val.serviceName &&
          dayjs(val.date.toDate()).format("DD/MM/YYYY") ===
            dayjs(time).format("DD/MM/YYYY") &&
          parseInt(duration) === parseInt(val.duration)
        ) {
          if (!myFilteredMap.has(val.companyID)) {
            var arr = [];
            arr.push(val);
            myFilteredMap.set(val.companyID, arr);
          } else {
            var getArr = myFilteredMap.get(val.companyID);
            getArr.push(val);
            myFilteredMap.set(val.companyID, getArr);
          }
        }
      });
    }
    setBookings(myFilteredMap);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setBookings(defaultBookings);
    setIsFilterOpen(false);
  };

  return (
    <div className="admin-panel-children">
      <Container>
        <Row>
          {isFilterOpen && (
            <FilterModal
              animation={false}
              show={isFilterOpen}
              onHide={() => setIsFilterOpen(false)}
              backdrop="static"
              centered
              size="md"
              applyFilter={applyFilter}
              clearFilters={clearFilters}
            />
          )}
        </Row>
        <Row>
          <div className="bookings-title my-5">Bookings</div>
        </Row>
        <Row className="d-flex justify-content-end align-items-center">
          <div>
            <button
              type="button"
              className="bookings-filter-button d-flex justify-content-center align-items-center"
              onClick={() => setIsFilterOpen(true)}
            >
              Filter
              <BiFilterAlt />
            </button>
          </div>
        </Row>
        {bookings.size > 0 ? (
          renderTables
        ) : (
          <>
            <Row>
              <h1>Sorry , there are no services to show for you filters</h1>
            </Row>
            <Row className="d-flex d-flex justify-content-center align-items-center">
              <Button
                type="button"
                variant="danger"
                className="d-block"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Bookings;
