import React, { Component } from "react";

import { Card, Col, Row, Container } from "react-bootstrap";

import GoogleLogin from "react-google-login";

import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // signup the user
  async signupUser(userdata) {
    const googleresponse = {
      Name: userdata.profileObj.name,
      email: userdata.profileObj.email,
      token: userdata.googleId,
      Image: userdata.profileObj.imageUrl,
      ProviderId: "Google",
    };

    //   const res = await axios
    //     .post("http://0.0.0.0:8083/create ", googleresponse)
    //     .then(
    //       (result) => {
    //         let responseJson = result;

    //         sessionStorage.setItem("userData", JSON.stringify(result));

    //         //   this.props.history.push("/Dashboard");
    //         console.log(responseJson);
    //         this.props.history.push("/create");
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    // }

    const res = await axios.get("http://0.0.0.0:8083/login ").then(
      (result) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    const responseGoogle = (response) => {
      //   console.log(response);
      var res = response.profileObj;
      //   console.log(res);
      this.signupUser(response);
    };

    return (
      <div>
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
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
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
  }
}

export default Login;
