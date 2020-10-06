const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// get the credentials 
const credentials = require("../credentials.json");

// scopes for full access to calendar api
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// token path
const TOKEN_PATH = "./token.json";

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// get the redirect url 
function getRedirectAuthenticationURL() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  return authUrl;
}

// save the token to the local drive 
function saveTheToken(code) {
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log("Token is saved to:", TOKEN_PATH);
    });
  });
}

// authorize
function authorize() {
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) getNewToken(oAuth2Client);
    else oAuth2Client.setCredentials(JSON.parse(token));
  });

  // returns the Auth object 
  return oAuth2Client;
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Visit the URl to autherize the App:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code value: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
    });
  });
}

module.exports = {
  SCOPES,
  authorize,
  getRedirectAuthenticationURL,
  saveTheToken,
};
