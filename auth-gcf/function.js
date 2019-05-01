"use strict";

const appendQuery = require("append-query");
const { Datastore } = require("@google-cloud/datastore");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const pug = require("pug");

const ISSUER = "lectio-issuer";
const JWT_LIFE_SPAN = 1800 * 1000;
const datastore = new Datastore({
  projectId: "kavinvin-211411"
});

let privateKey;
fs.readFile("private.pem", "utf8", function(error, data) {
  if (error) {
    console.log(`An error has occurred when reading the key file: ${error}`);
  } else {
    privateKey = data;
  }
});

async function handleImplicitAuthRequest(req, res) {
  if (
    req.query.client_id === undefined ||
    req.query.redirect_url === undefined
  ) {
    return res.status(400).send(
      JSON.stringify({
        error: "invalid_request",
        error_description: "Required parameters are missing in the request."
      })
    );
  }

  const clientQuery = datastore
    .createQuery("clients")
    .filter("client-id", "=", req.query.client_id)
    // .filter('redirect-url', '=', req.body.redirect_url
    .filter("implicit-enabled", "=", true);

  try {
    const [user] = await datastore.runQuery(clientQuery);
    if (user.length === 0) {
      throw Promise.reject(new Error("Invalid client"));
    }
    const html = pug.renderFile(path.join(__dirname, "auth.pug"), {
      response_type: "token",
      client_id: req.query.client_id,
      redirect_url: req.query.redirect_url,
      code_challenge: req.query.code_challenge
    });
    res.status(200).send(html);
  } catch (error) {
    if (error.message === "Invalid client/redirect URL.") {
      res.status(400).send(
        JSON.stringify({
          error: "access_denied",
          error_description: error.message
        })
      );
    } else {
      throw error;
    }
  }
}

exports.auth = async (req, res) => {
  console.log(req.query);
  switch (req.query.response_type) {
    case "token":
      await handleImplicitAuthRequest(req, res);
      break;

    default:
      res.status(400).send(
        JSON.stringify({
          error: "invalid_request",
          error_description: "Grant type is invalid or missing."
        })
      );
      break;
  }
};

async function handleImplictSigninRequest(req, res) {
  if (
    req.body.username === undefined ||
    req.body.password === undefined ||
    req.body.client_id === undefined ||
    req.body.redirect_url === undefined
  ) {
    return res.status(400).send(
      JSON.stringify({
        error: "invalid_request",
        error_description: "Required parameters are missing in the request."
      })
    );
  }

  const userQuery = datastore
    .createQuery("users")
    .filter("username", "=", req.body.username)
    .filter("password", "=", req.body.password);

  const clientQuery = datastore
    .createQuery("clients")
    .filter("client-id", "=", req.body.client_id)
    // .filter("redirect-url", "=", req.body.redirect_url)
    .filter("implicit-enabled", "=", true);

  const [[user]] = await datastore.runQuery(userQuery);
  if (!user) {
    return Promise.reject(new Error("Invalid user credentials."));
  }

  const [client] = await datastore.runQuery(clientQuery);
  if (client.length === 0) {
    throw Promise.reject(new Error("Invalid client"));
  }
  const token = jwt.sign(
    { username: user.username, user_id: user.user_id },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: JWT_LIFE_SPAN,
      issuer: ISSUER
    }
  );
  res.redirect(
    appendQuery(req.body.redirect_url, {
      access_token: token,
      token_type: "JWT",
      expires_in: JWT_LIFE_SPAN
    })
  );
}

exports.signin = async (req, res) => {
  switch (req.body.response_type) {
    case "token":
      await handleImplictSigninRequest(req, res);
      break;

    default:
      res.status(400).send(
        JSON.stringify({
          error: "invalid_request",
          error_description:
            "Grant type is invalid or missing. (Support only token)"
        })
      );
      break;
  }
};

exports.extra_signin = async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).send(
      JSON.stringify({
        error: "invalid_request",
        error_description:
          "username and password fields are missing in the request."
      })
    );
  }

  const userQuery = datastore
    .createQuery("users")
    .filter("username", "=", req.body.username)
    .filter("password", "=", req.body.password);

  const [[user]] = await datastore.runQuery(userQuery);
  if (!user) {
    return Promise.reject(new Error("Invalid user credentials."));
  }

  const token = jwt.sign(
    { username: user.username, user_id: user.user_id },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: JWT_LIFE_SPAN,
      issuer: ISSUER
    }
  );

  res.send({
    access_token: token,
    token_type: "JWT",
    expires_in: JWT_LIFE_SPAN
  });
};
