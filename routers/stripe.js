const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KRhgQEySkfLUrD1IG5C1TaHXp2OZC00gKuBjhZ4B6Bfj5d97BOJnpyDsbep7sBKzh7UF9sMx68d08jLeXiZUP3a00zdhNviX8"
);

router.post("/peyment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
