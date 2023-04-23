const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51ME4hvCJpCL8QUhkHWpnuRHCYPFcwq4HZCAmtopkDLYQxfUKE8os3KISqdcB7MK9YWm0d30uhpARwBqiETiwlxZp00T80N4L0E"
);

router.get("/", (req, res) => {
  res.send("Home");
});

router.post("/intent", async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
