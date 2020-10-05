import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import CalendarEventsCreate from "./calendar";

import "./App.scss";
import axios from "axios";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const CalenderEvents = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [summary, setSummary] = useState("");
  const [descripion, setDescription] = useState("");

  const fields = [
    { key: "image", _style: { width: "10%" } },
    { key: "name" },
    "number",
  ];

  // useEffect(() => {
  //   fetch("/events").then((res) => {
  //     return res.json()
  //   }).then((responseJson) => {
  //     console.log(responseJson);
  //     setData(data);
  //   })
  // });

  useEffect(() => {
    fetch("/events")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);
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
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" />
                <Form.Text className="text-muted">
                  This is the title of your event
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Event Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" />
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
