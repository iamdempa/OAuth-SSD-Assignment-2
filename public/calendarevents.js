import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useForm } from "react-hook-form";
import CalendarEventsCreate from "./calendar";

import "./App.scss";
import axios from "axios";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const CalenderEvents = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [descripion, setDescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(startdate);
    let splitDate = startdate.split("-");
    let month = splitDate[1];
    let date = splitDate[2];
    let year = splitDate[0];

    console.log(enddate);
    let splitEnd = enddate.split("-");
    let month_end = splitEnd[1];
    let date_end = splitEnd[2];
    let year_end = splitEnd[0];

    let newStartDate = year + "-" + month + "-" + date + "T09:00:00-07:00";
    console.log("New Start Date: " + newStartDate);
    let newEndDate =
      year_end + "-" + month_end + "-" + date_end + "T17:00:00-07:00";

    console.log("New End Date: " + newEndDate);

    var testEvent = {
      summary: summary,
      location: location,
      description: descripion,
      start: {
        dateTime: newStartDate,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: newEndDate,
        timeZone: "America/Los_Angeles",
      },
    };

    axios
      .post("http://localhost:5000/create", {
        testEvent,
      })

      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    setTimeout(function () {
      setSummary("");
      setLocation("");
      setDescription("");
      setStartdate("");
      setEnddate("");

      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      <CalendarEventsCreate />

      <Container>
        {data.length == 0 ? (
          <Row>
            <Col>
              <h4>No Events Found</h4>
              <hr />
            </Col>
          </Row>
        ) : (
          <div>
            <Row>
              <Col>
                <h4>Scheduled Events</h4>
                <hr />
                <br />
              </Col>
            </Row>
            <Row>
              {data.map(function (item, i) {
                return (
                  <Col key={i}>
                    <Card style={{ width: "18rem" }}>
                      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                      <Card.Body>
                        <Card.Title>
                          {item.summary.length > 20
                            ? item.summary.substring(0, 20) + "..."
                            : item.summary}
                        </Card.Title>
                        <Card.Text>
                          {item.description.length > 100
                            ? item.description.substring(0, 100) + "..."
                            : item.description}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {data.length == 0 ? (
          <p></p>
        ) : (
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <h4>Create a Calendar Event</h4>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
            <Form style={{ marginBottom: 30 }} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  name="summary"
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) => setSummary(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This is the title of your event
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  name="startdate"
                  type="date"
                  placeholder="Select start date"
                  onChange={(e) => {
                    setStartdate(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  name="enddate"
                  type="date"
                  placeholder="Select end date"
                  onChange={(e) => {
                    setEnddate(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        {/* <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="success" size="lg">
              Create Event
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row> */}
      </Container>
    </div>
  );
};

ReactDOM.render(<CalenderEvents />, document.getElementById("root"));
