import React, { Component } from "react";
import { Row, Col, Alert } from "react-bootstrap";

class Index extends Component {
  render() {
    return (
      <div>
        <Row style={{marginTop: 100}}>
          <Col>
            <Alert variant="primary">
              
     <h5>Create your Calender Event</h5>
            </Alert>
          </Col>
          
        </Row>
        <Row>
        <Col>
        <h1> Upload the files</h1>
          <p>This is where the upload process happens</p></Col>
        </Row>
      </div>
    );
  }
}

export default Index;
