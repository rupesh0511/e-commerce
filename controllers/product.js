const productModel = require("../models/product");
const jwt = require("jsonwebtoken");

const createproduct = async (req, res) => {
  const newproduct = new productModel(req.body);
  await newproduct.save();
  res.json({
    success: true,
    message: "dummy create api",
  });
};

const getproduct = async (req, res) => {
  res.json({
    success: true,
    message: "dummy get api",
  });
};
const editproduct = async (req, res) => {
  res.json({
    success: true,
    message: "dummy get api",
  });
};

const likedislike = async (req, res) => {
  // console.log(req.user)
  // let fieldname = "likes";
  let updatedobject = {
    $push: { likes: req.user._id },
    $pull: { dislikes: req.user._id },
  };
  if (req.params.action === "dislike") {
    updatedobject = {
      $push: { dislikes: req.user._id },
      $pull: { likes: req.user._id },
    };
  }
  const updatedproduct = await productModel.findByIdAndUpdate(
    req.params.productid,
    updatedobject
  );
  res.json({
    success: true,
    message: "product liked",
  });
};

const productdetails = async (req, res) => {
  // console.log(req.query);
  const productdetail = await productModel
    .findById(req.query.productid)
    .populate("likes")
    .populate("dislikes");
  res.json({
    success: true,
    message: "productdetail api",
    result: productdetail,
  });
};

const reviewController = async (req, res) => {
  const product = await productModel.findById(req.params.productid);
  const review = product.reviews.find(
    (review) => review.userid.toString() === req.user._id.toString()
  );
  res.json({
    sucess: true,
    message: "Dummy review api",
  });
};

const controller = {
  createproduct,
  getproduct,
  editproduct,
  likedislike,
  productdetails,
  reviewController,
};

module.exports = controller;
