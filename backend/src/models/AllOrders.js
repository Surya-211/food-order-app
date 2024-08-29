const mongoose = require("mongoose");

const { Schema } = mongoose;

const AllOrdersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("allOrders", AllOrdersSchema);
