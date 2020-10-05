import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GoogleAuthentication from "./pages/Login";
import CreateCalendar from "./pages/Dashboard";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={GoogleAuthentication}></Route>

            <Route path="/create" component={CreateCalendar}></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};
export default App;
