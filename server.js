const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const Bundler = require("parcel-bundler");
const bundler = new Bundler("./public/index.html");

const auth = require("./authentication/authentication");
const controller = require("./calenderAPI/API");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const url = auth.getRedirectAuthenticationURL();
  res.redirect(url);
  //   res.redirect("/ok");
});

// autherize and save the token
app.get("/auth", (req, res) => {
  let params = parseParams(req);
  auth.saveTheToken(params["code"]);
  res.redirect("/home");
});

// api call to get all the events for that particular user
app.get("/events", (req, res) => {
  let response = null;
  let authObj = auth.authorize();

  let result = controller.listEvents(authObj);

  result.then((data) => {
    response = data;

    res.json(response);
  });
});

// api to create a new calender event
app.post("/create", (req, res) => {
  let event = req.body;

  let response = null;

  fs.readFile("credentials.json", (err, content) => {
    let authObj = auth.authorize();

    let result = controller.insertEvent(authObj, event);
  });
});

app.use(bundler.middleware());

app.use(express.static("./dist"));

app.get("/home", (req, res) => {
  res.sendFile("./dist/index.html");
});

function parseParams(req) {
  let q = req.url.split("?"),
    result = {};
  if (q.length >= 2) {
    q[1].split("&").forEach((item) => {
      try {
        result[item.split("=")[0]] = item.split("=")[1];
      } catch (e) {
        result[item.split("=")[0]] = "";
      }
    });
  }
  return result;
}


// start the app 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
