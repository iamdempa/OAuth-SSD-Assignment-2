import React, { Component } from "react";

import { Container, Row, Col, Alert, Image } from "react-bootstrap";

import CalenderImage from "./extra/google-calendar.png";

class calendar extends Component {
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Container>
          <Row style={{ marginLeft: 150 }}>
            <Col></Col>
            <Col>
              <Image style={{ height: 100 }} src={CalenderImage} />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Alert
                variant="success"
                style={{ fontSize: 24, textAlign: "center" }}
              >
                Create a Calender Event
              </Alert>{" "}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default calendar;
