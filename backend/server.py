from flask import Flask, render_template, request, url_for, redirect, jsonify
from authlib.integrations.flask_client import OAuth


from flask_cors import CORS

import time

app = Flask(__name__)

oauth = OAuth(app)
CORS(app)

PORT = 8083


google = oauth.register(
    name="google",
    client_id="",
    client_secret="",
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v1",
    client_kwargs={'scope':'openid profile email'}
)

@app.route("/")
def hello_world():
    return "Welcome You!"
    # return str(return_value)



@app.route("/create", methods=["POST", "GET"])
def get_form_predicted_values():
   
    request_data = request.get_json()
    return ""


@app.route('/login')
def login():
    google = oauth.create_client("google")
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    token = oauth.twitter.authorize_access_token()
    resp = oauth.twitter.get('account/verify_credentials.json')
    profile = resp.json()
    # do something with the token and profile
    return redirect('/')
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)

