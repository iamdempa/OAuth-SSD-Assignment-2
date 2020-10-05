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

app.get("/auth", (req, res) => {
  let params = parseParams(req);
  auth.saveTheToken(params["code"]);
  res.redirect("/home");
});

app.get("/events", (req, res) => {
  let response = null;
  let authObj = auth.authorize();

  // setTimeout(() => {
  let result = controller.listEvents(authObj);

  result.then((data) => {
    response = data;
    // console.log(data)
    res.json(response);
  });
  // }, 1000);
});

// app.get("/contacts", (req, res) => {
//   let response = null;
//   let authObj = auth.authorize();

//   setTimeout(() => {
//     let result = controller.listConnectionNames(authObj);
//     result.then((data) => {
//       response = data;
//       res.json(response);
//     });
//   }, 4000);
// });

app.post("/create", (req, res) => {
  let event = req.body;

  let response = null;

  fs.readFile("credentials.json", (err, content) => {
    let authObj = auth.authorize();

    let result = controller.insertEvent(authObj, event);
    // console.log(result);
  });
});

app.use(bundler.middleware());

app.use(express.static("./dist"));

app.get("/home", (req, res) => {
  res.sendFile("./dist/index.html");
  // res.sendFile("./public/signin.js");
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
