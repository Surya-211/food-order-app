const express = require("express");
const AllOrders = require("../models/AllOrders");
const router = express.Router();

router.post("/allOrdersData", async (req, res) => {
  let data = req.body.order_data;
  try {
    await AllOrders.create({
      email: req.body.email,
      order_data: [data],
    })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  } catch (error) {
    res.json({ success: false });
  }
});

router.post("/allOrders", async (req, res) => {
  try {
    let myData = await AllOrders.find({});
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Server Error", error);
  }
});

module.exports = router;
