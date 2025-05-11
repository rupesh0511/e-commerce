const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  // console.log(req.body);
  // const newUser = new userModel(req.body);

  //     //to use bcypt is a two step process and it's both asynchronous nd synchronous
  //     //. Generate salt
  //     //. Generate hash using salt

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  // console.log(salt);
  // console.log(hash);
  const newUser = new userModel({
    ...req.body,
    password: hash,
  });
  await newUser.save();
  res.json({
    sucess: true,
    message: "registered successfully,please login to continue",
  });
};

const userLogin = async (req, res) => {
  // console.log(req.body);
  //find if the user is present
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "invalid user or password",
    });
  }
  console.log(user.password);

  // //passwords compare with the help of bcrypt plain text password
  // //second stored hash password and it gives only boolean value

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  // console.log(isPasswordCorrect);

  const expiry = Math.floor(new Date().getTime() / 1000) + 3600;

  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      name: user.firstname,
      role: user.role,
      exp: expiry,
    };
    const token = jwt.sign(payload, process.env.JWT_secret_key);
    return res.json({
      sucess: true,
      message: "Logged in successfully",
      token,
    });
  }
  res.json({
    success: false,
    message: "invalid user or password",
  });
};

const userLogout = async (req, res) => {
  res.json({
    sucess: true,
    message: "dummy user logout api",
  });
};

const wishlist = async (req, res) => {
  let updateObject = {
    $push: {
      wishlist: req.body.productid,
    },
  };
  await userModel.findByIdAndUpdate(req.user._id, updateObject);
  res.json({
    sucess: true,
    message: "Product added to Wishlist",
  });
};

const getwishlist = async (req, res) => {
  const user = await userModel
    .findById(req.user._id, "wishlist")
    .populate("wishlist", "title price");
  res.json({
    sucess: true,
    message: "wishlist",
    result: user,
  });
};

const saveaddress = async (req, res) => {
  const address = req.body;
  const setobject = {};
  if(address.address){
    setobject["address.address"] = address.address;
  }
  if(address.city){
    setobject["address.city"] = address.city;
  }
  if(address.state){
    setobject["address.state"] = address.state;
  }
  if(address.pincode){
    setobject["address.pincode"] = address.pincode;
  }
  const updateobject = {
    $set: setobject,
  };

  const updatedaddress = await userModel.findByIdAndUpdate(req.user._id, updateobject);
  res.json({
    success: true,
    message: "address updated",
  });
};

const controllers = {
  userRegistration,
  userLogin,
  userLogout,
  wishlist,
  getwishlist,
  saveaddress,
};
module.exports = controllers;

