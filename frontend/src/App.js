import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Col, Row, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Create from "./pages/Index";

import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  const goHome = () => {
    history.push("http://localhost:3000/create");
  };

  

  return (
    <div className="App">
      <Container style={{ marginTop: 100 }}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="calender.jpg"
                style={{ width: 250, marginTop: 10, marginLeft: 20 }}
              />
              <Card.Body>
                <Card.Title>Your Calendar Events Right Away...</Card.Title>
                <hr />
                <Card.Text>
                  Please Authenticate Before Creating the Calender Event
                </Card.Text>

                {/* <Link to="/create"> */}
                <GoogleLogin
                  clientId="258011115907-jl24rqk323p36bjoan0jk71ip6a6l67h.apps.googleusercontent.com"
                  buttonText="Authenticate"
                  onSuccess={goHome}
                  onFailure={goHome}
                  cookiePolicy={"single_host_origin"}
                />
                {/* <Button variant="primary">
                        {" "}
                        <i class="fa fa-google"></i> Authentica te
                      </Button> */}
                {/* </Link> */}
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
