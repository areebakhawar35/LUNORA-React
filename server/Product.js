
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
  type: String,
  required: true,
  unique: true,
},
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Beds",
    },
    description: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
