const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  state: {
    type: String,
    required: false,
    default: "",
  },
  pincode: {
    type: String,
    required: false,
    default: "",
  },
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    def: [],
    ref: "products",
  },
  address: {
    type: addressSchema,
  },
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
