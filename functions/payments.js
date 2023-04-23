const express = require("express");
const app = express();
const serverless = require("serverless-http");
const paymentRoutes = require("../src/router/paymentRoutes");

app.use(express.json());

app.use("/.netlify/functions/payments", paymentRoutes);
module.exports.handler = serverless(app);
